import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

function StripeView(props) {
	return (
		<StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn">
			<div>
				<Elements>
					<CheckoutForm user={props.user} />
				</Elements>
			</div>
		</StripeProvider>
	);
}

export default StripeView;
