import React, { Component } from 'react';

//Components
import TrainingSeriesList from './TrainingSeriesList';
import TrainingSeriesModal from '../Modals/TrainingSeriesModal';
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, Typography, Fab } from '@material-ui/core/';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: '55%',
		overflowY: 'auto',
	},
	columnHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	icons: {
		display: 'flex',
		alignItems: 'center',
	},
	fab: { margin: 5 },
});

class TrainingSeriesSubView extends Component {
	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={2}>
				<div className={classes.columnHeader}>
					<Typography variant="h5">Training Series</Typography>
					<div className={classes.icons}>
						<Fab
							color="primary"
							size="small"
							aria-label="Add"
							className={classes.fab}
							onClick={this.handleOpen}>
							<i className="material-icons">search</i>
						</Fab>
						<TrainingSeriesModal
							getTrainingSeries={this.props.getTrainingSeries}
							userID={this.props.userID}
						/>
					</div>
				</div>

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
