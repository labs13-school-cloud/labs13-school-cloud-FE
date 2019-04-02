import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlans, getCustomersPlan, unsubscribe, submit } from '../../store/actions/';
import { getUser } from '../../store/actions/userActions';

import {
	withStyles,
	FormControl,
	FormLabel,
	TextField,
	Button,
	CircularProgress,
} from '@material-ui/core/';

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
	progress: { margin: '20px auto', maxWidth: 40, width: 40 },
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
		// const stripe = this.props.userProfile.stripe;
		// this.props.getCustomersPlan(this.props.stripe); // doesn't work, not getting user stripe id
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
	createToken = async email => {
		let { token } = await this.props.stripe.createToken({ email: email });
		return token.id;
	};
	submit = async () => {
		const { name, email, userID, stripe } = this.props.userProfile;
		console.log('email', email);

		const { plan } = this.state;
		let token = await this.createToken(email);
		console.log('token', token);
		await this.props.submit(token, name, email, userID, stripe, plan);
		this.setState({
			paymentToggle: false,
		});
	};

	render() {
		const { classes } = this.props;
		let unsubscribe;
		if (this.props.userProfile.accountTypeID > 1) {
			unsubscribe = (
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={() =>
						this.props.unsubscribe(
							this.props.userProfile.userID,
							this.props.userProfile.stripe
						)
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
		if (this.props.stripeLoading || this.props.userLoading) {
			return (
				<div className={classes.progress}>
					<CircularProgress />
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<div>
						{this.props.userError}
						{this.props.stripeError}
						<FormControl component="fieldset" className={classes.formControl}>
							<FormLabel component="legend">Subscriptions</FormLabel>
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
						</FormControl>
						{this.state.paymentToggle ? (
							<FormControl component="fieldset" className={classes.formControl}>
								{/* <TextField
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
								/> */}
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
		stripeLoading: state.stripeReducer.isLoading,
		userLoading: state.userReducer.isLoading,
		userProfile: state.userReducer.userProfile.user,
		userError: state.userReducer.error,
		stripeError: state.stripeReducer.error,
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
		getUser,
	}
)(injectStripe(withStyles(styles)(CheckoutForm)));
