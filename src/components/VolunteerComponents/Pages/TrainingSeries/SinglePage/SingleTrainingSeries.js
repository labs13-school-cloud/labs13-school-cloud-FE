import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getTrainingSeriesID } from "store/actions";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Divider, Typography, Grid, Button } from "@material-ui/core/";

import { styles, PageContainer, Wrapper } from "./styles.js";

function SingleTrainingSeries(props) {
  // useEffect(() => {
  //   props.getTrainingSeriesID(props.match.params.id);
  // }, [props.getTrainingSeriesID]);
  // const {
  //   id,
  //   name,
  //   title,
  //   subject,
  //   link,
  //   finished
  // } = props.activeTrainingSeries;
  return (
    <>
      <Wrapper>
        Hello
        {/* <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h6">{title}</Typography>
            <hr />
            <Typography variant="body1">Subject: {subject}</Typography>
            <Typography variant="body1">Creator: {name}</Typography>
            <Button>Done</Button>
          </Grid>
        </Grid> */}
      </Wrapper>
    </>
  );
}

const mapStateToProps = state => ({
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries,
  userProfile: state.userReducer.userProfile
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTrainingSeriesID }
  )(withStyles(styles)(SingleTrainingSeries))
);
