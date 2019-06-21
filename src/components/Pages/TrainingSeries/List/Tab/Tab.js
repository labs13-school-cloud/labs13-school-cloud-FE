// main page for displaying list of all training series for Volunteer users
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import filter from "./filter.js";

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
import { Wrapper, styles, Redirect } from "./styles.js";

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

  // Removes Training Series from database
  const removeTrainingSeries = id => {
    deleteTrainingSeries(activeTrainingSeries.id);
    history.push(`/home`);
  };
  // Sends Admin to Edit screen for Training Series
  const editTrainingSeries = id => {
    getTrainingSeriesID(id);
    history.push(`/home/training-series/${id}/edit`);
  };
  const [trainingFilter, setTrainingFilter] = useState("filter");
  return (
    <>
      <FormControl className={classes.formControl}>
        <Select
          native
          value={trainingFilter}
          className={classes.selection}
          onChange={e => setTrainingFilter(e.target.value)}
          
        >
        <option value={"filter"}>Filter</option>
          <option value={"electronics"}>Electronics</option>
          <option value={"clothing"}>Clothing</option>
          <option value={"sports"}>Sports</option>
          <option value={"garden"}>Garden</option>
        </Select>
      </FormControl>
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
                      className={`material-icons styles.icons`}
                      style={{
                        color: "#808080",
                        marginRight: "5px"
                      }}
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
