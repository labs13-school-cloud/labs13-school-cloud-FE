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
  const { admin, getAllAdmin } = props;
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
            <Typography
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                marginTop: "1rem"
              }}
            >
              No Admins available at this time, contact us{" "}
              <a href="mailto:help@schoolinthecloud.com">here!</a>
            </Typography>
          ) : (
            <Paper>
              <Typography>Admin Info</Typography>
              {admin.map(user => (
                <Typography>{user.name}</Typography>
              ))}
            </Paper>
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
