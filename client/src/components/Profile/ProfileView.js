import React from 'react';
import { connect } from 'react-redux';

//Components
import UserModal from '../Modals/userModal';
import StripeView from '../Stripe/StripeView';
import { logout, getUserProfile } from '../../Auth/Auth';
import Authentication from '../authenticate/authenticate';

//State Management
import { getUser, editUser, deleteUser } from '../../store/actions/userActions';

//Styling
import {
	Button,
	Card,
	CardActions,
	Typography,
	withStyles,
	Modal,
	Avatar,
	IconButton,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';

import styled from 'styled-components';

// function rand() {
// 	return Math.round(Math.random() * 20) - 10;
// }
function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const styles = theme => ({
	paper: {
		position: 'absolute',
		// width: 800,
		margin: '0 auto',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
		alignItems: 'center',
	},
	profileContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '50%',
		// margin: '0 auto',
		padding: 10,
		height: 350,
	},
	payment: {
		width: '100%',
		margin: '0px 0px 0px 10px',
		padding: 10,
		height: 350,
	},
	cardContent: {
		backgroundColor: '#E8E9EB',
	},
	media: {
		height: 200,
		width: 200,
	},
	bigAvatar: {
		margin: 10,
		width: 150,
		height: 150,
	},
	flex: {
		display: 'flex',
	},
});

const Container = styled.div`
	/* margin-top: 80px; */
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;

class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			googleProfile: [],
			open: false,
		};
	}
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleLogout = e => {
		e.preventDefault();
		logout();
		this.props.history.push('/');
	};

	handleDelete = () => {
		this.props.deleteUser(this.props.userProfile.user.userID);
	};

	render() {
		//Destructure user from userProfile
		const { user } = this.props.userProfile;
		const { classes } = this.props;

		let accountType;
		let account;
		if (this.props.doneLoading) {
			let type = user.accountTypeID;
			if (type === 3) {
				accountType = <span>Pro</span>;
				account = true;
			} else if (type === 2) {
				accountType = <span>Premium</span>;
				account = true;
			} else if (type === 1) {
				accountType = <span>Free</span>;
				account = false;
			}
		}
		return (
			<Container>
				{this.props.doneLoading && (
					<>
						<div className={classes.flex}>
							<Card className={classes.profileContainer}>
								<Avatar
									alt="Remy Sharp"
									src={JSON.parse(localStorage.getItem('Profile')).picture}
									className={classes.bigAvatar}
								/>
								<Typography gutterBottom variant="h5" component="h1">
									{user.name}
								</Typography>
								<Typography variant="subtitle1" gutterBottom>
									{user.email}
								</Typography>
								<Typography gutterBottom variant="subtitle1" component="subtitle1">
									<div>Account Type: {accountType}</div>
								</Typography>
								<CardActions>
									{/* Button for editing */}
									{/* <UserModal
										email={user.email}
										name={user.name}
										id={user.userID}
									/> */}
									{/* Button for deleting */}
									<Button
										variant="contained"
										onClick={this.handleOpen}
										className={classes.button}>
										Delete Acccount
									</Button>
									{/* <IconButton
									aria-label='Delete'
									onClick={this.handleOpen}
									className={classes.margin}
									>
									<DeleteIcon />
								</IconButton> */}
								</CardActions>
							</Card>

							<Card className={classes.payment}>
								<StripeView user={this.state.googleProfile} />
							</Card>
						</div>
					</>
				)}
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						{account ? (
							<>
								<Typography variant="h6" id="modal-title">
									Active subscription
								</Typography>
								<Typography>
									Please unsubscribe from your current subescription before
									deleting your account.
								</Typography>
							</>
						) : (
							<>
								<Typography variant="h6" id="modal-title">
									Are you sure?
								</Typography>
								<Button
									variant="contained"
									color="secondary"
									onClick={() => {
										this.props.deleteUser(user.userID);
									}}>
									Delete Account
								</Button>
							</>
						)}
					</div>
				</Modal>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		userProfile: state.userReducer.userProfile,
		doneLoading: state.userReducer.doneLoading,
		isEditing: state.userReducer.isEditing,
	};
};

export default connect(
	mapStateToProps,
	{
		getUser,
		editUser,
		deleteUser,
	}
)(withStyles(styles)(Authentication(ProfileView)));
