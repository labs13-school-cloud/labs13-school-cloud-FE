import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

//import DeleteModal from "UI/Modals/deleteModal";

import {
  getClassByID,
  deleteClass,
  addClass,
  editClass,
  getClassList
} from "store/actions/classesActions";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Button, Link } from "@material-ui/core/";

import { styles, Wrapper } from "./styles.js";

function SingleClassView(props) {
  const {
    getClassByID,
    addClass,
    deleteClass,
    match,
    history,
    singleClass
  } = props;
  useEffect(() => {
    getClassByID(match.params.id);
  }, [getClassByID, match]);

  useEffect(() => {
    addClass(match.params.id);
    history.push(`/home/classes`);
  }, [addClass, match, history]);

  // Removes class from database
  const removeClass = id => {
    deleteClass(singleClass.id);
    history.push(`/home/classes`);
  };
  // Sends Admin to Edit screen for classes
  const editClass = id => {
    getClassByID(id);
    history.push(`/home/classes`);
  };

  //Exit out of single class view
  const done = e => {
    e.preventDefault();
    if (singleClass.id === match.params.id) {
      this.setState({
        finished: true
      });
    }
  };

  //const { getFiltered, classes, history, getClassList, classList } = props;
  const {
    id,
    grade_level,
    number_of_students,
    teacher_name
  } = props.singleClass;

  console.log("singleClass", props.singleClass);
  console.log("Class ", props.match.params.id);
  console.log(props.classList.class_name);

  return (
    <>
      <Wrapper>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography variant="overline">
              <Typography variant="h6">{props.classList.title}</Typography>
              <i className="material-icons" onClick={removeClass}>
                delete
              </i>{" "}
              <i className="material-icons" onClick={e => editClass(id)}>
                edit
              </i>
              <Button onClick={e => done(true)}>Done</Button>
              <hr />
              {`Subject: ${props.match.params.id}`}
            </Typography>
            <Typography variant="overline">
              {`Grade Level: ${grade_level}`}
            </Typography>
            <Typography variant="overline">
              {`Teacher Name: ${teacher_name}`}
            </Typography>
            <Typography variant="overline">
              {`Number Of Students: ${number_of_students}`}
            </Typography>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const mapStateToProps = state => {
  return {
    classList: state.classesReducer.classList,
    singleClass: state.classesReducer.singleClass,
    trainingSeriesVolunteers:
      state.trainingSeriesReducer.trainingSeriesVolunteers
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getClassByID,
      deleteClass,
      addClass,
      editClass,
      getClassList
    }
  )(withStyles(styles)(SingleClassView))
);
