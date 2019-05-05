// displays individual team member card
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Redux
import { deleteTeamMember } from "store/actions";

//Styles
import { styles } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";

//Routing
import { withRouter } from "react-router";
import TeamMemberOptions from "../../UI/Modals/TeamMemberOptions";



function TeamMember(props) {
  const { classes } = props;
  const { first_name, last_name, job_description, id } = props.teamMember;

  const routeToMemberPage = (e, id) => {
    e.nativeEvent.stopPropagation();
    e.preventDefault();
    props.history.push(`/home/team-member/${id}`);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    props.deleteTeamMember(id);
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={first_name + " " + last_name}
        secondary={`Job: ${job_description}`}
        onClick={e => routeToMemberPage(e, id)}
      />
      <div>
        <TeamMemberOptions
          routeToMemberPage={routeToMemberPage}
          handleDelete={handleDelete}
          teamMemberID={id}
          userId={props.userId}
        />
      </div>
    </ListItem>
  );
}

TeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteTeamMember }
)(withStyles(styles)(withRouter(TeamMember)));
