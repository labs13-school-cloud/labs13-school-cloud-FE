import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";

import {
  getAllMessages,
  getNotifications,
  unassignTeamMember,
  addNotification
} from "store/actions";
import DeleteModal from "components/UI/Modals/deleteModal";
import NotificationWidget from "components/UI/Snackbar/SnackBarTeamMember.js";

function EditButtons(props) {
  const {
    state,
    messages,
    notifications,
    getAllMessages,
    getNotifications,
    addNotification,
    teamMembers
  } = props;

  useEffect(() => {
    getAllMessages();
    getNotifications();
  }, [getAllMessages, getNotifications]);

  const rebuildNotifications = () => {
    // Since notifications are created when users are assigned, changing mentor/managers
    // after a user is already assigned to a training series creates a layer of difficulty
    // for the frontend.  So...yes, this is really ugly

    // Find the edited team member's notifications
    const memberNotifs = notifications.filter(
      m => m.team_member_id === state.teamMember.id
    );
    if (memberNotifs.length) {
      // If they have notifications, find the related messages
      const pairedMessages = memberNotifs.map(n =>
        messages.find(m => m.id === n.id)
      );
      // Did the related messages have a for_ROLE property?
      const relationshipMsgs = pairedMessages.filter(
        m => m.for_manager || m.for_mentor
      );

      if (relationshipMsgs.length) {
        // If so, get all unique training series IDs
        const trainingSeriesIDs = new Set(
          relationshipMsgs.map(m => m.training_series_id)
        );

        // Find the days from start of the message that pairs with the notification that is going to send next
        const daysFromStart = Math.min(
          ...pairedMessages.map(m => m.days_from_start)
        );
        // Find all messages for those training series that have yet to send
        const messagesToRebuild = messages.filter(
          m =>
            trainingSeriesIDs.has(m.training_series_id) &&
            m.days_from_start >= daysFromStart
        );

        if (messagesToRebuild.length) {
          // Begin building new notifications
          const roles = getRoles(messages[0]);
          const roleIDs = {
            // Hard coded, could iterate to build these if you're adding more roles
            team_member: state.teamMember.id,
            manager: state.teamMember.manager_id,
            mentor: state.teamMember.mentor_id
          };

          messagesToRebuild.forEach(m => {
            unassignTeamMember(state.teamMember.id, m.training_series_id);

            roles.forEach(role => {
              if (m[`for_${role}`]) {
                // An issue with how we wrote notifications / assigning training series is
                // we have no way of knowing how we should send to a mentor/mgr.  So I am checking
                // what the notification was originally sent as and verifying mentor/mgr has that
                // service enabled.  Otherwise, I'm going to default to text.
                const serviceID = memberNotifs.find(n => n.message_id === m.id)
                  .service_id;
                const sidConversion = {
                  "1": "phone_number",
                  "2": "email",
                  "3": "slack_uuid"
                };
                const member = teamMembers.find(tm => tm.id === roleIDs[role]);
                const serviceProperty = sidConversion[serviceID];
                const service = member[serviceProperty] ? serviceID : 1;

                const notif = {
                  message_id: m.id,
                  service,
                  team_member_id: roleIDs[role],
                  send_date: memberNotifs.find(n => n.message_id === m.id)
                    .send_date
                };
                addNotification(notif);
              } // if (m[`for_${role}`])
            }); // roles forEach;
          }); // messagesToRebuild forEach;
        } // if (messagesToRebuild)
      } // if (relationshipMsgs)
    } // if (memberNotifs)
  };

  return (
    <ButtonContainer>
      <NotificationWidget
        disabled={state.addDisabled}
        teamMember={state.teamMember}
        type="success"
        submitType="edit"
        updateNotifications={() => rebuildNotifications()}
      />
      <DeleteModal
        deleteType="inTeamMemberPage"
        teamMemberId={state.teamMember.id}
        user_id={state.teamMember.user_id}
        displayType="button"
      />
    </ButtonContainer>
  );
}

const mapStateToProps = state => ({
  messages: state.messagesReducer.messages,
  notifications: state.notificationsReducer.notifications,
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  { getAllMessages, getNotifications, addNotification, unassignTeamMember }
)(EditButtons);

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

function getRoles(msg) {
  // Shameless copy/paste.  It's week 5...have to ship...
  const roles = [];
  for (let prop in msg) {
    if (prop.substring(0, 4) === "for_") {
      roles.push(prop.substring(4));
    }
  }
  return roles;
}
