import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  getTrainingSeriesForVolunteer,
  getTrainingSeriesID
} from "store/actions";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Divider,
  Typography,
  Grid,
  Button,
  Link
} from "@material-ui/core/";

import { styles, PageContainer, Wrapper } from "./styles.js";

function SingleTrainingSeries(props) {
  useEffect(() => {
    props.getTrainingSeriesForVolunteer(props.match.params.id);
  }, [getTrainingSeriesForVolunteer]);
  // useEffect(() => {
  //   props.getTrainingSeriesID(props.match.params.id);
  // }, [getTrainingSeriesID]);
  const {
    id,
    first_name,
    last_name,
    title,
    subject,
    link,
    finished
  } = props.activeTrainingSeries;

  console.log(props.trainingSeriesVolunteers);
  return (
    <>
      <Wrapper key={`container_${id}`}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">Subject: {subject}</Typography>
            <Link>Link: {link}</Link>

            <Typography variant="body1">
              Creator: {first_name} {""}
              {last_name}
            </Typography>
            <Button>Done</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Active Volunteers</Typography>
            {props.trainingSeriesVolunteers.map(v =>
              v.length !== 0 ? ( // checks if any Volunteers are assigned to TrainingSeries
                <Typography variant="body1">
                  {v.first_name} {""}
                  {v.last_name}
                </Typography>
              ) : (
                <Typography variant="body1">
                  No Volunteers are taking this Training Series at this time.
                </Typography>
              )
            )}
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const mapStateToProps = state => ({
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries,
  trainingSeriesVolunteers: state.trainingSeriesReducer.trainingSeriesVolunteers
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTrainingSeriesForVolunteer }
  )(withStyles(styles)(SingleTrainingSeries))
);
