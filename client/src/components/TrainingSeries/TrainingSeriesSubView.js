import React, { Component } from 'react';

//Components
import TrainingSeriesList from './TrainingSeriesList';
import TrainingSeriesModal from '../Modals/TrainingSeriesModal';

import { withStyles } from '@material-ui/core/styles';
import { Paper, List, Typography, Fab } from '@material-ui/core/';
import Pagination from 'material-ui-flat-pagination';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
	footer: { display: 'flex', justifyContent: 'space-between' },
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

					{this.props.trainingSeries.length < 5 ? (
						''
					) : (
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='pagination-selector'>View</InputLabel>
							<Select
								native
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
							</Select>
						</FormControl>
					)}
				</div>
			</Paper>
		);
	}
}

export default withStyles(styles)(TrainingSeriesSubView);
