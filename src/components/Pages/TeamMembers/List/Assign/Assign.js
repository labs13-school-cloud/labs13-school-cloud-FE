import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

import DeleteModal from "components/UI/Modals/deleteModal";
import { getAllMessages, getNotifications } from "store/actions";
import history from "history.js";

import { styles, ListStyles, ListButtonContainer } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";

function Assign(props) {
  const {
    classes,
    teamMembers,
    params,
    messages,
    notifications,
    getAllMessages: messagesFromProps,
    getNotifications: notificationsFromProps
  } = props;

  useEffect(() => {
    if (!notifications.length) notificationsFromProps();
    if (!messages.length) messagesFromProps();
  }, [messagesFromProps, notificationsFromProps]);

  const getStartDate = tm_id => {
    const [notification, message] = _getNotifAndMsgPair(tm_id);
    return moment(notification.send_date)
      .subtract(message.days_from_start, "days")
      .format("MMMM Do, YYYY");
  };

  const _getNotifAndMsgPair = tm_id => {
    const notification = notifications.find(
      n =>
        n.training_series_id === parseInt(params.id, 10) &&
        n.team_member_id === tm_id
    );
    const message = messages.find(m => m.id === notification.message_id);
    return [notification, message];
  };

  return (
    <>
      {teamMembers.map(member => (
        <ListStyles key={member.id}>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={`Member: ${member.first_name} ${member.last_name}`}
              secondary={`Start Date: ${getStartDate(member.id)}`}
              onClick={e => history.push(`/home/team-member/${member.id}`)}
            />
            <ListButtonContainer>
              <DeleteModal
                className={`material-icons ${classes.icons}`}
                deleteType="unassign"
                id={member.id}
                ts_id={params.id}
              />
            </ListButtonContainer>
          </ListItem>
        </ListStyles>
      ))}
    </>
  );
}

const mapStateToProps = state => ({
  messages: state.messagesReducer.messages,
  notifications: state.notificationsReducer.notifications
});

export default connect(
  mapStateToProps,
  { getAllMessages, getNotifications }
)(withStyles(styles)(Assign));
