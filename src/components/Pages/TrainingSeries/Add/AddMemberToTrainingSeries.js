import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { styles, Wrapper } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
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

  return (
    <Wrapper>
     <Typography
variant="h6" style={{ fontSize: "1.5rem", textAlign: 'center' }}
>
Add Volunteer to Training Series            </Typography>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: 'center' }}>
    
      {props.volunteers.map(v => (
        <Wrapper key={v.id} style={{ width: "10%", margin: ".5rem", textAlign: 'center' }}>
          <Typography variant="body1" style={{marginBottom: ".5rem"}}>{v.name}</Typography>{" "}
          <Button className={props.classes.button} onClick={e => addVolunteer(props.match.params.id, v.id)}>
            Add
          </Button>
        </Wrapper>
      ))}
      </div>
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
