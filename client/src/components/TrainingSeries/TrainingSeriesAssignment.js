import React from "react";

import styled from 'styled-components'
import { withStyles } from "@material-ui/core/styles";
import {
  // Card,
  // CardContent,
  // IconButton,
  // Fab,
  // Button,
  // Typography,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper
} from "@material-ui/core/";
// import DeleteIcon from "@material-ui/icons/Delete";
const moment = require("moment");

const styles = theme => ({
  listStyle: {
    display: "flex",

    padding: "5px"
  },
  listItem: {
    display: "flex",
    flexDirections: "column",
    width: "90%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const TrainingSeriesAssignment = props => {
  const startDate = moment(props.member.startDate)
    .format("MMMM Do, YYYY ");
  return (
    <ListStyles>
        <Paper>
      <ListItem>
        <ListItemText
          classname
          primary={`Member: ${props.member.firstName} ${props.member.lastName}`}
          secondary={`Start Date: ${startDate}`}
        />
      </ListItem>
      </Paper>
    </ListStyles>
  );
};

const ListStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default withStyles(styles)(TrainingSeriesAssignment);
