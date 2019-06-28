// Main page fro displaying a list of all classes
import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import history from "history.js";

import {
  getVolunteerClasses,
  getClassByID
} from "store/actions/classesActions";

import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

function VolunteerClassTab(props) {
  useEffect(() => {
    props.getVolunteerClasses();
  }, [getVolunteerClasses]);

  const getClassID = id => {
    props.getClassByID(id);
    props.history.push(`/home/classes/${id}`);
  };

  console.log(props);
  return (
    <>
      {props.volunteerClasses.length === 0 ? (<Typography style={{textAlign: "center",
      fontSize: "1.2rem",
      marginTop: "9rem",
      color: "grey"}}> No Assigned Classes</Typography>): (
        <>
        {props
          .getFiltered(props.volunteerClasses)
          .map(
            ({
              id,
              class_name,
              subject,
              grade_level,
              number_of_students,
              teacher_name
            }) => {
              return (
                <div style={{ display: "flex", flexWrap: "wrap" }}>

                <ListStyles key={id} component="li">
                  <Typography key={id}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => getClassID(id)}
                    >
                      <Typography
                        variant="subtitle1"
                        style={{
                          display: "flex",
                          justifyContent: "space-between"
                        }}
                      >
                        {class_name}
                      </Typography>
                      <hr />
                      <Typography variant="overline">
                        {`Subject: ${subject}`}
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
                    </div>
                  </Typography>
                </ListStyles>
                </div>

              );
            }
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    volunteerClasses: state.classesReducer.volunteerClasses,
    userProfile: state.userReducer.userProfile,
    classID: state.classesReducer.classID
  };
};

export default connect(
  mapStateToProps,
  { getVolunteerClasses, getClassByID }
)(VolunteerClassTab);
