import React from "react";

import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";

import moment from "moment";

const styles = theme => ({
  listStyle: {
    display: "flex",

    padding: "5px"
  },
  listItem: {
    // display: "flex",
    // flexDirections: "column",
    // width: "90%"
    width: "79%",
    height: 95,
    display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",

    "@media (max-width: 768px)": {
      width: "100%",
      margin: "0 auto",
      textAlign: "center"
    }
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
  const { classes } = props;
  // add twelve hours to sendDate, formatting with moment ensures it displays properly on the dashboard 
  const formattedStartDate = moment(props.member.startDate).add(12, "hours").format('MMMM Do, YYYY')
  return (
    <ListStyles>
      <ListItem className={classes.listItem}>
        <ListItemText
          primary={`Member: ${props.member.firstName} ${props.member.lastName}`}
          secondary={`Start Date: ${formattedStartDate}`}
        />
      </ListItem>
    </ListStyles>
  );
};

const ListStyles = styled.div`
  display: flex;
`;

export default withStyles(styles)(TrainingSeriesAssignment);
