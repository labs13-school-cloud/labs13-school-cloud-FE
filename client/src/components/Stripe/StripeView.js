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
		// <StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn"> {/* TEST */}
		<StripeProvider apiKey="pk_live_rT507CtR4I4vTsTDTp4YroFc00lFrmSMgJ"> {/* LIVE */}
			<Stripe>
				<Elements>
					<CheckoutForm />
				</Elements>
			</Stripe>
		</StripeProvider>
	);
}

export default StripeView;
