import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import Authentication from '../authenticate/authenticate';

import AppBar from '../AppBar/AppBar';

import { logout } from '../../Auth/Auth';
import CheckoutForm from '../Stripe/CheckoutForm';
//Styling
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	withStyles,
} from '@material-ui/core';
import styled from 'styled-components';

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
	}

	render() {
		const { classes } = this.props;

		return (
			<StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn">
				<Container>
					<AppBar />
					<Button
						variant="contained"
						color="secondary"
						onClick={e => this.handleLogout(e)}>
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
					<Elements>
						<CheckoutForm />
					</Elements>
				</Container>
			</StripeProvider>
		);
	}
}

export default withStyles(styles)(Authentication(ProfileView));
