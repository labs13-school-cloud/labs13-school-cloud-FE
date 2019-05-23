// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import history from "history.js";
import DeleteModal from "components/UI/Modals/deleteModal";
import { getTeamMembers } from "store/actions";

// import { withStyles } from "@material-ui/core/styles";
// import { styles } from "./styles";
import { TeamsMember } from "./styles.js";

import { Typography } from "@material-ui/core/";

function Tab({ user_id, getFiltered, getTeamMembers, teamMembers, classes }) {
  useEffect(() => {
    getTeamMembers(user_id);
  }, [getTeamMembers, user_id]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {getFiltered(teamMembers).map(teamMember => {
        const mentor = teamMembers.find(tm => tm.id === teamMember.mentor_id);
        const manager = teamMembers.find(tm => tm.id === teamMember.manager_id);
        const mentorName = mentor
          ? `${mentor.first_name} ${mentor.last_name}`
          : "Not assigned";
        const managerName = manager
          ? `${manager.first_name} ${manager.last_name}`
          : "Not assigned";
        return (
          <TeamsMember key={teamMember.id}>
            <div
              style={{ cursor: "pointer" }}
              onClick={e => {
                history.push(`/home/team-member/${teamMember.id}`);
              }}
            >
              <Typography variant="subtitle1">
                {teamMember.first_name} {teamMember.last_name}
              </Typography>
              <hr />
              <Typography variant="subtitle2">
                {teamMember.email || (
                  <p style={{ color: "rgba(0,0,0,0.3)" }}>No email assigned</p>
                )}
              </Typography>
              <Typography variant="overline">
                {teamMember.phone_number}
              </Typography>
              <Typography variant="overline">Mentor: {mentorName}</Typography>
              <Typography variant="overline">Manager: {managerName}</Typography>
            </div>
            <DeleteModal
              deleteType="teamMember"
              teamMemberId={teamMember.id}
              user_id={user_id}
            />
          </TeamsMember>
        );
      })}
    </div>
  );
}

const mapStateToProps = state => ({
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  { getTeamMembers }
)(Tab);
//(withStyles(styles)(Tab));
