import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getClassList, getActiveClass } from "store/actions";
// import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core/";

import { styles, Wrapper } from "./styles.js";

function SinglePage(props) {
  const { getActiveClass, match } = props

  useEffect(() => {
    getActiveClass(match.params.id);
  }, [getActiveClass, match]);
  console.log(props);
  const {
    id,
    class_name,
    subject,
    grade_level,
    number_of_students,
    teacher_name
  } = props.singleClass;

  return (
    <Wrapper key={`container_${id}`} style={{ textAlign: "center" }}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h6">Class Name: {class_name}</Typography>
          <Typography variant="h6">Teacher's Name: {teacher_name}</Typography>
          <Typography variant="body1">Subject: {subject}</Typography>

          <Typography variant="body1">Grade Level: {grade_level} </Typography>
          <Typography variant="body1">
            Number of Students: {number_of_students}{" "}
          </Typography>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    classID: state.classesReducer.classID,
    singleClass: state.classesReducer.singleClass
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getClassList, getActiveClass }
  )(withStyles(styles)(SinglePage))
);
