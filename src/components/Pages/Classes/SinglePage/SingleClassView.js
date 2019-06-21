import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import history from "history.js";
//import DeleteModal from "UI/Modals/deleteModal";


import { 
        getClassByID, 
        deleteClass, 
        addClass, 
        editClass,
        getClassList } from "store/actions/classesActions";

import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button
} from "@material-ui/core/";

import { styles, Wrapper } from "./styles.js";


function SingleClassView(props) {

  useEffect(() => {
    props.getClassByID(props.match.params.id);
  }, [getClassByID]);


  useEffect(() => {
    props.addClass(props.match.params.id);
  }, [addClass]);



  // Removes class from database
  const removeClass = id => {
    props.deleteClass(props.singleClass.id);
    props.history.push(`/home/classes/${id}`);
  };
  // Sends Admin to Edit screen for classes
  const editClass = id => {
    props.getClassByID(id);
    props.history.push(`/home/classes/${id}/edit`);
  };
//Exit out of single class view
  const done = e => {
    e.preventDefault();
    if (props.singleClass.id === props.match.params.id) {
      this.setState({
        finished: true
      });
    }
  };

  
  const { id, class_name, subject, grade_level, number_of_students, teacher_name, link, title } = props.singleClass;

  console.log("singleClass", props.classList[1]);
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
            <Button onClick={e => done(true)}>
              Done
            </Button>
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
        state.trainingSeriesReducer.trainingSeriesVolunteers,
      }
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




