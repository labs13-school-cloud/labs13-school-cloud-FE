// displays individual team member card

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TeamMemberModal from "../Modals/TeamMemberModal";

import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 250,
    marginBottom: 20,
    "&:hover": {
      background: "#C8C8C8"
    }
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

  const routeToMemberPage = e => {
    e.preventDefault();
    props.history.push({
      pathname: "/team-member",
      state: {
        teamMemberId: teamMemberID
      }
    });
  };

  return (
    <Card
      className={classes.card}
      //Need to pass down team member info to populate team member page
    >
      <CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          component="h3"
          gutterBottom
        >
          {firstName + " " + lastName}
        </Typography>
        <Typography>Job: {jobDescription}</Typography>
        <Typography>Series: Waiter Fundamentals</Typography>
        <Typography>Start Date: March 8</Typography>
      </CardContent>
      <CardActions>
        <TeamMemberModal
          modalType="edit"
          teamMember={props.teamMember}
          teamMemberId={props.teamMember.teamMemberID}
        />
        <Button
          size="small"
          onClick={e => props.deleteTeamMember(e, teamMemberID)}
        >
          Delete
        </Button>
        <Button size="small" onClick={routeToMemberPage}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}

TeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(TeamMember));
