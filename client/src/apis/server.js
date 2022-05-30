import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

const server = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
});

function addCSRFToken(request) {
  request["headers"]["X-CSRF-TOKEN"] = getCookie("csrf_access_token");

  return request;
}

server.interceptors.request.use(addCSRFToken);

export default server;
