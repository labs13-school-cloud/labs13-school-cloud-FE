import React from 'react';

import { connect } from 'react-redux';

//Prop Types
import PropTypes from 'prop-types';

import { editTeamMember } from '../../store/actions';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { Typography, Fab, Modal, Button, TextField } from '@material-ui/core/';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	fab: { margin: theme.spacing.unit },
	container: {
		display: 'flex',
		'flex-direction': 'column',
		flexWrap: 'wrap',
		'align-items': 'center',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '90%',
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
});

class TeamMemberModal extends React.Component {
	state = {
		open: false,
		teamMember: {
			firstName: '',
			lastName: '',
			jobDescription: '',
			email: '',
			phoneNumber: '',
			user_ID: '',
		},
		startDate: '',
	};

	componentDidMount() {
		if (this.props.modalType === 'edit' && this.props.teamMember) {
			this.setState({ teamMember: this.props.teamMember });
		}
	}

	componentDidUpdate(prevProps) {
		// populates form with selected users information
		if (prevProps.isEditing && this.props.teamMember) {
			this.setState({ teamMember: this.props.teamMember });
		}
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({
			open: false,
		});
	};

	handleChange = name => event => {
		this.setState({
			teamMember: {
				...this.state.teamMember,
				[name]: event.target.value,
			},
		});
	};

	handleDate = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		if (this.props.modalType === 'edit') {
			this.props.editTeamMember(this.props.teamMemberId, this.state.teamMember);
			this.handleClose();
		} else {
			const newMember = {
				...this.state.teamMember,
				user_ID: this.props.userId,
			};

			this.props.addTeamMember(newMember);

			this.handleClose();

			this.setState({
				teamMember: {
					firstName: '',
					lastName: '',
					jobDescription: '',
					email: '',
					phoneNumber: '',
					user_ID: '',
				},
			});
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<>
				<Fab
					color="primary"
					size="small"
					aria-label="Add"
					className={classes.fab2}
					onClick={this.handleOpen}>
					{this.props.modalType === 'edit' ? 'Edit' : '+'}
				</Fab>
				{/* <Button onClick={this.handleOpen}>
          {this.props.modalType === "edit" ? "Edit" : "Add new team member"}
        </Button> */}
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title" align="center">
							{this.props.modalType === 'edit'
								? 'Edit Team Member Info'
								: 'Add a new team member'}
						</Typography>
						<form
							onSubmit={e => this.handleSubmit(e)}
							className={classes.container}
							noValidate
							autoComplete="off">
							<TextField
								id="standard-name"
								label="first name"
								className={classes.textField}
								value={this.state.teamMember.firstName}
								onChange={this.handleChange('firstName')}
								margin="normal"
							/>
							<TextField
								id="standard-name"
								label="last name"
								className={classes.textField}
								value={this.state.teamMember.lastName}
								onChange={this.handleChange('lastName')}
								margin="normal"
							/>
							<TextField
								id="standard-name"
								label="job description"
								className={classes.textField}
								value={this.state.teamMember.jobDescription}
								onChange={this.handleChange('jobDescription')}
								margin="normal"
							/>
							<TextField
								id="standard-name"
								label="email"
								className={classes.textField}
								value={this.state.teamMember.email}
								onChange={this.handleChange('email')}
								margin="normal"
							/>
							<TextField
								id="standard-name"
								label="phone"
								className={classes.textField}
								value={this.state.teamMember.phoneNumber}
								onChange={this.handleChange('phoneNumber')}
								margin="normal"
							/>

							<Button type="submit" variant="contained" className={classes.button}>
								{this.props.modalType === 'edit' ? 'Save Update' : 'Save'}
							</Button>
						</form>
					</div>
				</Modal>
			</>
		);
	}
}

TeamMemberModal.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		isEditing: state.teamMembersReducer.status.isEditing,
		editSuccess: state.teamMembersReducer.status.editSuccess,
		trainingSeries: state.trainingSeriesReducer.trainingSeries,
	};
};

// We need an intermediary variable for handling the recursive nesting.
const TeamMemberModalWrapped = withStyles(styles)(TeamMemberModal);

export default connect(
	mapStateToProps,
	{ editTeamMember }
)(TeamMemberModalWrapped);
