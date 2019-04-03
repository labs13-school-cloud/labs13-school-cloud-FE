// displays individual team member card
import React from "react";
import PropTypes from "prop-types";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TeamMemberMenuBtn from "../TeamMembers/TeamMemberMenuBtn";
//Routing
import { withRouter } from "react-router";

const styles = {
  card: {
    minWidth: 275,
    maxWidth: 250,
    marginBottom: 20,
    display:'flex',
    justifyContent:'space-between'

    // "&:hover": {
    //   background: "#C8C8C8"
    // }
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

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          variant='h5'
          component='h3'
          gutterBottom
        >
          {firstName + " " + lastName}
        </Typography>
        <Typography>Job: {jobDescription}</Typography>
      </CardContent>
      <CardActions>
        <TeamMemberMenuBtn teamMember={props.teamMember} />
      </CardActions>
    </Card>
  );
}

TeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(TeamMember));
