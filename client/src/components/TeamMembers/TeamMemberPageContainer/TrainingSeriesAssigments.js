import React from 'react';

import { connect } from 'react-redux';
import DeleteModal from '../../Modals/deleteModal';
import { deleteTeamMemberFromTrainingSeries } from '../../../store/actions';
import styled from 'styled-components';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import {
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
} from '@material-ui/core/';

// import DeleteIcon from "@material-ui/icons/Delete";
const moment = require('moment');

const styles = theme => ({
	listStyle: {
		display: 'flex',

		padding: '5px',
	},
	listItem: {
		display: 'flex',
		flexDirections: 'column',
		width: '90%',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #e8e9eb'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	margin: {
		margin: theme.spacing.unit,
	},
	secondaryAction: {
		display: "flex",
		flexDirection: "row",
		"align-items": "center",
	}
});

const TrainingSeriesAssignments = props => {
	const { classes } = props;


	const { teamMemberId } = props;
	const { trainingSeries_ID } = props.trainingSeries;
	// add twelve hours to sendDate, formatting with moment ensures it displays properly on the dashboard 
	const formattedStartDate = moment(props.trainingSeries.startDate).add(12, "hours").format('MMMM Do, YYYY')

	// const handleDelete = e => {
	// 	e.preventDefault();
	// 	props.deleteTeamMemberFromTrainingSeries(teamMemberId, trainingSeries_ID);
	// };

	console.log('***ASSIGNMENTS***', teamMemberId, trainingSeries_ID);

	return (
		// <ListStyles>
		<ListItem className={classes.listItem}>
			<ListItemText
				className={classes.listItemText}
				primary={`Title: ${props.trainingSeries.title}`}
				secondary={`Start Date: ${formattedStartDate}`}
			/>
			<ListItemSecondaryAction className={classes.secondaryAction}>
				<ListButtonContainer>

					<DeleteModal
						teamMemberId={teamMemberId}
						trainingSeries_Id={trainingSeries_ID}
						deleteType="removeMemberFromTS"
					/>
				</ListButtonContainer>
			</ListItemSecondaryAction>
		</ListItem>
		// </ListStyles>
	);
};

const mapStateToProps = state => {
	return {};
};

export default connect(
	mapStateToProps,
	{ deleteTeamMemberFromTrainingSeries }
)(withStyles(styles)(TrainingSeriesAssignments));

// const ListStyles = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	align-items: center;
// 	border-bottom: 1px solid #E8E9EB;
//    width: 100%;	
//    border-bottom: 1px solid #e8e9eb;
// `;
const ListButtonContainer = styled.div`	
  display: flex;	
  align-items: center;	
  justify-content: space-between;	
`;
