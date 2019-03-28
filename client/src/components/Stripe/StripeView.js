import React from 'react';
import { StripeProvider } from 'react-stripe-elements';

import StripePlans from './StripePlans';

function StripeView(props) {
	return (
		<StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn">
			<div>
				<StripePlans user={props.user} />
			</div>
		</StripeProvider>
	);
}

export default StripeView;
