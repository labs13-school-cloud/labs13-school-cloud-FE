// main page for displaying list of all training series for Volunteer users
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getTrainingSeries, getTrainingSeriesID } from "store/actions";
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

function TabVolunteer({
  getFiltered,
  volunteerTrainingSeries,
  getTrainingSeriesID,
  classes
}) {
  const setTrainingSeries = id => {
    getTrainingSeriesID(id);
    history.push(`/home/training-series/${id}`);
  };
  const [finished, setFinish] = useState(false);
  const toggleChange = () => {
    setFinish(finished === false ? true : false);
  };
  return (
    <>
      {volunteerTrainingSeries.length === 0 ? (
        <Typography className={classes.noMessage}>
          No Training Series Assigned
        </Typography>
      ) : (
        <>
          {getFiltered(volunteerTrainingSeries).map(
            ({ training_series_id, title, subject, name }) => {
              return (
                <Wrapper key={`container_${training_series_id}`}>
                  <Grid container spacing={24}>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        {" "}
                        <Link
                          onClick={e => setTrainingSeries(training_series_id)}
                        >
                          {title}
                        </Link>
                      </Typography>
                      <hr />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "10px"
                        }}
                      >
                        <Typography variant="body1">
                          Subject: {subject}
                        </Typography>

                        <Typography variant="body1">Creator: {name}</Typography>
                      </div>
                      <Button
                        style={{
                          backgroundColor: finished === true ? "green" : "gray"
                        }}
                        onClick={toggleChange}
                      >
                        Done
                      </Button>
                    </Grid>
                  </Grid>
                </Wrapper>
              );
            }
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  notifications: state.notificationsReducer.notifications,
  messages: state.messagesReducer.messages,
  volunteerTrainingSeries: state.trainingSeriesReducer.volunteerTrainingSeries,
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTrainingSeries, getTrainingSeriesID }
  )(withStyles(styles)(TabVolunteer))
);
