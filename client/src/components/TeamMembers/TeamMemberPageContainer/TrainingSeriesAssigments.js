import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const moment = require("moment");

const styles = theme => ({
  card: {
    minWidth: 275,
    margin: "10px 5px",
    display: "flex",
    "justify-content": "space-between",
    padding: "5px"
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

const TrainingSeriesAssignments = props => {
  const { classes } = props;

  const startDate = moment(props.trainingSeries.startDate).format(
    "MMMM Do, YYYY "
  );

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>Title: {props.trainingSeries.title}</Typography>
        <Typography>Start Date: {startDate} </Typography>
      </CardContent>
      <IconButton aria-label="Delete" className={classes.margin}>
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default withStyles(styles)(TrainingSeriesAssignments);
