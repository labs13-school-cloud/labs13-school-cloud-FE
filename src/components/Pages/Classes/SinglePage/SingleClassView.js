import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";


import { connect } from "react-redux";


import { getClassByID, 
        deleteClass, 
        addClass, 
        editClass } from "store/actions/classesActions";

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

  const removeVolunteer = (id, user_id) => {
    props.deleteVolunteerFromTrainingSeries(id, user_id);
  };
  const { id, name, title, subject, link } = props.singleClass;

  const done = e => {
    e.preventDefault();
    if (props.SingleClass.id === props.match.params.id) {
      this.setState({
        finished: true
      });
    }
  };

  

  console.log("singleClass", props.singleClass);
  console.log("Classes ", props.match.params.id);
  return (
    <>
      <Wrapper>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <i className="material-icons" onClick={removeClass}>
              delete
            </i>{" "}
            <i className="material-icons" onClick={e => editClass(id)}>
              edit
            </i>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1"> Class: {props.match.params.id}</Typography>
            <Typography>
              Classes Overview:
              <Link to={link}>Classes Link</Link>
            </Typography>
            <Typography variant="body1">Creator: {name}</Typography>
            <Button onClick={e => done(true)}>
              Done
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Volunteers Available</Typography>
            <i className="material-icons" onClick={e => addClass(id)}>
              add_circle
            </i>
            {props.trainingSeriesVolunteers.map(v =>
              v.length !== 0 ? (
                <Typography variant="body1" key={v.id}>
                  {v.name}{" "}
                  <i
                    className="material-icons"
                    onClick={e =>
                      removeVolunteer({
                        id: props.match.params.id,
                        user_id: v.volunteer_id
                      })
                    }
                  >
                    delete_forever
                  </i>
                </Typography>
              ) : (
                <Typography>
                  No Volunteers taking this Training Series
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
        editClass
    }
  )(withStyles(styles)(SingleClassView))
);




