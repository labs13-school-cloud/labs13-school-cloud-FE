import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import {
  getTrainingSeriesForVolunteer,
  getTrainingSeriesID,
  editTrainingSeries,
  deleteTrainingSeries,
  addVolunteerToTrainingSeries,
  deleteVolunteerFromTrainingSeries,
  getAllVolunteers
} from "store/actions";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";
import DeleteModal from "components/UI/Modals/deleteModal";
import EditModal from "components/UI/Modals/editModal";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Divider,
  Typography,
  Grid,
  Button,
  Link
} from "@material-ui/core/";

import { styles, PageContainer, Wrapper } from "./styles.js";

function SingleTrainingSeries(props) {
  useEffect(() => {
    props.getTrainingSeriesForVolunteer(props.match.params.id);
  }, [props.getTrainingSeriesForVolunteer]);
  useEffect(() => {
    props.getTrainingSeriesID(props.match.params.id);
  }, [props.getTrainingSeriesID]);

  // Removes Training Series from database
  const removeTrainingSeries = id => {
    props.deleteTrainingSeries(props.activeTrainingSeries.id);
    props.history.push(`/home`);
  };
  // Sends Admin to Edit page for Training Series
  const editTrainingSeries = id => {
    props.getTrainingSeriesID(id);
    props.history.push(`/home/training-series/${id}/edit`);
  };

  // Sends Admin to Add Volunteer to Training Series page
  const addVolunteer = id => {
    props.getTrainingSeriesID(id);
    props.getAllVolunteers();
    props.history.push(`/home/training-series/${id}/addVolunteer`);
  };
  // Remove Volunteer from training series
  const removeVolunteer = (id, user_id) => {
    props.deleteVolunteerFromTrainingSeries(id, user_id);
  };
  // destructor training series
  const { id, name, title, subject, link } = props.activeTrainingSeries;
  return (
    <>
      <Wrapper>
        <Grid container>
          <Grid item xs={11}>
            <Typography
              variant="h6"
              style={{
                textAlign: "center",
                marginLeft: "5rem",
                fontSize: "1.8rem"
              }}
            >
              {title}
            </Typography>
          </Grid>
          <Grid
            item
            xs={1}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <i
              className={`material-icons ${props.classes.icons}`}
              onClick={e => editTrainingSeries(id)}
            >
              edit
            </i>
            <i
              className="material-icons"
              className={`material-icons ${props.classes.iconDelete}`}
              onClick={removeTrainingSeries}
            >
              delete
            </i>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={5}
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              flexDirection: "column",

              justifyContent: "space-evenly",
              alignContent: "center"
            }}
          >
            <Typography variant="body1" className={props.classes.info}>
              Subject: {subject}
            </Typography>
            <Typography className={props.classes.info}>
              Link to Training Series:
              <Link to={link} className={props.classes.info}>
                {" "}
                Training Link
              </Link>
            </Typography>
            <Typography variant="body1" className={props.classes.info}>
              Creator: {name}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              padding: "1rem"
            }}
          >
            <Wrapper>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center"
                }}
              >
                <Typography
                  variant="h6"
                  style={{
                    marginRight: "5px",
                    marginBottom: "10px"
                  }}
                >
                  Active Volunteers
                </Typography>
                <i
                  className={`material-icons ${props.classes.icons}`}
                  onClick={e => addVolunteer(id)}
                >
                  add_circle
                </i>
              </div>
              {props.trainingSeriesVolunteers.map(v => (
                <Typography
                  variant="body1"
                  style={{
                    textAlign: "center",
                    marginBottom: "10px"
                  }}
                  key={v.id}
                >
                  {v.name}{" "}
                  <i
                    className={`material-icons ${props.classes.delete}`}
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
              ))}
            </Wrapper>
          </Grid>
        </Grid>
      </Wrapper>
    </>
  );
}

const mapStateToProps = state => ({
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries,
  trainingSeriesVolunteers:
    state.trainingSeriesReducer.trainingSeriesVolunteers,
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  userProfile: state.userReducer.userProfile,
  volunteers: state.userReducer.volunteers
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getTrainingSeriesForVolunteer,
      getTrainingSeriesID,
      editTrainingSeries,
      deleteTrainingSeries,
      addVolunteerToTrainingSeries,
      deleteVolunteerFromTrainingSeries,
      getAllVolunteers
    }
  )(withStyles(styles)(SingleTrainingSeries))
);
