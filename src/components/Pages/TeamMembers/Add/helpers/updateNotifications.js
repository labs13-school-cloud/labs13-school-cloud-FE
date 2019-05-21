import moment from "moment";
export default ({
  state,
  teamMembers,
  notifications,
  messages,
  deleteNotification,
  addNotification
}) => {
  // If the user updates a relationship (manager/mentor), this will update their notifications
  const ogTM = teamMembers.find(tm => tm.id === state.teamMember.id);
  const roles = _getRoles(messages[0]);
  const changedRoles = [];
  const changedIDs = [];

  const getStartDate = (tm_id, ts_id) => {
    const [notification, message] = _getNotifAndMsgPair(tm_id, ts_id);
    return moment(notification.send_date).subtract(
      message.days_from_start,
      "days"
    );
  };

  const _getNotifAndMsgPair = (tm_id, ts_id) => {
    const notification = notifications.find(
      n => n.training_series_id === ts_id && n.team_member_id === tm_id
    );
    const message = messages.find(m => m.id === notification.message_id);
    return [notification, message];
  };

  roles.forEach(role => {
    if (role !== "team_member") {
      // Find any changed roles
      const role_id = `${role}_id`;
      const old_id = ogTM[role_id];
      const new_id = state.teamMember[role_id];

      if (old_id !== new_id) {
        changedIDs.push({ role, old_id, new_id });
        changedRoles.push(role);
      }
    }
  });

  // Get active training series for the team member
  const msg_ids = notifications
    .filter(n => n.recipient_id === ogTM.id)
    .map(n => n.message_id);
  const ts_ids = messages
    .filter(m => msg_ids.includes(m.id))
    .map(m => m.training_series_id);

  // If new roles exist, update old notifications
  const relationshipMsgs = {};
  changedRoles.forEach(role => {
    relationshipMsgs[role] = messages.filter(
      m => m[`for_${role}`] && ts_ids.includes(m.training_series_id)
    );
  });

  if (changedIDs.length && Object.keys(relationshipMsgs).length) {
    //changedRoles
    changedIDs.forEach(changed => {
      if (changed.new_id) {
        // Create new notifications
        relationshipMsgs[changed.role].forEach(m => {
          // We need to know the user's preference on how to send this notification.
          // There are two possibilities we have to check for: there was a previous
          // notification and we can just update it.  Or there isn't and we have to find
          // another message from the training series and check its service_id.  If
          // neither exist, the user cannot be enrolled in the training series.

          // I could have written this with a ternary but despite this being uglier,
          // I thought it'd be easier to read

          // Check for previous notification if not found
          const prevNotif = notifications.find(
            n => n.recipient_id === changed.old_id && n.message_id === m.id
          );
          // Find another notification from the TS if above isn't found
          let similarNotif;
          if (!prevNotif) {
            similarNotif = messages.find(
              ogMsg =>
                ogMsg.training_series_id === m.training_series_id &&
                ogMsg.id !== m.id
            );
          }
          const startDate = getStartDate(ogTM.id, m.training_series_id);
          const send_date = moment(startDate).add(m.days_from_start, "days");

          const { service_id } = prevNotif
            ? { ...prevNotif }
            : { ...similarNotif };

          const serviceConversion = {
            "1": "phone_number",
            "2": "email",
            "3": "slack_uuid"
          };
          // If the mentor/manager doesn't have the original service,
          const superior = teamMembers.find(tm => tm.id === changed.new_id);
          const serviceProperty = serviceConversion[service_id];
          const serviceID = superior[serviceProperty] ? service_id : 1;
          addNotification({
            send_date,
            is_sent: false,
            num_attempts: 0,
            message_id: m.id,
            team_member_id: ogTM.id,
            recipient_id: changed.new_id,
            service_id: serviceID
          });
        });
      }
      if (changed.old_id) {
        // Delete old notifications
        relationshipMsgs[changed.role].forEach(m => {
          const notif = notifications.find(
            n => n.message_id === m.id && n.recipient_id === changed.old_id
          );
          deleteNotification(notif.id);
        });
      }
    });
  }
};

function _getRoles(msg) {
  // Shameless copy/paste.  It's week 5...have to ship...
  const roles = [];
  for (let prop in msg) {
    if (prop.substring(0, 4) === "for_") {
      roles.push(prop.substring(4));
    }
  }
  return roles;
}
