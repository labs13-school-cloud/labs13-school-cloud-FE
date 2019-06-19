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

function Overview(props) {
  const {
    getFiltered,
    user_id,
    getTrainingSeries,
    getAllMessages,
    trainingSeries,
    classes,
    history,
  } = props;
  
  useEffect(() => {
    getTrainingSeries();
    getAllMessages();
  }, [getTrainingSeries, getAllMessages]);

  return (
    <ListStyles>
      {getFiltered(trainingSeries).map(props => {
        return (
          <ListItem key={props.id} component="li" className={classes.listItem}>
            <ListItemText
              primary={props.title}
              secondary={`Subject: ${props.subject} | Volunteers: ${props.volunteers.length}`}
              onClick={e => history.push(`/home/training-series/${props.id}`)}
            />
            <DeleteModal
              deleteType="trainingSeries"
              trainingSeriesId={props.id}
              className={`material-icons ${classes.icons}`}
            />
          </ListItem>
        );
      })}
    </ListStyles>
  );
}

const mapStateToProps = state => {
  return {
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    messages: state.messagesReducer.messages
  }
};

export default connect(
  mapStateToProps,
  { getTrainingSeries, getAllMessages, deleteTrainingSeries }
)(withStyles(styles)(Overview));
