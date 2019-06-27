// main page for displaying list of all training series for Volunteer users
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getTrainingSeries,
  getTrainingSeriesID,
  getTrainingSeriesForVolunteer,
  deleteTrainingSeries
} from "store/actions";
import DeleteModal from "components/UI/Modals/deleteModal";
import history from "history.js";

import { Grid, Typography, Select, FormControl } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Wrapper, styles, Redirect, MessageContainer } from "./styles.js";

function Tab({
  getFiltered,
  getTrainingSeries,
  trainingSeries,
  getTrainingSeriesID,
  getTrainingSeriesForVolunteer,
  classes,
  user_id,
  activeTrainingSeries
}) {
  const setTrainingSeries = id => {
    getTrainingSeriesID(activeTrainingSeries.id);
    getTrainingSeriesForVolunteer(id);
    history.push(`/home/training-series/${id}`);
  };

  // Sends Admin to Edit screen for Training Series
  const editTrainingSeries = id => {
    getTrainingSeriesID(id);
    history.push(`/home/training-series/${id}/edit`);
  };
  return (
    <>
      {getFiltered(trainingSeries).map(({ id, title, subject, name }) => {
        return (
          <Wrapper key={`container_${id}`}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <Typography variant="h6">
                    {" "}
                    <Redirect onClick={e => setTrainingSeries(id)}>
                      {title}
                    </Redirect>
                  </Typography>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <i
                      className={`material-icons ${classes.icons}`}
                      onClick={e => editTrainingSeries(id)}
                    >
                      edit
                    </i>
                    <DeleteModal
                      deleteType="trainingSeries"
                      trainingSeriesId={id}
                      className={`material-icons ${classes.icons}`}
                      user_id={user_id}
                    />
                  </div>
                </div>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1rem"
                  }}
                >
                  <Typography variant="body1">Subject: {subject}</Typography>
                  <Typography variant="body1">Creator: {name}</Typography>
                </div>
              </Grid>
            </Grid>
          </Wrapper>
        );
      })}
    </>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  notifications: state.notificationsReducer.notifications,
  messages: state.messagesReducer.messages,
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries,
  trainingSeriesVolunteers: state.trainingSeriesReducer.trainingSeriesVolunteers
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getTrainingSeries,
      getTrainingSeriesID,
      getTrainingSeriesForVolunteer,
      deleteTrainingSeries
    }
  )(withStyles(styles)(Tab))
);
