import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getTeamMembers, getNotifications } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Button, Typography } from "@material-ui/core/";

import { styles, HeaderContainer, HolderText } from "./styles.js";

function Assign(props) {
  const {
    List,
    classes,
    user_id,
    history,
    match: { params },
    getTeamMembers: getTMsFromProps,
    getNotifications: getNotifFromProps
  } = props;

  useEffect(() => {
    getTMsFromProps(user_id);
    getNotifFromProps();
  }, [getTMsFromProps, getNotifFromProps, user_id]);

  // Filter unique team member IDs from notifications
  // Add is_sent to filter to remove old messages?
  const tmIDs = new Set(
    props.notifications
      .filter(n => n.training_series_id === parseInt(params.id))
      .map(n => n.team_member_id)
  );
  const assignedMembers = props.teamMembers.filter(t => tmIDs.has(t.id));

  return (
    <Paper className={classes.paper}>
      <HeaderContainer>
        <Typography variant="title" className={classes.assignedTitle}>
          Assigned Team Members
        </Typography>
        <Button
          disabled={!props.teamMembers.length}
          className={classes.assignButton}
          variant={"outlined"}
          onClick={() => history.push(`/home/assign-members/${props.ts_id}`)}
        >
          Assign Members
        </Button>
      </HeaderContainer>
      <List teamMembers={assignedMembers} />
      {props.teamMembers.length && !assignedMembers.length && (
        <>
          <Typography variant="subheading" className={classes.messageTextTop}>
            This training series currently does not have any team members
            assigned to it.
          </Typography>
          <Typography variant="subheading" className={classes.messageText}>
            Click the button above to create assignments.
          </Typography>
        </>
      )}
      {!props.teamMembers.length && !assignedMembers.length && (
        <Typography variant="subheading" className={classes.messageText}>
          <HolderText>
            <p>You don't have any team members to assign.</p>
            <p>
              <Link to="/home/create-team-member">Click here</Link> to add a
              member to your account.
            </p>
          </HolderText>
        </Typography>
      )}
    </Paper>
  );
}

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.notifications,
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  { getTeamMembers, getNotifications }
)(withStyles(styles)(Assign));
