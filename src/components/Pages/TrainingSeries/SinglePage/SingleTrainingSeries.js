import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getTrainingSeriesID } from "store/actions";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Divider, Typography, Grid, Button } from "@material-ui/core/";

import { styles, PageContainer, Wrapper } from "./styles.js";

function SingleTrainingSeries(props) {
  console.log(props.activeTrainingSeries.trainingSeries);
  const {
    id,
    first_name,
    last_name,
    title,
    subject,
    link,
    finished
  } = props.activeTrainingSeries;
  return (
    <>
      <Wrapper key={`container_${id}`}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h6">{title}</Typography>
            <hr />
            <Typography variant="body1">Subject: {subject}</Typography>
            <Typography variant="body1">
              Creator: {first_name} {""}
              {last_name}
            </Typography>
            <Button>Done</Button>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const mapStateToProps = state => ({
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTrainingSeriesID }
  )(withStyles(styles)(SingleTrainingSeries))
);
