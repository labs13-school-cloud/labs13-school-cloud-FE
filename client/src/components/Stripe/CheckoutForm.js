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

	async submit(ev) {
		let { token } = await this.props.stripe.createToken({ name: 'Name' });
		token = token.id;
		let id = this.props.user.id;
		let response = await Axios(`${process.env.REACT_APP_API_LOCAL}/api/stripe`, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: { token: token, id: id },
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
