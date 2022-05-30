import json
import os
from datetime import timedelta, datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, set_access_cookies
from pymongo import MongoClient
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
from errors import LOGIN_ERROR


app = Flask(__name__)

# CORS
CORS(
    app,
    resources={r"/*": {"origins": "http://localhost:3000"}},
    supports_credentials=True,
)

# JWT
JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.environ.get("FLASK_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
app.config["JWT_TOKEN_LOCATION"] = "cookies"

# DB
client = MongoClient("mongodb://localhost:27017/", tz_aware=True)
db = client.agent_order_book
Users = db.users
Listings = db.listings
Bids = db.bids


@app.route("/login", methods=["POST"])
def login():
    license_num = request.json.get("licenseNum")
    password = request.json.get("password")

    user = Users.find_one({"licenseNum": license_num})

    if user:
        password_matches = check_password_hash(user.get("passwordHash"), password)

    if user and password_matches:
        response = jsonify(str(user.get("_id")))
        set_access_cookies(response, create_access_token(identity=str(user.get("_id"))))
        return response
    else:
        return LOGIN_ERROR, 401


@app.route("/users", methods=["POST"])
@app.route("/users/<user_id>", methods=["GET"])
def users(user_id=None):
    # Sign up
    if request.method == "POST":
        name = request.json.get("name")
        license_num = request.json.get("licenseNum")
        contact_num = request.json.get("contactNum")
        password = request.json.get("password")

        userId = Users.insert_one(
            {
                "name": name,
                "licenseNum": license_num,
                "contactNum": contact_num,
                "passwordHash": generate_password_hash(password),
                "isVerified": False,
            }
        ).inserted_id
        response = jsonify(str(userId))
        set_access_cookies(response, create_access_token(identity=str(userId)))
        return response

    #
    elif request.method == "GET":
        cursor = Users.aggregate(
            [
                {"$match": {"_id": ObjectId(user_id)}},
                {
                    "$project": {
                        "id": {"$toString": "$_id"},
                        "_id": 0,
                        "name": 1,
                        "licenseNum": 1,
                        "contactNum": 1,
                        "isVerified": 1,
                    }
                },
            ]
        )
        return cursor.next()


@app.route("/users/<user_id>/listings")
def user_listings(user_id):
    return {
        "listings": [
            doc
            for doc in Listings.aggregate(
                [
                    {"$match": {"sellerId": user_id}},
                    {
                        "$project": {
                            "_id": 0,
                            "id": {"$toString": "$_id"},
                            "address": 1,
                            "url": 1,
                            "sellerId": 1,
                        }
                    },
                ]
            )
        ]
    }


@app.route("/listings/<listing_id>", methods=["GET"])
@app.route("/listings", methods=["GET", "POST"])
def listings(listing_id=None):
    if request.method == "GET" and listing_id:
        return "GET Listings"
    elif request.method == "GET":
        return "gettt"
    elif request.method == "POST":
        object_id = Listings.insert_one(request.json).inserted_id
        return str(object_id)


@app.route("/bids", methods=["POST"])
@app.route("/bids/<bid_id>", methods=["PUT", "GET"])
def bids(bid_id=None):
    if request.method == "POST":
        bid = request.json
        bid["status"] = "PENDING"
        bid["date"] = datetime.utcnow()
        bid_id = Bids.insert_one(bid).inserted_id
        return str(bid_id)

    elif request.method == "PUT":
        Bids.update_one(
            {"_id": ObjectId(bid_id)}, {"$set": {"status": request.json["newStatus"]}}
        )
        return bid_id

    elif request.method == "GET":
        bid = Bids.find_one({"_id": ObjectId(bid_id)})
        return {k: bid[k] for k in bid if k != "_id"}


@app.route("/listings/<listing_id>/bids", methods=["GET"])
def listings_bids(listing_id):

    return {
        "bids": [
            doc
            for doc in Bids.aggregate(
                [
                    {"$match": {"listingId": listing_id, "status": {"$ne": "PENDING"}}},
                    {
                        "$project": {
                            "_id": 0,
                            "id": {"$toString": "$_id"},
                            "date": {
                                "$dateToString": {
                                    "date": "$date",
                                    "format": "%Y-%m-%dT%H:%M:%S.%LZ",
                                }
                            },
                            "listingId": 1,
                            "buyerId": 1,
                            "sellerId": 1,
                            "amount": 1,
                            "status": 1,
                        }
                    },
                    {"$sort": {"date": -1}},
                ]
            )
        ]
    }


@app.route("/users/<user_id>/bids", methods=["GET"])
def user_bids(user_id):

    cursor = Bids.aggregate(
        [
            {
                "$match": {
                    "status": "PENDING",
                    "$or": [{"sellerId": user_id}, {"buyerId": user_id}],
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "id": {"$toString": "$_id"},
                    "date": {
                        "$dateToString": {
                            "date": "$date",
                            "format": "%Y-%m-%dT%H:%M:%S.%LZ",
                        }
                    },
                    "listingId": 1,
                    "buyerId": 1,
                    "sellerId": 1,
                    "amount": 1,
                    "status": 1,
                }
            },
            {"$sort": {"date": -1}},
        ]
    )
    return {"bids": [doc for doc in cursor]}


###############################
######### validation ##########
###############################
@app.route("/license-num-is-unique", methods=["POST"])
def license_num_is_unique():
    license_num_is_unique = not bool(
        Users.find_one({"licenseNum": request.json.get("licenseNum")})
    )
    return {"license_num_is_unique": license_num_is_unique}
