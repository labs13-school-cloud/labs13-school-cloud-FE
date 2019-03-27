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

	async createUser(ev) {
		let { token } = await this.props.stripe.createToken();
		token = token.id;
		let name = this.props.user.name;
		let email = this.props.user.email;
		let userID = this.props.user.userID;
		console.log(token);
		let response = await Axios.post(`${process.env.REACT_APP_API_LOCAL}/api/stripe`, {
			token,
			name,
			email,
			userID,
		});
	}
	async submit(ev) {
		let { token } = await this.props.stripe.createToken();
		token = token.id;
		let stripe_id = this.props.user.stripe;
		console.log(token);
		let response = await Axios.post(`${process.env.REACT_APP_API_LOCAL}/api/stripe/subscribe`, {
			token,
			stripe_id,
		});

		if (response.ok) this.setState({ complete: true });
	}

	render() {
		if (this.state.complete) return <h1>Purchase Complete</h1>;
		return (
			<div className="checkout">
				<p>Would you like to complete the purchase?</p>
				<CardElement />
				<button onClick={this.submit}>Send</button>
			</div>
		);
	}
}

export default injectStripe(CheckoutForm);
