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
  getTrainingSeries,
  trainingSeries,
  getTrainingSeriesID
}) {
  const setTrainingSeries = id => {
    getTrainingSeriesID(id);
    history.push(`/home/training-series/${id}`);
  };

  const [trainingFilter, setTrainingFilter] = useState("available");

  const filterTraining = () => {};

  return (
    <>
      <FormControl>
        <Select
          native
          // className={selection}
          value={trainingFilter}
          onChange={e => setTrainingFilter(e.target.value)}
          inputProps={{
            id: "status-selector",
            label: "Filter Selector"
          }}
        >
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
  activeTrainingSeries: state.messagesReducer.activeTrainingSeries
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTrainingSeries, getTrainingSeriesID }
  )(withStyles(styles)(TabVolunteer))
);
