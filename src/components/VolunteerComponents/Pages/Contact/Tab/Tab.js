// contact page for volunteers
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllAdmin } from "store/actions";

import {
  Grid,
  Typography,
  Select,
  FormControl,
  Paper
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
          <Typography>Admin Contact</Typography>
          {admin.map(user => {
            user.length !== 0 ? (
              <Paper>
                <Typography>{user.name}</Typography>
              </Paper>
            ) : (
              <Typography>
                No Admins available at this time, contact us here!
              </Typography>
            );
          })}
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
