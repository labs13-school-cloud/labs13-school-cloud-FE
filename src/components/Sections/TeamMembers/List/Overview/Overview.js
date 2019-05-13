// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import TeamMemberOptions from "components/UI/Modals/TeamMemberOptions";
import { getTeamMembers, deleteTeamMember } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview({
  pagination: { offset, limit, setMax },
  search,
  user_id,
  filter,
  getTeamMembers: getMemberFromProps,
  deleteTeamMember: deleteMemberFromProps,
  teamMembers,
  classes,
  history
}) {
  useEffect(() => {
    getMemberFromProps(user_id);
  }, [getMemberFromProps, user_id]);

  const setFilter = { items: teamMembers, offset, limit, search };
  const filtered = filter(setFilter);

  const formatted = filtered.map(
    ({ first_name, last_name, job_description, id, user_id }) => {
      return (
        <ListItem key={id} className={classes.listItem}>
          <ListItemText
            primary={first_name + " " + last_name}
            secondary={`Job: ${job_description}`}
            onClick={e => console.log(e, id)}
          />
          <div>
            <TeamMemberOptions
              routeToMemberPage={() => history.push(`/home/team-member/${id}`)}
              handleDelete={() => deleteMemberFromProps(id)}
              teamMemberID={id}
              user_id={user_id}
            />
          </div>
        </ListItem>
      );
    }
  );
  setMax(formatted.length);
  return <ListStyles>{formatted}</ListStyles>;
}

const mapStateToProps = state => ({
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  { getTeamMembers, deleteTeamMember }
)(withStyles(styles)(Overview));
