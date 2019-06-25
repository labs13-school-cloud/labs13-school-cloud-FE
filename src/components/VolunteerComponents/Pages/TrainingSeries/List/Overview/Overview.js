// main page for displaying list of training series for volunteer
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getTrainingSeries,
  getAllMessages,
  deleteTrainingSeries,
  getVolunteerTrainingSeries,
  getUser,
  getTrainingSeriesID
} from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import DeleteModal from "components/UI/Modals/deleteModal";
import { ListStyles, styles } from "./styles.js";

function Overview(props) {
  useEffect(() => {
    props.getUser();
    props.getVolunteerTrainingSeries(props.userProfile.user.id);
  }, [props.getTrainingSeriesForVolunteer]);

  const goToTrainingSeries = id => {
    getTrainingSeriesID(id);
    props.history.push(`/home-volunteer/training-series/${id}`);
  };
  return (
    <ListStyles>
      {props
        .getFiltered(props.volunteerTrainingSeries)
        .map(({ training_series_id, title, finished }) => {
          return (
            <ListItem
              key={training_series_id}
              component="li"
              className={props.classes.listItem}
            >
              <ListItemText
                primary={title}
                secondary={`Status: ${
                  finished === null || false ? "Not Complete" : "Complete"
                }  `}
                onClick={e => goToTrainingSeries(training_series_id)}
              />
            </ListItem>
          );
        })}
    </ListStyles>
  );
}

const mapStateToProps = state => ({
  volunteerTrainingSeries: state.trainingSeriesReducer.volunteerTrainingSeries,
  notifications: state.notificationsReducer.notifications,
  messages: state.messagesReducer.messages,
  userProfile: state.userReducer.userProfile
});

export default connect(
  mapStateToProps,
  {
    getTrainingSeries,
    getAllMessages,
    deleteTrainingSeries,
    getVolunteerTrainingSeries,
    getUser,
    getTrainingSeriesID
  }
)(withStyles(styles)(Overview));
