import React from 'react';
import Authentication from '../authenticate/authenticate';
import { getUserProfile } from '../../Auth/Auth';

import AppBar from '../AppBar/AppBar';

import { logout } from '../../Auth/Auth';
//Axios
import axios from 'axios';

//Styling
import {
	Button,
	Card,
	CardActions,
	// CardContent,
	CardMedia,
	Typography,
	withStyles,
} from '@material-ui/core';
import styled from 'styled-components';
import StripeView from '../Stripe/StripeView';

const styles = {
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
};

const Container = styled.div`
	margin-top: 80px;
`;

class ProfileView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userProfile: [],
			user: {},
		};
	}

	handleLogout = e => {
		e.preventDefault();
		logout();
		this.props.history.push('/');
	};

	componentDidMount() {
		//Gets the user profile and assigns it to state
		const user = JSON.parse(localStorage.getItem('Profile'));
		this.setState({ userProfile: user });
		this.getProfile();
	}
	//Gets the users Profile
	getProfile = () => {
		getUserProfile(() => {
			const userData = JSON.parse(localStorage.getItem('Profile'));
			const { email, name } = userData;
			axios
				.post('https://labs11-trainingbot-dev.herokuapp.com/api/auth', {
					email,
					name,
				})
				.then(res => {
					let userData = res.data.user;
					this.setState({ user: { ...userData }, doneLoading: true });
				})
				.catch(err => {
					console.log(err);
				});
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<Container>
				<AppBar />
				<Button variant="contained" color="secondary" onClick={e => this.handleLogout(e)}>
					Log Out
				</Button>

				<div className="profile-area">
					<Card className={classes.card}>
						<Typography gutterBottom variant="h5" component="h1">
							{this.state.userProfile.name}
						</Typography>

						<CardMedia
							className={classes.media}
							image={this.state.userProfile.picture}
							title="Contemplative Reptile"
						/>
						<Typography gutterBottom variant="h5" component="h5">
							{this.state.user.email}
						</Typography>
						<CardActions>
							<Button size="small" color="primary">
								Edit
							</Button>
							<Button size="small" color="secondary">
								Delete Account
							</Button>
						</CardActions>
					</Card>
				</div>
				<StripeView user={this.state.user} />
			</Container>
		);
	}
}

export default withStyles(styles)(Authentication(ProfileView));
