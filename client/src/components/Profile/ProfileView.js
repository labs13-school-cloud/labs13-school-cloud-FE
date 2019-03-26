import React, { useState } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import AppBar from '../AppBar/AppBar';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import { logout } from '../../Auth/Auth';
import Profile from './Profile';
import CheckoutForm from '../Stripe/CheckoutForm';

const Container = styled.div`
	margin: 80px auto;
	width: 800px;
`;

const ProfileView = props => {
	const { toggle, setToggle } = useState(true);

	const handleLogout = e => {
		e.preventDefault();
		logout();
		props.history.push('/');
	};

	return (
		<StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn">
			<Container>
				<AppBar />
				<Button variant="contained" color="secondary" onClick={e => handleLogout(e)}>
					Log Out
				</Button>

				<Profile />
				<Elements>
					<CheckoutForm />
				</Elements>
			</Container>
		</StripeProvider>
	);
};

export default ProfileView;
