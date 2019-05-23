// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  getTrainingSeries,
  getAllMessages,
  deleteTrainingSeries
} from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import DeleteModal from "components/UI/Modals/deleteModal";
import { ListStyles, styles } from "./styles.js";

function Overview({
  getFiltered,
  user_id,
  getTrainingSeries,
  getAllMessages,
  trainingSeries,
  notifications,
  messages,
  classes,
  history
}) {
  useEffect(() => {
    getTrainingSeries();
    getAllMessages();
  }, [getTrainingSeries, getAllMessages]);

  return (
    <ListStyles>
      {getFiltered(trainingSeries).map(({ title, id, user: email }) => {
        const tsMessages = messages.filter(msg => {
          return msg.training_series_id === id;
        });
        const userCount = new Set(
          notifications
            .filter(n => n.training_series_id === id)
            .map(n => n.team_member_id)
        ).size;

        return (
          <ListItem key={id} component="li" className={classes.listItem}>
            <ListItemText
              primary={title}
              secondary={`Messages: ${
                tsMessages.length
              } | Assigned: ${userCount}`}
              onClick={e => history.push(`/home/training-series/${id}`)}
            />
            <DeleteModal
              deleteType="trainingSeries"
              trainingSeriesId={id}
              className={`material-icons ${classes.icons}`}
              user_id={user_id}
            />
          </ListItem>
        );
      })}
    </ListStyles>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  notifications: state.notificationsReducer.notifications,
  messages: state.messagesReducer.messages
});

export default connect(
  mapStateToProps,
  { getTrainingSeries, getAllMessages, deleteTrainingSeries }
)(withStyles(styles)(Overview));
