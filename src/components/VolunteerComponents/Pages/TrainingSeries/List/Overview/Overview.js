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
import { ListItem, ListItemText, Typography } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview(props) {
  const {
    getVolunteerTrainingSeries,
    getTrainingSeriesID,
    userProfile
  } = props;
  useEffect(() => {
    getVolunteerTrainingSeries(userProfile.user.id);
  }, [getVolunteerTrainingSeries, userProfile]);
  const goToTrainingSeries = id => {
    getTrainingSeriesID(id);
    props.history.push(`/home/training-series/${id}`);
  };
  return (
    <ListStyles>
      {props.volunteerTrainingSeries.length === 0 ? (
        <Typography className={props.classes.noMessage}>
          No Training Series Assigned
        </Typography>
      ) : (
        <>
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
        </>
      )}
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
