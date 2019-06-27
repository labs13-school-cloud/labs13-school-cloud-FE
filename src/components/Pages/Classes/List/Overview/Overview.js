// Main page fro displaying a list of all classes
import React, { useEffect } from "react";
import { connect } from "react-redux";

import history from "history.js";

import EditModal from "components/UI/Modals/editModal";
import DeleteModal from "components/UI/Modals/deleteModal";
import AddModal from "components/UI/Modals/addModal";
import { getClassList, deleteClass } from "store/actions/classesActions";
import Snackbar from "components/UI/Snackbar/Snackbar";

import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

function Overview(props) {
  useEffect(() => {
    props.getClassList();
  }, [getClassList]);

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {props.classList.map(c => {
          return (
            <ListStyles
              key={c.id}
              component="li"
              className={props.classList.listItem}
            >
              <Typography key={c.id}>
                <div style={{ cursor: "pointer" }}>
                  <Typography
                    variant="subtitle1"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {c.class_name}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <DeleteModal
                        deleteType="classes"
                        classId={c.id}
                        className={`material-icons ${props.classList.icons}`}
                      />
                      <EditModal classList={c} updateType="classes" />
                    </div>
                  </Typography>
                  <div onClick={() => 
                    history.push(`home/classes/${c.id}`)}>
                    <div>
                      <hr />
                      <Typography variant="overline">
                        {`Subject: ${c.subject}`}
                      </Typography>
                      <Typography variant="overline">
                        {`Grade Level: ${c.grade_level}`}
                      </Typography>
                      <Typography variant="overline">
                        {`Teacher Name: ${c.teacher_name}`}
                      </Typography>
                      <Typography variant="overline">
                        {`Number Of Students: ${c.number_of_students}`}
                      </Typography>
                    </div>
                  </div>
                </div>
                <AddModal classList={c} addType="classes" />
                <Snackbar
              message= " Class overview loaded successfully"
              type="success"
            />
              </Typography>
            </ListStyles>
          );
        })}
      </div>
    </div>
  );
  

     
            
   
  
}

const mapStateToProps = state => {
  return {
    classList: state.classesReducer.classList
  };
};

export default connect(
  mapStateToProps,
  { getClassList, deleteClass }
)(Overview);
