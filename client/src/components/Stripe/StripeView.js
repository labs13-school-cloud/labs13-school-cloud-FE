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
		<StripeProvider apiKey={process.env.REACT_APP_STRIPE_API}>
			<Stripe>
				<Elements>
					<CheckoutForm />
				</Elements>
			</Stripe>
		</StripeProvider>
	);
}

export default StripeView;
