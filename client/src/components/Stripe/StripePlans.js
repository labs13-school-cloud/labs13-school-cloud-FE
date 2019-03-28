import React from 'react';
import axios from 'axios';
import { Elements } from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';

class StripePlans extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		
			subscriptions: [],
		};
	}
	getSubscriptions = async () => {
		let response = await axios.get(
			`${process.env.REACT_APP_API_LOCAL}/api/stripe/subscriptions`
		);
		this.setState({ subscriptions: response.data });
	};
	componentDidMount = () => {

	};

	render() {
		return (
				<div>
					<Elements>

					<CheckoutForm plans={this.state.plans} user={this.props.user} />
					</Elements>
				</div>
		);
	}
}

export default StripePlans;
