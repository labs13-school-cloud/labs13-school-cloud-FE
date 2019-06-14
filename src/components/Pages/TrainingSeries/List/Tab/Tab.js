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
//import DeleteModal from "components/UI/Modals/deleteModal";
import history from "history.js";

import {
  Grid,
  Typography,
  Link,
  Select,
  FormControl
} from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Wrapper, styles } from "./styles.js";

function Tab(
  {
    getFiltered,
    getTrainingSeries,
    trainingSeries,
    getTrainingSeriesID,
    getTrainingSeriesForVolunteer
  },
  props
) {
  useEffect(() => {
    getTrainingSeries();
  }, [getTrainingSeries]);

  const setTrainingSeries = id => {
    getTrainingSeriesID(id);
    getTrainingSeriesForVolunteer(id);
    history.push(`/home/training-series/${id}`);
  };

  // Removes Training Series from database
  const removeTrainingSeries = id => {
    deleteTrainingSeries(props.activeTrainingSeries.id);
    history.push(`/home`);
  };
  // Sends Admin to Edit screen for Training Series
  const editTrainingSeries = id => {
    getTrainingSeriesID(id);
    history.push(`/home/training-series/${id}/edit`);
  };

  const filterTraining = () => {};

  return (
    <>
      <FormControl>
        <Select
          // native
          // className={selection}
          // // value={trainingfilter}
          // onChange={e => setTrainingFilter(e.target.value)}
          inputProps={{
            id: "status-selector",
            label: "Filter Selector"
          }}
        >
          <option value={"active"}>Active</option>
          <option value={"available"}>Available</option>
          <option value={"Completed"}>Completed</option>
        </Select>
      </FormControl>
      {getFiltered(trainingSeries).map(
        ({ id, title, subject, name, finished }) => {
          return (
            <Wrapper key={`container_${id}`}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    {" "}
                    <Link onClick={e => setTrainingSeries(id)}>{title}</Link>
                  </Typography>
                  <hr />
                  <Typography variant="body1">Subject: {subject}</Typography>
                  <i class="material-icons" onClick={removeTrainingSeries}>
                    delete
                  </i>{" "}
                  <i
                    class="material-icons"
                    onClick={e => editTrainingSeries(id)}
                  >
                    edit
                  </i>
                  <Typography variant="body1">Creator: {name}</Typography>
                  <Button>Done</Button>
                </Grid>
              </Grid>
            </Wrapper>
          );
        }
      )}
    </>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  notifications: state.notificationsReducer.notifications,
  messages: state.messagesReducer.messages,
  activeTrainingSeries: state.messagesReducer.activeTrainingSeries,
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
