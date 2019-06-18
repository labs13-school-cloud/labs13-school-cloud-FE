import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  getTrainingSeriesForVolunteer,
  getTrainingSeriesID,
  editTrainingSeries,
  deleteTrainingSeries,
  addVolunteerToTrainingSeries,
  deleteVolunteerFromTrainingSeries,
  getUser
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
  }, [props.getTrainingSeriesForVolunteer]);
  useEffect(() => {
    props.getTrainingSeriesID(props.match.params.id);
  }, [props.getTrainingSeriesID]);

  // Removes Training Series from database
  const removeTrainingSeries = id => {
    props.deleteTrainingSeries(props.activeTrainingSeries.id);
    props.history.push(`/home`);
  };
  // Sends Admin to Edit page for Training Series
  const editTrainingSeries = id => {
    props.getTrainingSeriesID(id);
    props.history.push(`/home/training-series/${id}/edit`);
  };

  // Sends Admin to Add Volunteer to Training Series page
  const addVolunteer = id => {
    props.getTrainingSeriesID(id);
    props.history.push(`/home/training-series/${id}/addVolunteer`) 
  };

  // Remove Volunteer from training series
  const removeVolunteer = (id, user_id) => {
    props.deleteVolunteerFromTrainingSeries(id, user_id);
  };
  const {
    id,
    name,
    title,
    subject,
    link
  } = props.activeTrainingSeries;

  console.log("Single page-Volunteers",props.trainingSeriesVolunteers.length)

  return (
    <>
      <Wrapper>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <i className="material-icons" onClick={removeTrainingSeries}>
              delete
            </i>{" "}
            <i className="material-icons" onClick={e => editTrainingSeries(id)}>
              edit
            </i>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">Subject: {subject}</Typography>
            <Typography>
              Link to Training Series:
              <Link to={link}>Training Link</Link>
            </Typography>
            <Typography variant="body1">Creator: {name}</Typography>
            {/* <Button onClick={e => completeTrainingSeries(finished)}>
              Done
            </Button> */}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Active Volunteers</Typography>
            <i className="material-icons" onClick={e => addVolunteer(id)}>
              add_circle
            </i>
            {props.trainingSeriesVolunteers.map(v =>
              // checks if any Volunteers are assigned to TrainingSeries
              v.length > 0 ? (
                <Typography variant="body1" key={v.id}>
                  {v.name}{" "}
                  <i className="material-icons" onClick={e=> removeVolunteer({id:props.match.params.id, user_id: v.volunteer_id })}>
                    delete_forever
                  </i>
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
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  userProfile: state.userReducer.userProfile
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getTrainingSeriesForVolunteer,
      getTrainingSeriesID,
      editTrainingSeries,
      deleteTrainingSeries,
      addVolunteerToTrainingSeries,
      deleteVolunteerFromTrainingSeries
    }
  )(withStyles(styles)(SingleTrainingSeries))
);
