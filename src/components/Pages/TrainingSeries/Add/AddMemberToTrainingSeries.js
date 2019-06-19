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
  const [volunteers, setVolunteers] = useState([]);
  useEffect(() => {
    setVolunteers(volunteers);
  }, [volunteers]);

  useEffect(() => {
    props.getAllVolunteers();
  }, [volunteers]);

  const addVolunteer = (volunteer_id, training_series_id) => {
    props.addVolunteerToTrainingSeries(volunteer_id, training_series_id);
    props.history.push(`/home/training-series/${training_series_id}`);
  };
  // Filter out volunteers that are already apart of the training series
  let addVolunteerToList = props.volunteers.filter(v => {
    return v.id !== props.getTrainingSeriesForVolunteer.volunteer_id;
  });

  return (
    <Wrapper>
      {addVolunteerToList.map(v => (
        <Wrapper key={v.id}>
          {/* <Grid item xs={12}> */}
          <Typography>{v.name}</Typography>{" "}
          <Button
            onClick={e =>
              addVolunteer({
                volunteer_id: v.id,
                training_series_id: props.match.params.id
              })
            }
          >
            Add
          </Button>
          {/* </Grid> */}
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
