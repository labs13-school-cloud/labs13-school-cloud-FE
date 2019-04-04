// displays individual team member card
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteTeamMember } from "../../store/actions";

//Styles
import { withStyles } from "@material-ui/core/styles";
import {
  // Card,
  // CardActions,
  // CardContent,
  // Typography,
  ListItem,
  ListItemText
} from "@material-ui/core/";

import TeamMemberMenuBtn from "../TeamMembers/TeamMemberMenuBtn";
//Routing
import { withRouter } from "react-router";

const styles = {
  card: {
    width: "100%",
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between"

    // "&:hover": {
    //   background: "#C8C8C8"
    // }
  },
  listItem: {
    width: "100%",
    height: 70,
    marginBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8E9EB"
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
  const [id, setID] = useState(false);

  const routeToMemberPage = (e, id) => {
    e.preventDefault();
    props.history.push(`/home/team-member/${id}`);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    props.deleteTeamMember(id);
  };

  return (
    <ListItem
      className={classes.listItem}
      onMouseEnter={() => {
        setID(true);
      }}
      onMouseLeave={() => {
        setID(false);
      }}
    >
      <ListItemText
        primary={firstName + " " + lastName}
        secondary={`Job: ${jobDescription}`}
      />
      {id ? (
        <div>
          <i
            className={`material-icons ${classes.icons}`}
            onClick={e => routeToMemberPage(e, teamMemberID)}
          >
            edit
          </i>
          <i
            className={`material-icons ${classes.icons}`}
            onClick={e => handleDelete(e, teamMemberID)}
          >
            delete
          </i>
        </div>
      ) : (
        <></>
      )}
      {/* <TeamMemberMenuBtn teamMember={props.teamMember} /> */}
    </ListItem>

    // <Card className={classes.card}>
    //   <CardContent>
    //     <Typography
    //       className={classes.title}
    //       variant="h5"
    //       component="h3"
    //       gutterBottom
    //     >
    //       {firstName + ' ' + lastName}
    //     </Typography>
    //     <Typography variant="caption">Job: {jobDescription}</Typography>
    //   </CardContent>
    //   <CardActions>
    //     <TeamMemberMenuBtn teamMember={props.teamMember} />
    //   </CardActions>
    // </Card>
  );
}

TeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteTeamMember }
)(withStyles(styles)(withRouter(TeamMember)));
