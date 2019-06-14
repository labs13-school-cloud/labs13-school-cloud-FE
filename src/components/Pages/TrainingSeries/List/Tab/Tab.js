// main page for displaying list of all training series for Volunteer users
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  getTrainingSeries,
  getTrainingSeriesID,
  getTrainingSeriesForVolunteer
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

function Tab({
  getFiltered,
  getTrainingSeries,
  trainingSeries,
  getTrainingSeriesID,
  getTrainingSeriesForVolunteer
}) {
  useEffect(() => {
    getTrainingSeries();
  }, [getTrainingSeries]);

  const setTrainingSeries = id => {
    getTrainingSeriesID(id);
    getTrainingSeriesForVolunteer(id);
    history.push(`/home/training-series/${id}`);
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
        ({ id, title, subject, first_name, last_name, finished }) => {
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
                  <Typography variant="body1">
                    Creator: {first_name} {""}
                    {last_name}
                  </Typography>
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
    { getTrainingSeries, getTrainingSeriesID, getTrainingSeriesForVolunteer }
  )(withStyles(styles)(Tab))
);
