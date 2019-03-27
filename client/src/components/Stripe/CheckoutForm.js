import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Axios from 'axios';

// const stripe = require('stripe')('sk_test_I3A5cCkzbD6C7HqqHSt7uRHH00ht9noOJw');

// stripe.charges.retrieve('ch_1EI51gChlDwQi04Izf2PqAxC', {
// 	api_key: 'sk_test_I3A5cCkzbD6C7HqqHSt7uRHH00ht9noOJw',
// });

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = { complete: false };
		this.submit = this.submit.bind(this);
	}

	componentDidMount = () => {
		// check to see if user has active subscription
	};

	async submit(ev) {
		const { name, email, userID, stripe } = this.props.user;
		let { token } = await this.props.stripe.createToken({ userID: userID });
		token = token.id;
		let response = await Axios.post(`${process.env.REACT_APP_API_LOCAL}/api/stripe`, {
			token,
			name,
			email,
			userID,
			stripe,
		});
		console.log('response', response);
		if (response.ok) this.setState({ complete: true });
	}

	render() {
		if (this.state.complete) return <h1>Purchase Complete</h1>;
		return (
			// Hide payment form if subscription is active via accountTypeID
			// Button for cancelling subscription if subscription is active
			<div className="checkout">
				<label>
					Card details
					<CardElement style={{ base: { fontSize: '18px' } }} />
				</label>
				<button onClick={this.submit}>Send</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
