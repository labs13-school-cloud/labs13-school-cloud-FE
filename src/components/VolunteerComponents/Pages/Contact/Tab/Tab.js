// contact page for volunteers
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {} from "store/actions";

import { Grid, Typography, Select, FormControl } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Wrapper, styles, Redirect } from "./styles.js";

function Tab(props) {
  return (
    <Wrapper>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography>My Info</Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const mapStateToProps = state => ({
  userProfile: state.userReducer.userProfile
});

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Tab));
