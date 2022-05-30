import React from "react";
import { Box, Paper, Typography, Grid } from "@mui/material";
import Link from "../../common/Link";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";

function Bio({ name, userId, licenseNum, contactNum }) {
  return (
    <Box py={5}>
      <Paper elevation={9}>
        <Box p={3}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Grid
                container
                spacing={1}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Link
                    to={`/users/${userId}`}
                    isUser
                    userId={userId}
                    fontSize="24px"
                    bold
                  />
                </Grid>
              </Grid>
            </Grid>

            <br />

            <Grid item>
              <Grid container spacing={0.5}>
                <Grid item>
                  <PhoneIphoneIcon />
                </Grid>

                <Grid item>
                  <Typography>{contactNum}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <Typography>{`CEA License No. ${licenseNum}`}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}

export default Bio;
