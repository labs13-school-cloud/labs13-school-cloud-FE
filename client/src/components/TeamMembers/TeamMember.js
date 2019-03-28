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

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 250,
    marginBottom: 20
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

  console.log("PROPS", props);
  return (
    <Card className={classes.card}>
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
      </CardActions>
    </Card>
  );
}

TeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TeamMember);
