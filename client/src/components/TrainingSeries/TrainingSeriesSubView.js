import React, { Component } from 'react';

//Components
import TrainingSeriesList from './TrainingSeriesList';
import TrainingSeriesModal from '../Modals/TrainingSeriesModal';

import { withStyles } from '@material-ui/core/styles';
import {
	Paper,
	NativeSelect,
	FormControl,
	InputLabel,
	Typography,
	Fab
	// List,
	// Input,
	// OutlinedInput,
	// FilledInput,
	// FormHelperText,
	// Select,
} from '@material-ui/core/';
import Pagination from 'material-ui-flat-pagination';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: '55%',

		'@media (max-width:768px)': {
			width: '94%',
			marginBottom: 10
		}
	},
	columnHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	icons: {
		display: 'flex',
		alignItems: 'center'
	},
	fab: { margin: 5 },
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		position: 'sticky',
		top: '100%'
	},
	pagination: { width: '90%' }
});

class TrainingSeriesSubView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: 0,
			limit: 5
		};
	}

	handleClick(offset) {
		this.setState({ offset });
	}
	handleChange = e => {
		this.setState({ limit: parseInt(e.target.value, 10) });
	};

	render() {
		const { classes } = this.props;

		return (
			<Paper className={classes.root} elevation={2}>
				<div className={classes.columnHeader}>
					<Typography variant='h5'>Training Series</Typography>
					<div className={classes.icons}>
						<Fab
							color='primary'
							size='small'
							aria-label='Add'
							className={classes.fab}
							onClick={this.handleOpen}
							disabled
						>
							<i className='material-icons'>search</i>
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
					offset={this.state.offset}
					match={this.props.match}
					userID={this.props.userID}
					limit={this.state.limit}
				/>
				<div className={classes.footer}>
					<Pagination
						limit={this.state.limit}
						offset={this.state.offset}
						total={this.props.trainingSeries.length}
						onClick={(e, offset) => this.handleClick(offset)}
					/>

					{/****** View per page ******/}
					{/* {this.props.trainingSeries.length < 5 ? (
						<span></span>
					) : (
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='pagination-selector'>View</InputLabel>
							<NativeSelect
								value={this.state.limit}
								onChange={e => this.handleChange(e)}
								inputProps={{
									id: 'pagination-selector'
								}}
							>
								<option value={5}>5</option>
								<option value={10}>10</option>
								<option value={15}>15</option>
								<option value={20}>20</option>
								<option value={25}>25</option>
							</NativeSelect>
						</FormControl>
					)} */}
				</div>
			</Paper>
		);
	}
}

export default withStyles(styles)(TrainingSeriesSubView);
