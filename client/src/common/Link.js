import { useState, useEffect } from "react";
import { Link as RRDLink } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Grid, Typography } from "@mui/material";
import server from "../apis/server";

function Link({ to, children, isUser, userId, fontSize, bold }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isUser) {
      server.get(`/users/${userId}`).then((res) => setUserData(res.data));
    }
  }, [userId]);

  if (!isUser) {
    return (
      <RRDLink to={to} style={{ color: "black" }}>
        {children}
      </RRDLink>
    );
  } else if (userData !== null) {
    if (userData.isVerified) {
      return (
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item>
            <RRDLink
              to={to}
              style={{
                color: "black",
                fontSize: fontSize,
                fontWeight: bold ? "bold" : "normal",
              }}
            >
              {userData.name}
            </RRDLink>
          </Grid>
          <Grid item>
            <VerifiedIcon style={{ fill: "#2196f3" }} />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <RRDLink
          to={to}
          style={{
            color: "black",
            fontSize: fontSize,
            fontWeight: bold ? "bold" : "normal",
          }}
        >
          {userData.name}
        </RRDLink>
      );
    }
  } else {
    return null;
  }
}

export default Link;
