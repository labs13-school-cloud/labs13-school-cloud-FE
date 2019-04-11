import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlans, getCustomersPlan, unsubscribe, submit } from '../../store/actions/';
import { getUser } from '../../store/actions/userActions';
import logo from '../../img/trainingBot.gif';

import { withStyles, FormControl, Button, Typography, Modal } from '@material-ui/core/';
import UnsubscribeModal from './unsubscribeModal';
import Pricing from '../LandingPage/Pricing';

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	submitBtn: {
		// margin: theme.spacing.unit,
		maxWidth: 100,
		width: '100%',

		margin: '0 auto',
	},
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
	buttonLayout: {
		display: 'flex',
		justifyContent: 'space-around',
		margin: '0 auto',
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
	progress: { margin: '50px auto', maxWidth: 100, width: 100 },
	subCard: {
		border: '1px solid #EBEBEB',
		borderRadiusTopLeft: '3px',
		borderRadiusTopRight: '3px',
		width: '31%',
		margin: 5,
		textAlign: 'center'
	},
	title: {
		textTransform: 'uppercase',
		fontWeight: 700,
		margin: 10
	},
	price: {
		fontSize: 20,
		margin: "10px 0"
	},
	subPrice: {
		fontSize: 12,
		color: 'grey'
	},
	content: {
		margin: 15
	},
	feature: {

	},
	button: {
		width: '100%',
		marginTop: 10,
		background: '#441476',
		color: 'white',
		borderRadius: 0,
		"&:hover": {
			background: '#3DBC93'
		},
		"&:disabled": {
			color: 'grey',
			background: '#EBEBEB',
		}
	}
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
			open: false,
			buttonState: '',
			error: '',
		};
	}
	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	componentDidMount = () => {
		this.props.getPlans();
	};
	handleChange = (e, nickname) => {
		e.preventDefault();
		if (e.currentTarget.name === 'plan') {
			this.setState({
				paymentToggle: true,
				buttonState: nickname,
			});
		}
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value,
		});
	};
	createToken = async email => {
		try {
			let { token } = await this.props.stripe.createToken({ email: email });
			return token.id;
		} catch (err) {
			this.setState({ error: 'Please enter payment information' });
		}
	};
	submit = async () => {
		const { name, email, userID, stripe } = this.props.userProfile;
		const { plan } = this.state;
		let token = await this.createToken(email);
		if (token !== undefined) {
			await this.props.submit(token, name, email, userID, stripe, plan);
			this.setState({
				paymentToggle: false,
			});
		} else {
			this.setState({ error: 'Please enter payment information' });
		}
	};
	unsub = (userID, stripe) => {
		this.props.unsubscribe(userID, stripe);
		this.setState({ open: false });
	};

	render() {
		const { classes } = this.props;
		let accountType;
		if (this.props.userProfile.accountTypeID === 2) {
			accountType = 'Premium';
		} else if (this.props.userProfile.accountTypeID === 3) {
			accountType = 'Pro';
		}

		let freeButton;

		if (this.props.userProfile.accountTypeID > 1) {
			freeButton = (
				<Button
					color="primary"
					className={classes.button}
					onClick={this.handleOpen}>
					Basic
				</Button>
			);
		} else {
			freeButton = (
				<Button color="default" className={classes.button} disabled>
					Current Plan
				</Button>
			);
		}

		if (this.state.complete) return <h1>Purchase Complete</h1>;
		if (this.props.stripeLoading || this.props.userLoading) {
			return (
				<div className={classes.progress}>
					{/* <CircularProgress /> */}
					<img src={logo} alt="loader" />
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<div>
						{this.props.userError}
						{this.props.stripeError}
						{/* <Pricing /> */}
						<FormControl component="fieldset" className={classes.formControl}>
							<div className={classes.buttonLayout}>
								<div className={classes.subCard}>
									<Typography className={classes.title}>Basic</Typography>
									<Typography className={classes.price}>FREE</Typography>
									<div className={classes.content}>
										<Typography className={classes.feature}>Feature</Typography>
										<Typography className={classes.feature}>Feature</Typography>
										<Typography className={classes.feature}>Feature</Typography>
									</div>
									{freeButton}
								</div>
								{this.props.plans.map(plan => {
									return plan.nickname === accountType ? (
										<div className={classes.subCard}>
											<Typography className={classes.title}>{plan.nickname}</Typography>
											<Typography className={classes.price}>
												${plan.amount / 100}<span className={classes.subPrice}> / mo</span>
											</Typography>
											<div className={classes.content}>
												<Typography className={classes.feature}>Feature</Typography>
												<Typography className={classes.feature}>Feature</Typography>
												<Typography className={classes.feature}>Feature</Typography>
											</div>
											<Button key={plan.created} className={classes.button} disabled>
												Current Plan
											</Button>
										</div>
									) : (
											<div className={classes.subCard}>
												<Typography className={classes.title}>{plan.nickname}</Typography>
												<Typography className={classes.price}>
													${plan.amount / 100}<span className={classes.subPrice}> / mo</span>
												</Typography>
												<div className={classes.content}>
													<Typography className={classes.feature}>Feature</Typography>
													<Typography className={classes.feature}>Feature</Typography>
													<Typography className={classes.feature}>Feature</Typography>
												</div>
												<Button
													key={plan.created}
													color="primary"
													name="plan"
													className={classes.button}
													value={plan.id}
													onClick={e => this.handleChange(e, plan.nickname)}>
													{plan.nickname}
												</Button>
											</div>
										);
								})}
							</div>
						</FormControl>
						{this.state.paymentToggle ? (
							<FormControl component="fieldset" className={classes.formControl}>
								<CardElement style={{ base: { fontSize: '18px' } }} />
							</FormControl>
						) : (
								<span />
							)}
					</div>
					{this.state.paymentToggle ? (
						<Button
							variant="contained"
							color="primary"
							className={classes.submitBtn}
							onClick={this.submit}>
							Submit
						</Button>
					) : (
							<span />
						)}
					{/* {this.state.error ? <p>{this.state.error}</p> : <span />} */}

					{/* Unsubscribe Modal */}
					<Modal
						aria-labelledby="simple-modal-title"
						aria-describedby="simple-modal-description"
						open={this.state.open}
						onClose={this.handleClose}>
						<UnsubscribeModal handleClose={this.handleClose} unsub={this.unsub} />
					</Modal>
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
