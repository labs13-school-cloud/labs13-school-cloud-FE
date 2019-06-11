// main page for displaying list of all training series for Admin users
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTrainingSeries, deleteTrainingSeries } from "store/actions";
//import DeleteModal from "components/UI/Modals/deleteModal";
import history from "history.js";

import { Grid, Typography } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Select, Wrapper, styles } from "./styles.js";

function TabVolunteer({
  getFiltered,
  getTrainingSeries,
  trainingSeries,
  classes
}) {
  useEffect(() => {
    getTrainingSeries();
  }, [getTrainingSeries]);

  return (
    <>
      {getFiltered(trainingSeries).map(({ id, title }) => {
        return (
          <Wrapper key={`container_${id}`}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h6">{title}</Typography>
                <hr />
                <Button>Done</Button>
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
  messages: state.messagesReducer.messages
});

export default connect(
  mapStateToProps,
  { getTrainingSeries, deleteTrainingSeries }
)(withStyles(styles)(TabVolunteer));
