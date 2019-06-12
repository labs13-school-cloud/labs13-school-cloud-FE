// main page for displaying list of all training series for Volunteer users
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getTrainingSeries,
  deleteTrainingSeries,
  getTrainingSeriesID
} from "store/actions";
//import DeleteModal from "components/UI/Modals/deleteModal";
import history from "history.js";

import { Grid, Typography, Link } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Select, Wrapper, styles } from "./styles.js";

function TabVolunteer({
  getFiltered,
  getTrainingSeries,
  trainingSeries,
  getTrainingSeriesID
}) {
  useEffect(() => {
    getTrainingSeries();
  }, [getTrainingSeries]);

  const setTrainingSeries = id => {
    getTrainingSeriesID(id);
    history.push(`/home/training-series/${id}`);
    console.log(id);
  };

  return (
    <>
      {getFiltered(trainingSeries).map(
        ({ id, title, subject, first_name, last_name }) => {
          // console.log(trainingSeries)
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
  activeTrainingSeries: state.messagesReducer.activeTrainingSeries
});

export default connect(
  mapStateToProps,
  { getTrainingSeries, deleteTrainingSeries, getTrainingSeriesID }
)(withStyles(styles)(TabVolunteer));
