import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

//import DeleteModal from "UI/Modals/deleteModal";
import { getClassByID, 
        deleteClass, 
        addClass, 
        editClass } from "store/actions/classesActions";

import { singleClass } from "store/reducers/classesReducer"


import { withStyles } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Button,
  Link
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

  const completeClass = e => {
    e.preventDefault();
    if (props.SingleClass.id === props.match.params.id) {
      this.setState({
        finished: true
      });
    }
  };

  const {
    id,
    first_name,
    last_name,
    title,
    subject,
    link,
    finished
  } = props.singleClass;

  console.log("singleClass", props.SingleClass);
  console.log("Classes ", props.match.params.id);
  return (
    <>
      <Wrapper key={`container_${id}`}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <i class="material-icons" onClick={removeClass}>
              delete
            </i>{" "}
            <i class="material-icons" onClick={e => editClass(id)}>
              edit
            </i>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">Subject: {subject}</Typography>
            <Typography>
              Link to Classes:
              Link to Training Series:
              <Link to={link}> Classes Link</Link>
            </Typography>
            <Typography variant="body1">
              Creator: {first_name} {""}
              {last_name}
            </Typography>
            <Button onClick={e => completeClass(finished)}>
              Done
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Active Volunteers</Typography>
            <i class="material-icons">add_circle</i>
            {props.classList.map(v =>
              // checks if any volunteers are assigned to Classes
              v.length !== 0 ? (
                <Typography variant="body1" key={v.id}>
                  {v.first_name} {""}
                  {v.last_name} <i class="material-icons">delete</i>
                </Typography>
              ) : (
                <Typography variant="body1">
                  No volunteers are assigned to this class at this time.
                </Typography>
              )
            )}
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const mapStateToProps = state => {
    return {
        classList: state.classesReducer.classList,
        singleClass: state.classesReducer.singleClass
      }
};

export default withRouter(
  connect(
    mapStateToProps,
    {
        getClassByID,
        deleteClass,
        addClass,
        editClass
    }
  )(withStyles(styles)(SingleClassView))
);




