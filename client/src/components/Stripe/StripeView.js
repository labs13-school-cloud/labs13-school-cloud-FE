import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import styled from 'styled-components';

const Stripe = styled.div`
	max-width: 800px;
	width: 100%;
	margin: 0 auto;
`;

function StripeView(props) {
	return (
		<StripeProvider apiKey="pk_test_Xm1i1PmTqLH8BAuD0hAhn3je00REWKtBJ6">
			{/* This is the test key, replace with the live key when you want to switch over */}
			<Stripe>
				<Elements>
					<CheckoutForm />
				</Elements>
			</Stripe>
		</StripeProvider>
	);
}

export default StripeView;
