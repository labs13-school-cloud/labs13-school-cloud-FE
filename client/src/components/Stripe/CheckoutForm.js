import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from 'axios';

// const stripe = require('stripe')('sk_test_I3A5cCkzbD6C7HqqHSt7uRHH00ht9noOJw');

// stripe.charges.retrieve('ch_1EI51gChlDwQi04Izf2PqAxC', {
// 	api_key: 'sk_test_I3A5cCkzbD6C7HqqHSt7uRHH00ht9noOJw',
// });
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
	display: 'flex',
	flexDirection: 'column',
	marginTop: 20,
	marginLeft: "auto",
	marginRight: "auto",
  },
  formControl: {
	margin: theme.spacing.unit * 3,
	width: 300
  },
  submitButton:{
	  width: 100,
	  padding: 5
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

class CheckoutForm extends Component {
	constructor(props) {
		super(props);
		this.state = { complete: false,	
			plans: '' ,
			billingName:'',
			billingEmail:"", 
			plan:''
		};
		this.submit = this.submit.bind(this);
	}
	 getPlans = async () => {
		 try{
		let response = await axios.get(`${process.env.REACT_APP_API_LOCAL}/api/stripe/plans`);
		this.setState({ plans: response.data });}catch(error){console.log(error)}
	};
	 handleChange = e=>{
		e.preventDefault()
		this.setState({
			[e.target.name]:e.target.value

		})
	}

	 componentDidMount = () => {
		this.getPlans();
		// check to see if user has active subscription
	};

	async submit(ev) {
		const { name, email, userID, stripe } = this.props.user;
		const {billingName, billingEmail, plan} = this.state;
		let { token } = await this.props.stripe.createToken({ userID: userID });
		token = token.id;
		let response = await axios.post(`${process.env.REACT_APP_API_LOCAL}/api/stripe`, {
			token,
			name,
			email,
			userID,
			stripe,
			plan
		});

		if (response.status===200) this.setState({ complete: true });
	}

	render() {
		const { classes } = this.props;
		if (this.state.complete) return <h1>Purchase Complete</h1>;
		if(!this.state.plans){
			return(<div>Loading</div>)
		}else{
		return (
			// Button for cancelling subscription if subscription is active
			<div className={classes.root}>
			<div>
				<FormControl component="fieldset" className={classes.formControl}>
					<FormLabel component="legend">Subscriptions</FormLabel>
					<RadioGroup
						aria-label="Subscription"
						name="plan"
						className={classes.group}
						value={this.state.subscription}
						onChange={e=>this.handleChange(e)}
					>
						<FormControlLabel value="free" control={<Radio />} label="Free" />
						<FormControlLabel value={this.state.plans[1].id} control={<Radio />} label="Premium" />
						<FormControlLabel value={this.state.plans[0].id} control={<Radio />} label="Pro" />
					</RadioGroup>
					</FormControl>
					
					<FormControl component="fieldset" className={classes.formControl}>
					<TextField
					id="name"
					name='billingName'
					label="Name"
					className={classes.textField}
					value={this.state.name}
					onChange={e=>this.handleChange(e)}
					margin="normal"
					placeholder="Jenny Rosen"
					required
					
					/>

					<TextField
					id="email"
					name='billingEmail'
					label="email"
					className={classes.textField}
					value={this.state.name}
					onChange={e=>this.handleChange(e)}
					margin="normal"
					placeholder="jenny@email.com"
					required
					/>
					<CardElement style={{ base: { fontSize: '18px' } }} />
				</FormControl>
				</div>
					<button className={classes.submitButton} onClick={this.submit}>Send</button>
			</div>

			// <div className="checkout">
            //             <div className="form-row inline">
            //                 <div className="col">
			// 					<label for="name">
			// 						Name
			// 					</label>
			// 					<input id="name" name="billingName" placeholder="Jenny Rosen" onChange={e=>this.handleChange(e)} required/>
            //                 </div>
            //                 <div className="col">
			// 					<label for="email">
			// 						Email Address
			// 					</label>
			// 					<input id="email" name="billingEmail" type="email" placeholder="jenny.rosen@example.com" onChange={e=>this.handleChange(e)} required/>
			// 					<div>
			// 						<input type="radio" id="free" name="subscription" value="free" onChange={e=>this.handleChange(e)} />
			// 						<label for="free">Free</label>
			// 					</div>

			// 					<div>
			// 						<input type="radio" id="premium" name="subscription" value={this.state.plans[1].id} onChange={e=>this.handleChange(e)} />
			// 						<label for="premium">Premium</label>
			// 					</div>

			// 					<div>
			// 						<input type="radio" id="pro" name="subscription" value={this.state.plans[0].id} onChange={e=>this.handleChange(e)} />
			// 						<label for="pro">Pro</label>
			// 					</div>

								
            //                 </div>
            //             </div>

			// 	<label>
			// 		Card details
			// 		<CardElement style={{ base: { fontSize: '18px' } }} />
			// 	</label>
			// 	<button onClick={this.submit}>Send</button>
			// </div>
		// </div>
		)
		}
	}
}

export default withStyles(styles)(injectStripe(CheckoutForm));
