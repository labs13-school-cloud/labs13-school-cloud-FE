import React from 'react';

//Date Picker
import DatePicker from 'react-datepicker';
//Styles
import 'react-datepicker/dist/react-datepicker.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
import TrainingBotGIF from '../../../img/trainingBot.gif';

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 300,
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
	},
	memberList: {
		display: 'flex',
		flexDirection: 'column',
	},
});

function AddMember(props) {
	console.log(props);
	const { classes } = props;

	const renderMembers = () => {
		//Map Through the current assignments for the team member, returns an array of ID's
		let assignments = props.assignments.map(assignment => assignment.teamMember_ID);
		//Filters the trainingSeries based on assignments
		let filteredMembers = props.teamMembers.filter(member => {
			return !assignments.includes(member.teamMemberID);
		});
		/***** Following used for pagination *****/
		// let arr = [];
		// let offset = props.offset;
		// let x = offset;
		// let y = offset + props.limit;
		// arr = filteredMembers.slice(x, y);
		return filteredMembers.map(member => (
			<>
				<FormControlLabel
					control={
						<Checkbox
							name={member.teamMemberID}
							onChange={() => props.handler.handleChecked(member.teamMemberID)}
						/>
					}
					label={`${member.firstName} ${member.lastName}`}
				/>
			</>
		));
	};
	console.log(props.selectedTeamMembers);
	return (
		<AddMemberContainer>
			{props.teamMembers.length ? (
				<>
					<h3>Assign Team Members </h3>
					<DatePicker
						inline
						minDate={new Date()}
						selected={props.startDate}
						onChange={props.handler.handleDateChange}
					/>
					<TeamMemberContainer>
						<form
							variant="body1"
							id="modal-title"
							className={classes.memberList}
							onSubmit={e => props.handler.handleSubmit(e)}>
							{renderMembers()}
							<Button
								disabled={
									props.selectedTeamMembers < 1 || props.isRouting === true
										? 'true'
										: null
								}
								type="submit">
								{props.isRouting ? (
									<LoadingImage src={TrainingBotGIF} alt="loader" />
								) : (
									`Submit`
								)}
							</Button>
							<Button onClick={props.handler.routeToPostPage}>Cancel</Button>
						</form>
					</TeamMemberContainer>
				</>
			) : (
				<h2> You need to create Team members! </h2>
			)}
		</AddMemberContainer>
	);
}

export default withStyles(styles)(AddMember);

const AddMemberContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
const TeamMemberContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const LoadingImage = styled.img`
	width: 40px;
	overflow: hidden;
	pointerevents: none;
	cursor: not-allowed;
`;
