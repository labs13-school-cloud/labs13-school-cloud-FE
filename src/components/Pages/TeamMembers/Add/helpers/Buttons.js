import React from "react";

import TrainingBotGIF from "img/trainingBot.gif";

import DeleteModal from "components/UI/Modals/deleteModal";
import Snackbar from "components/UI/Snackbar/Snackbar.js";

import { styles, ButtonContainer, LoadingImage } from "../styles.js";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';

function Buttons({ classes, state, status, history }) {
	const handleCancel = e => {
		e.preventDefault();
		history.push('/home')
	};

	return (
		<ButtonContainer>
			<Button
				disabled={state.isRouting || state.buttonDisabled}
				variant="contained"
				className={classes.addButton}
				type="submit">
				{state.isRouting ? (
					<LoadingImage src={TrainingBotGIF} alt="Loading Icon" />
				) : status === "add" ? (
					"Add Member"
				) : (
					"Save"
				)}
			</Button>
			{status === "add" ? (
				<Button className={classes.button} onClick={handleCancel}>Cancel</Button>
			) : (
				<DeleteModal
					deleteType="inTeamMemberPage"
					teamMemberId={state.teamMember.id}
					user_id={state.teamMember.user_id}
					displayType="button"
				/>
			)}
			{state.snackbar && (
				<Snackbar
					message={`Your team member have been successfully ${status}ed.`}
					type="success"
				/>
			)}
		</ButtonContainer>
	);
}

export default withRouter(withStyles(styles)(Buttons));
