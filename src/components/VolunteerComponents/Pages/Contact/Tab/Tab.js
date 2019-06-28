// contact page for volunteers
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllAdmin } from "store/actions";

import {
  Grid,
  Typography,
  Select,
  FormControl,
  Paper,
  Link
} from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Wrapper, styles, Redirect } from "./styles.js";

function Tab(props) {
  const { admin, getAllAdmin, classes } = props;
  useEffect(() => {
    getAllAdmin();
  }, [getAllAdmin]);

  return (
    <Wrapper>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            style={{ fontSize: "2rem", textAlign: "center" }}
          >
            Admin Contact
          </Typography>
          {admin.length === 0 ? (
            <Typography className={props.classes.noMessage}>
              No Admins available at this time, contact us{" "}
              <a
                href="mailto:help@schoolinthecloud.com"
                style={{ color: "#2699FB" }}
              >
                here!
              </a>
            </Typography>
          ) : (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                textAlign: "center",
                margin: "2rem"
              }}
            >
              {admin.map(user => (
                <Paper
                  style={{ padding: "1rem" }}
                  className={classes.divBack}
                  key={user.id}
                >
                  <Typography
                    style={{ fontSize: "1.2rem", marginBottom: "1rem" }}
                  >
                    {user.name}
                  </Typography>
                  <Button className={classes.button}>
                    <a
                      href={`mailto:${user.email}`}
                      style={{ color: "inherit", textDecoration: "none" }}
                    >
                      Contact Me
                    </a>
                  </Button>
                </Paper>
              ))}
            </div>
          )}
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  userProfile: state.userReducer.userProfile,
  admin: state.userReducer.admin
});

export default connect(
  mapStateToProps,
  { getAllAdmin }
)(withStyles(styles)(Tab));
