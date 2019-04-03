import React, { Component } from "react";

//Components
import TrainingSeriesList from "./TrainingSeriesList";
import TrainingSeriesModal from "../Modals/TrainingSeriesModal";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
});


class TrainingSeriesSubView extends Component {
  render() {
    const { classes } = this.props;

    return (
			<Paper className={classes.root} elevation={2}>
        <TrainingSeriesModal
          getTrainingSeries={this.props.getTrainingSeries}
          userID={this.props.userID}
        />
        <TrainingSeriesList
          deleteTrainingSeries={this.props.deleteTrainingSeries}
          trainingSeries={this.props.trainingSeries}
          match={this.props.match}
          userID={this.props.userID}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TrainingSeriesSubView);
