// component to contain all the components related to team members

import React from 'react';

//Components
import TeamMembersList from './TeamMembersList';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { getTeamMembers, addTeamMember, deleteTeamMember } from '../../store/actions';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Fab } from '@material-ui/core/';

import TeamMemberModal from '../Modals/TeamMemberModal';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: '30%',
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
class TeamMembersView extends React.Component {
	state = {
		users: [],
		profile: [],
		teamMembers: [],
	};

	componentDidMount() {
		this.props.getTeamMembers(this.props.userId);
		this.setState({
			teamMembers: this.props.teamMembers,
		});
	}

	deleteMember = (e, id) => {
		e.preventDefault();
		this.props.deleteTeamMember(id);
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
							onClick={this.handleOpen}>
							<i className="material-icons">search</i>
						</Fab>
						<TeamMemberModal
							userId={this.props.userId}
							addTeamMember={this.props.addTeamMember}
							// modalType="Add new team member"
						/>
					</div>
				</div>
				<TeamMembersList
					teamMembers={this.props.teamMembers}
					deleteTeamMember={this.deleteMember}
				/>
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
)(withStyles(styles)(TeamMembersView));
