// displays individual team member card
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Redux
import { deleteTeamMember } from "store/actions";

//Styles
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";

//Routing
import { withRouter } from "react-router";
import TeamMemberOptions from "../../Modals/TeamMemberOptions";

const styles = {
  card: {
    width: "100%",
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between"
  },
  listItem: {
    width: "100%",
    height: 70,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8E9EB",
    transition: "background-color 0.3s",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "whitesmoke"
    }
  },
  icons: {
    display: "block",
    width: 20,
    color: "gray",
    cursor: "pointer",
    "&:hover": { color: "#2699FB" }
  },
  hidden: {
    display: "none"
  },

  title: {
    fontSize: 16
  }
};

function TeamMember(props) {
  const { classes } = props;
  const {
    firstName,
    lastName,
    jobDescription,
    teamMemberID
  } = props.teamMember;

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
        primary={firstName + " " + lastName}
        secondary={`Job: ${jobDescription}`}
        onClick={e => routeToMemberPage(e, teamMemberID)}
      />
      <div>
        <TeamMemberOptions
          routeToMemberPage={routeToMemberPage}
          handleDelete={handleDelete}
          teamMemberID={teamMemberID}
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
