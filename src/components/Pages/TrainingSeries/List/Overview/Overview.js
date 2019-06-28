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
import EditModal2 from "components/UI/Modals/editModalV2.js";
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
    editFields,
    editModalTitle,
    section
  } = props;
  
  useEffect(() => {
    getTrainingSeries();
    getAllMessages();
  }, [getTrainingSeries, getAllMessages]);

  return (
    <ListStyles>
      {getFiltered(trainingSeries).map(series => {
        return (
          <ListItem key={series.id} component="li" className={classes.listItem}>
            <ListItemText
              primary={series.title}
              secondary={`Subject: ${series.subject}`}
              onClick={e => history.push(`/home/training-series/${series.id}`)}
            />
            <div style={{ width: "65px", display: "flex", justifyContent: "space-between" }}>
              <DeleteModal
                deleteType="trainingSeries"
                trainingSeriesId={series.id}
                className={`material-icons ${classes.icons}`}
              />
              <EditModal2
                item={series}
                section={section}
                editModalTitle={editModalTitle}
                editFields={editFields}
              />
            </div>
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