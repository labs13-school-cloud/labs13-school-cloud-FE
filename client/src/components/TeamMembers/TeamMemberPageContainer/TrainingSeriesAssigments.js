import React from 'react';

import { connect } from 'react-redux';
import DeleteModal from '../../Modals/deleteModal';
import { deleteTeamMemberFromTrainingSeries } from '../../../store/actions';
import styled from 'styled-components';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import {
	// Card,
	// CardContent,
	// IconButton,
	// Fab,
	// Button,
	// Typography,
	ListItem,
	ListItemText,
	ListItemSecondaryAction
} from '@material-ui/core/';
// import DeleteIcon from "@material-ui/icons/Delete";
const moment = require('moment');

const styles = theme => ({
	listStyle: {
		display: 'flex',

		padding: '5px'
	},
	listItem: {
		display: 'flex',
		flexDirections: 'column',
		width: '90%'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)'
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

	const { teamMemberId } = props;
	const { trainingSeries_ID } = props.trainingSeries;

	const startDate = moment(props.trainingSeries.startDate).format(
		'MMMM Do, YYYY '
	);

	const handleDelete = e => {
		e.preventDefault();

		props.deleteTeamMemberFromTrainingSeries(teamMemberId, trainingSeries_ID);
	};

	console.log('***ASSIGNMENTS***', teamMemberId, trainingSeries_ID);

	return (
		<ListStyles>
			<ListItem>
				<ListItemText
					classname
					primary={`Title: ${props.trainingSeries.title}`}
					secondary={`Start Date: ${startDate}`}
				/>
			</ListItem>
			<ListItemSecondaryAction>
				<DeleteModal
					teamMemberId={teamMemberId}
					trainingSeries_Id={trainingSeries_ID}
					deleteType='removeMemberFromTS'
				/>
			</ListItemSecondaryAction>
		</ListStyles>
	);
};

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ deleteTeamMemberFromTrainingSeries }
)(withStyles(styles)(TrainingSeriesAssignments));

const ListStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
