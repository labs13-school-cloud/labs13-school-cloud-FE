import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  getTrainingSeriesForVolunteer,
  getTrainingSeriesID,
  editTrainingSeries,
  deleteTrainingSeries
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
  useEffect(() => {
    props.getTrainingSeriesID(props.match.params.id);
  }, [getTrainingSeriesID]);

  const removeTrainingSeries = id => {
    props.deleteTrainingSeries(props.activeTrainingSeries.id);
    props.history.push(`/home`);
    console.log("Remove Training Series", id);
  };

  const {
    id,
    first_name,
    last_name,
    title,
    subject,
    link,
    finished
  } = props.activeTrainingSeries;

  console.log("activeTrainingSeries", props.trainingSeriesVolunteers.length);
  console.log("Training Series ", props.match.params.id);
  return (
    <>
      <Wrapper key={`container_${id}`}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <i class="material-icons" onClick={e => removeTrainingSeries(id)}>
              delete
            </i>{" "}
            <i class="material-icons">edit</i>
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
            <i class="material-icons">add_circle</i>
            {props.trainingSeriesVolunteers.map(v =>
              // checks if any Volunteers are assigned to TrainingSeries
              v.length !== 0 ? (
                <Typography variant="body1" key={v.id}>
                  {v.first_name} {""}
                  {v.last_name} <i class="material-icons">delete_forever</i>
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
  trainingSeriesVolunteers:
    state.trainingSeriesReducer.trainingSeriesVolunteers,
  volunteers: state.trainingSeriesReducer.volunteers,
  trainingSeries: state.trainingSeriesReducer.trainingSeries
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getTrainingSeriesForVolunteer,
      getTrainingSeriesID,
      editTrainingSeries,
      deleteTrainingSeries
    }
  )(withStyles(styles)(SingleTrainingSeries))
);
