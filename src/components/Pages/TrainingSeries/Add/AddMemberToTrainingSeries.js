import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { styles, Wrapper } from "./styles.js";
import { withStyles, Grid } from "@material-ui/core/styles";
import {
  getTrainingSeriesID,
  getTrainingSeriesForVolunteer,
  getAllVolunteers,
  addVolunteerToTrainingSeries
} from "store/actions";

function AddMemberToTrainingSeries(props) {
  // const [volunteers, setVolunteers] = useState([]);
  // useEffect(() => {
  //   props.getAllVolunteers();
  // }, [props.getAllVolunteers]);

  const addVolunteer = (id, user_id) => {
    props.addVolunteerToTrainingSeries(id, user_id);
    props.history.push(`/home/training-series/${id}`);
    console.log(id, user_id);
  };
  // Filter out volunteers that are already apart of the training series

  return (
    <Wrapper>
      {props.volunteers.map(v => (
        <Wrapper key={v.id}>
          <Typography variant="body1">{v.name}</Typography>{" "}
          <Button onClick={e => addVolunteer(props.match.params.id, v.id)}>
            Add
          </Button>
        </Wrapper>
      ))}
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    volunteers: state.userReducer.volunteers,
    trainingSeriesVolunteers:
      state.trainingSeriesReducer.trainingSeriesVolunteers
  };
};

export default connect(
  mapStateToProps,
  {
    getTrainingSeriesID,
    getTrainingSeriesForVolunteer,
    getAllVolunteers,
    addVolunteerToTrainingSeries
  }
)(withStyles(styles)(AddMemberToTrainingSeries));
