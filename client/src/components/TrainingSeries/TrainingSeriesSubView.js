import React, { Component } from 'react';
import Fuse from 'fuse.js';

//Components
import TrainingSeriesList from './TrainingSeriesList';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Fab, TextField, InputAdornment } from '@material-ui/core/';
import Pagination from 'material-ui-flat-pagination';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,

		maxWidth: '500px',
		width: '100%',
		height: '100%',
		margin: 5,

		'@media (max-width:768px)': {
			width: '92%',
			marginBottom: 10,
			maxWidth: 'none',
		},
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
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		position: 'sticky',
		top: '100%',
	},
	textField: {
		width: '100%',
	},
	pagination: { width: '90%' },
});

class TrainingSeriesSubView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			limit: 5,
			searchInput: '',
			searchOpen: false,
		};
	}

	openSearch = e => {
		e.preventDefault();
		this.setState({ searchOpen: !this.state.searchOpen });
	};
	handleClick(offset) {
		this.setState({ offset });
	}
	handleChange = e => {
		this.setState({ limit: parseInt(e.target.value, 10) });
	};

	routeToCreateTrainingSeries = e => {
		e.preventDefault();
		this.props.history.push('/home/create-training-series');
	};

	// function to set fuse option and return a response
	searchedTrainingSeries = series => {
		var options = {
			shouldSort: true,
			threshold: 0.3,
			location: 0,
			distance: 100,
			maxPatternLength: 32,
			minMatchCharLength: 3,
			keys: ['title'],
		};

		const fuse = new Fuse(series, options);
		const res = fuse.search(this.state.searchInput);
		return res;
	};

	render() {
		const { classes } = this.props;

		const searchOn = this.state.searchInput.length > 0;

		let trainingSeries;

		// checks if the search field is active and there are results from the fuse search
		if (searchOn && this.searchedTrainingSeries(this.props.trainingSeries).length > 0) {
			trainingSeries = this.searchedTrainingSeries(this.props.trainingSeries);
		} else {
			trainingSeries = this.props.trainingSeries;
		}

		return (
			<>
				<Paper className={classes.root} elevation={2}>
					<div className={classes.columnHeader}>
						<Typography variant="h5">Training Series</Typography>
						<div className={classes.icons}>
							<Fab
								color="primary"
								size="small"
								aria-label="Add"
								className={classes.fab}
								onClick={e => this.openSearch(e)}>
								<i className="material-icons">search</i>
							</Fab>

							<Fab
								color="primary"
								size="small"
								aria-label="Add"
								className={classes.fab}
								onClick={e => this.routeToCreateTrainingSeries(e)}>
								<i className="material-icons">add</i>
							</Fab>
						</div>
					</div>
					<div>
						{this.state.searchOpen && (
							<TextField
								id="standard-search"
								type="search"
								className={classes.textField}
								onChange={e => this.setState({ searchInput: e.target.value })}
								margin="normal"
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											<i class="material-icons">search</i>
										</InputAdornment>
									),
								}}
							/>
						)}
					</div>
					<TrainingSeriesList
						deleteTrainingSeries={this.props.deleteTrainingSeries}
						trainingSeries={trainingSeries}
						offset={this.state.offset}
						match={this.props.match}
						userId={this.props.userId}
						limit={this.state.limit}
					/>
					<div className={classes.footer}>
						<Pagination
							limit={this.state.limit}
							offset={this.state.offset}
							total={trainingSeries.length}
							centerRipple={true}
							onClick={(e, offset) => this.handleClick(offset)}
						/>
					</div>
				</Paper>
			</>
		);
	}
}

export default withStyles(styles)(TrainingSeriesSubView);
