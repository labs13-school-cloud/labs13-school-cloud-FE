import React, { useState, useEffect } from 'react';

//Styling
import Button from '@material-ui/core/Button';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from '../Stripe/CheckoutForm';

function Profile(props) {
	const [uProfile, setUProfile] = useState({});

	const handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('isLoggedIn');
		props.history.push('/');
	};

	useEffect(() => {
		const { userProfile, getProfile } = props.auth;

		if (!userProfile) {
			getProfile((err, profile) => {
				setUProfile(profile);
			});
		} else {
			setUProfile(userProfile);
		}
	});
	return (
		<StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn">
			<div className="container">
				<Button variant="contained" color="secondary" onClick={e => handleLogout(e)}>
					Log Out
				</Button>
				<Elements>
					<CheckoutForm />
				</Elements>
				<div className="profile-area">
					<h1>{uProfile.name}</h1>
					<div>
						<img src={uProfile.picture} alt="profile" />
						<div>
							<h3>{uProfile.nickname}</h3>
						</div>
						<pre>{JSON.stringify(uProfile, null, 2)}</pre>
					</div>
				</div>
			</div>
		</StripeProvider>
	);
}

export default Profile;
