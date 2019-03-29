import axios from 'axios';

// GET POSTS
export const GET_PLANS_START = 'GET_PLANS_START';
export const GET_PLANS_SUCCESS = 'GET_PLANS_SUCCESS';
export const GET_PLANS_FAIL = 'GET_PLANS_FAIL';
// POST UNSUBSCRIBE
export const POST_UNSUBSCRIBE_START = 'POST_UNSUBSCRIBE_START';
export const POST_UNSUBSCRIBE_SUCCESS = 'POST_UNSUBSCRIBE_SUCCESS';
export const POST_UNSUBSCRIBE_FAIL = 'POST_UNSUBSCRIBE_FAIL';
// POST SUBSCRIBE
export const POST_SUBSCRIBE_START = 'POST_SUBSCRIBE_START';
export const POST_SUBSCRIBE_SUCCESS = 'POST_SUBSCRIBE_SUCCESS';
export const POST_SUBSCRIBE_FAIL = 'POST_SUBSCRIBE_FAIL';

// GET all posts for a training series
export const getPlans = () => dispatch => {
	dispatch({
		type: GET_PLANS_START,
	});
	axios
		.get(`${process.env.REACT_APP_API}/api/stripe/plans`)
		.then(res =>
			dispatch({
				type: GET_PLANS_SUCCESS,
				payload: res.data,
			})
		)
		.catch(err => dispatch({ type: GET_PLANS_FAIL, error: err }));
};

export const unsubscribe = (userID, stripe) => dispatch => {
	dispatch({
		type: POST_UNSUBSCRIBE_START,
	});
	axios
		.post(`${process.env.REACT_APP_API}/api/stripe/unsubscribe`, {
			userID,
			stripe,
		})
		.then(res => dispatch({ type: POST_UNSUBSCRIBE_SUCCESS, payload: res.data }))
		.catch(err => dispatch({ type: POST_UNSUBSCRIBE_FAIL, error: err }));
};

export const submit = (token, name, email, userID, stripe, plan) => dispatch => {
	dispatch({
		type: POST_SUBSCRIBE_START,
	});
	axios
		.post(`${process.env.REACT_APP_API}/api/stripe`, {
			token,
			name,
			email,
			userID,
			stripe,
			plan,
		})
		.then(res => dispatch({ type: POST_SUBSCRIBE_SUCCESS, payload: res.data }))
		.catch(err => dispatch({ type: POST_SUBSCRIBE_FAIL, error: err }));
};

// const { name, email, userID, stripe } = this.props.user;
// const { plan } = this.state;

// let { token } = this.createToken(userID);
// let response = await axios.post(`${process.env.REACT_APP_API}/api/stripe`, {
// token,
// name,
// email,
// userID,
// stripe,
// plan,
// });

// if (response.status === 200) this.setState({ complete: true, paymentToggle: false });
