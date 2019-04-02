import React from 'react';

//Components
// import AppBar from '../AppBar/AppBar';
import UserModal from '../Modals/userModal';
// import DeleteModal from '../Modals/deleteModal';


//Stripe
import StripeView from '../Stripe/StripeView';

//Auth
import { logout, getUserProfile } from '../../Auth/Auth';
import Authentication from '../authenticate/authenticate';

//State Management
import { connect } from 'react-redux';
import { getUser, editUser, deleteUser } from '../../store/actions/userActions';

//Styling
import {
	Button,
	Card,
	CardActions,
	CardMedia,
	Typography,
	withStyles,
	Modal,
} from '@material-ui/core';
import styled from 'styled-components';

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
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	card: {
		maxWidth: 800,
		margin: '0 auto',
	},
	cardContent: {
		backgroundColor: '#E8E9EB',
	},
	media: {
		height: 200,
		width: 200,
	},
});


const Container = styled.div`
	margin-top: 80px;
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

	componentDidMount() {
		//Gets profile from Auth0(Google)
		getUserProfile(() => {
			//Gets the user from DB
			this.props.getUser();
			// Sets profile to Local storage -- Assigns it to state
			this.setState({
				googleProfile: JSON.parse(localStorage.getItem('Profile')),
			});
		});
	}
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
						<div className="profile-area">
							<Card className={classes.card}>
								<Typography gutterBottom variant="h5" component="h1">
									{user.name}
								</Typography>

								<CardMedia
									className={classes.media}
									image={this.state.googleProfile.picture}
								/>
								<Typography gutterBottom variant="h5" component="h5">
									{user.email}
								</Typography>
								<Typography gutterBottom variant="h5" component="h5">
									<div>Account Type: {accountType}</div>
								</Typography>
								<CardActions>
									{/* Button for editing */}
									<UserModal
										email={user.email}
										name={user.name}
										id={user.userID}
									/>
									{/* Buton for deleting */}
									{/* <DeleteModal deleteType="user" id={user.userID} /> */}
									<Button onClick={this.handleOpen}>Delete Account</Button>
								</CardActions>
							</Card>
						</div>
						<StripeView user={this.state.googleProfile} />
					</>
				)}
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<Typography variant="h6" id="modal-title">
							Are you sure?
						</Typography>
						{account ? (
							<Typography>
								Please unsubscribe from your current subescription before deleting
								your account.
							</Typography>
						) : (
							<Button
								variant="contained"
								color="secondary"
								onClick={() => {
									this.props.deleteUser(user.userID);
								}}>
								Delete Account
							</Button>
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
