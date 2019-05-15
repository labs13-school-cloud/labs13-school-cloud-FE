import React, { useEffect } from "react";
import { connect } from "react-redux";

import { createAMessage, editMessage, getAllMessages } from "store/actions";
import DeleteModal from "components/UI/Modals/deleteModal";

import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider
} from "@material-ui/core/";

import { styles, ListItemContainer, ListButtonContainer } from "./styles.js";

function Messages(props) {
  const {
    getFiltered,
    messages,
    classes,
    history,
    getAllMessages: getMessagesFromProps
  } = props;

  useEffect(() => {
    getMessagesFromProps();
  }, [getMessagesFromProps]);

  return (
    <>
      {getFiltered(messages).map(message => (
        <ListItemContainer key={message.id}>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={message.subject}
              secondary={message.body}
              className={classes.listItemText}
              onClick={e => history.push(`/home/message/${message.id}`)}
            />
            <ListItemSecondaryAction className={classes.secondaryAction}>
              <div>
                <p>
                  {message.days_from_start} day
                  {message.days_from_start > 1 ? "s" : ""}
                </p>
              </div>
              <ListButtonContainer>
                <i
                  className={`material-icons ${classes.icons}`}
                  onClick={e => history.push(`/home/message/${message.id}`)}
                >
                  edit
                </i>
                <DeleteModal
                  className={`material-icons ${classes.icons}`}
                  deleteType="message"
                  id={message.id}
                />
              </ListButtonContainer>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </ListItemContainer>
      ))}
    </>
  );
}

const mapStateToProps = state => ({
  messages: state.messagesReducer.messages
});

export default connect(
  mapStateToProps,
  { createAMessage, editMessage, getAllMessages }
)(withStyles(styles)(Messages));
