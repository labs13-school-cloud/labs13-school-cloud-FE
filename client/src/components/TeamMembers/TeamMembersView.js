// component to contain all the components related to team members

import React from 'react';

//Components
import TeamMembersList from './TeamMembersList';
import Pagination from 'material-ui-flat-pagination';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Fab, InputLabel, FormControl, NativeSelect } from '@material-ui/core/';

import { getTeamMembers, addTeamMember, deleteTeamMember } from '../../store/actions';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		maxWidth: 300,
		width: '30%',
		marginBottom: 10,
		'@media (max-width:768px)': {
			width: '94%',
			marginBottom: 10,
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
	formControl: {
		margin: theme.spacing.unit,
		// minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2,
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		position: 'sticky',
		top: '100%',
	},
	// pagination: { width: '90%' },
});
class TeamMembersView extends React.Component {
	state = {
		users: [],
		profile: [],
		teamMembers: [],
		offset: 0,
		limit: 5,
	};

	componentDidMount() {
		this.props.getTeamMembers(this.props.userId);
		this.setState({
			teamMembers: this.props.teamMembers,
		});
	}
	handleClick(offset) {
		this.setState({ offset });
	}
	handleChange = e => {
		this.setState({ limit: parseInt(e.target.value, 10) });
	};

	deleteMember = (e, id) => {
		e.preventDefault();
		this.props.deleteTeamMember(id);
	};

	routeToCreateMemberPage = () => {
		this.props.history.push('/home/create-team-member');
	};

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root} elevation={2}>
				<div className={classes.columnHeader}>
					<Typography variant="h5">Team Members</Typography>
					<div className={classes.icons}>
						<Fab
							color="primary"
							size="small"
							aria-label="Add"
							className={classes.fab}
							onClick={this.handleOpen}
							disabled>
							<i className="material-icons">search</i>
						</Fab>
						<Fab
							color="primary"
							size="small"
							aria-label="Add"
							className={classes.fab}
							onClick={this.routeToCreateMemberPage}>
							<i className="material-icons">add</i>
						</Fab>
					</div>
				</div>
				<TeamMembersList
					teamMembers={this.props.teamMembers}
					deleteTeamMember={this.deleteMember}
					limit={this.state.limit}
					offset={this.state.offset}
				/>
				<div className={classes.footer}>
					<Pagination
						limit={this.state.limit}
						reduced={true}
						offset={this.state.offset}
						total={this.props.teamMembers.length}
						onClick={(e, offset) => this.handleClick(offset)}
					/>

					{/****** View per page ******/}
					{/* {this.props.teamMembers.length < 5 ? (
						<span />
					) : (
						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='pagination-selector'>View</InputLabel>
							<NativeSelect
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
							</NativeSelect>
						</FormControl>
					)} */}
				</div>
			</Paper>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.teamMembersReducer.status.isLoading,
		loadFailed: state.teamMembersReducer.status.loadFailed,
		isAdding: state.teamMembersReducer.status.isAdding,
		addSuccess: state.teamMembersReducer.status.addSuccess,
		addFailed: state.teamMembersReducer.status.addFailed,
		teamMembers: state.teamMembersReducer.teamMembers,
	};
};

export default connect(
	mapStateToProps,
	{ getTeamMembers, addTeamMember, deleteTeamMember }
)(withStyles(styles)(withRouter(TeamMembersView)));
