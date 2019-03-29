import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { getPlans, getCustomersPlan, unsubscribe, submit } from '../../store/actions/';

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
	CircularProgress,
} from '@material-ui/core/';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
	root: {
		margin: '20 auto',
		width: '100%',
		maxWidth: 800,
		display: 'flex',
		flexDirection: 'column',
	},
	formControl: {
		display: 'flex',
		margin: theme.spacing.unit * 3,
	},
	submitButton: {
		width: 100,
		padding: 5,
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

	buttonLayout: { display: 'flex' },
	button: { margin: 5 },
	progress: { margin: '0 auto' },
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
			pro: false,
			premium: false,
		};
	}
	componentDidMount = () => {
		this.props.getPlans();
		const { stripe } = this.props.user;
		console.log('stripe', this.props.user);
		this.props.getCustomersPlan(stripe); // doesn't work, not getting user stripe id
	};

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
	submit = () => {
		const { name, email, userID, stripe } = this.props.user;
		const { plan } = this.state;
		let { token } = this.createToken(userID);
		this.props.submit(token, name, email, userID, stripe, plan);
	};

	render() {
		console.log('props userp', this.props.user);
		const { classes } = this.props;
		let unsubscribe;
		if (this.props.user.accountTypeID > 1) {
			unsubscribe = (
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() =>
						this.props.unsubscribe(this.props.user.userID, this.props.user.stripe)
					}>
					Unsubscribe
				</Button>
			);
		} else {
			unsubscribe = (
				<Button
					disabled
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() => this.unsubscribe()}>
					Unsubscribe
				</Button>
			);
		}

		if (this.state.complete) return <h1>Purchase Complete</h1>;
		if (this.props.isLoading) {
			return <CircularProgress className={classes.progress} />;
		} else {
			return (
				<div className={classes.root}>
					<div>
						<FormControl component="fieldset" className={classes.formControl}>
							<FormLabel component="legend">Subscriptions</FormLabel>
							<MuiThemeProvider theme={theme}>
								<div className={classes.buttonLayout}>
									{unsubscribe}
									{this.props.plans.map(plan => {
										return (
											<Button
												key={plan.created}
												variant="contained"
												color="primary"
												name="plan"
												className={classes.button}
												value={plan.id}
												onClick={e => this.handleChange(e)}>
												{plan.nickname}
											</Button>
										);
									})}
								</div>
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

const mapStateToProps = state => {
	return {
		plans: state.stripeReducer.plans,
		plan: state.stripeReducer.plan,
		isLoading: state.stripeReducer.isLoading,
	};
};

CheckoutForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default connect(
	mapStateToProps,
	{
		getPlans,
		getCustomersPlan,
		unsubscribe,
		submit,
	}
)(injectStripe(withStyles(styles)(CheckoutForm)));
