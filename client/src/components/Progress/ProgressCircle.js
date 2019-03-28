import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 50,
    width: "100px"
  }
});

function ProgressCircle(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} size="50" />
    </div>
  );
}

ProgressCircle.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProgressCircle);
