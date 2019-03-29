import React from 'react';
import { CardElement, Elements } from 'react-stripe-elements';

function StripeCard() {
	return (
		<Elements>
			<CardElement style={{ base: { fontSize: '18px' } }} />
		</Elements>
	);
}

export default StripeCard;
