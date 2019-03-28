import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import axios from 'axios';

// const stripe = require('stripe')('sk_test_I3A5cCkzbD6C7HqqHSt7uRHH00ht9noOJw');

// stripe.charges.retrieve('ch_1EI51gChlDwQi04Izf2PqAxC', {
// 	api_key: 'sk_test_I3A5cCkzbD6C7HqqHSt7uRHH00ht9noOJw',
// });
import {
	withStyles,
	MuiThemeProvider,
	createMuiTheme,
	FormControl,
	FormLabel,
	TextField,
	Button,
} from '@material-ui/core/';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: 20,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	formControl: {
		margin: theme.spacing.unit * 3,
		width: 300,
	},
	submitButton: {
		width: 100,
		padding: 5,
	},
	group: {
		margin: `${theme.spacing.unit}px 0`,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
});
const theme = createMuiTheme({
	palette: {
		primary: green,
	},
	typography: {
		useNextVariants: true,
	},
});
class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			complete: false,
			plans: '',
			billingName: '',
			billingEmail: '',
			plan: '',
			paymentToggle: false,
		};
	}
	componentDidMount = () => {
		this.getPlans();
	};
	async getPlans() {
		try {
			let response = await axios.get(`${process.env.REACT_APP_API}/api/stripe/plans`);
			this.setState({ plans: response.data });
		} catch (error) {
			console.log(error);
		}
	}
	handleChange = e => {
		e.preventDefault();
		if (e.currentTarget.name === 'plan') {
			this.setState({
				paymentToggle: true,
			});
		}
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};
	createToken = async userID => {
		let { token } = await this.props.stripe.createToken({ userID: userID });
		return token.id;
	};

	submit = async () => {
		const { name, email, userID, stripe } = this.props.user;
		const { plan } = this.state;

		let { token } = this.createToken(userID);
		let response = await axios.post(`${process.env.REACT_APP_API}/api/stripe`, {
			token,
			name,
			email,
			userID,
			stripe,
			plan,
		});

		if (response.status === 200) this.setState({ complete: true, paymentToggle: false });
	};
	unsubscribe = async () => {
		const { userID, stripe } = this.props.user;
		this.setState({ paymentToggle: false });
		let response = await axios.post(`${process.env.REACT_APP_API}/api/stripe/unsubscribe`, {
			userID,
			stripe,
		});

		if (response.status === 200) this.setState({ complete: true });
	};

	render() {
		const { classes } = this.props;
		let unsubscribe;
		if (this.props.user.accountTypeID > 1) {
			unsubscribe = (
				<Button
					variant="contained"
					color="primary"
					className={classes.margin}
					onClick={() => this.unsubscribe()}>
					Unsubscribe
				</Button>
			);
		} else {
			unsubscribe = (
				<Button
					disabled
					variant="contained"
					color="primary"
					className={classes.margin}
					onClick={() => this.unsubscribe()}>
					Unsubscribe
				</Button>
			);
		}

		if (this.state.complete) return <h1>Purchase Complete</h1>;
		if (!this.state.plans) {
			return <div>Loading</div>;
		} else {
			return (
				<div className={classes.root}>
					<div>
						<FormControl component="fieldset" className={classes.formControl}>
							<FormLabel component="legend">Subscriptions</FormLabel>
							<MuiThemeProvider theme={theme}>
								{unsubscribe}
								<Button
									variant="contained"
									color="primary"
									name="plan"
									className={classes.margin}
									value={this.state.plans[1].id}
									onClick={e => this.handleChange(e)}>
									Premium
								</Button>
								<Button
									variant="contained"
									color="primary"
									name="plan"
									className={classes.margin}
									value={this.state.plans[0].id}
									onClick={e => this.handleChange(e)}>
									Pro
								</Button>
							</MuiThemeProvider>
						</FormControl>
						{this.state.paymentToggle ? (
							<FormControl component="fieldset" className={classes.formControl}>
								<TextField
									id="name"
									name="billingName"
									label="Name"
									className={classes.textField}
									value={this.state.name}
									onChange={e => this.handleChange(e)}
									margin="normal"
									placeholder="Jenny Rosen"
									required
								/>

								<TextField
									id="email"
									name="billingEmail"
									label="email"
									className={classes.textField}
									value={this.state.name}
									onChange={e => this.handleChange(e)}
									margin="normal"
									placeholder="jenny@email.com"
									required
								/>
								<CardElement style={{ base: { fontSize: '18px' } }} />
							</FormControl>
						) : (
							<span />
						)}
					</div>
					{this.state.paymentToggle ? (
						<button className={classes.submitButton} onClick={this.submit}>
							Send
						</button>
					) : (
						<span />
					)}
				</div>
			);
		}
	}
}

CheckoutForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default injectStripe(withStyles(styles)(CheckoutForm));
