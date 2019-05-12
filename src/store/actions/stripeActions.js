import axios from "axios";
// import { Http2SecureServer } from 'http2';

// GET POSTS
export const GET_PLANS_START = "GET_PLANS_START";
export const GET_PLANS_SUCCESS = "GET_PLANS_SUCCESS";
export const GET_PLANS_FAIL = "GET_PLANS_FAIL";
// GET CUSTOMER
export const GET_CUSTOMER_PLAN_START = "GET_CUSTOMER_PLAN_START";
export const GET_CUSTOMER_PLAN_SUCCESS = "GET_CUSTOMER_PLAN_SUCCESS";
export const GET_CUSTOMER_PLAN_FAIL = "GET_CUSTOMER_PLAN_FAIL";
// POST UNSUBSCRIBE
export const POST_UNSUBSCRIBE_START = "POST_UNSUBSCRIBE_START";
export const POST_UNSUBSCRIBE_SUCCESS = "POST_UNSUBSCRIBE_SUCCESS";
export const POST_UNSUBSCRIBE_FAIL = "POST_UNSUBSCRIBE_FAIL";
// POST SUBSCRIBE
export const POST_SUBSCRIBE_START = "POST_SUBSCRIBE_START";
export const POST_SUBSCRIBE_SUCCESS = "POST_SUBSCRIBE_SUCCESS";
export const POST_SUBSCRIBE_FAIL = "POST_SUBSCRIBE_FAIL";
// POST REGISTERSTRIPE
export const POST_REGISTERSTRIPE_START = "POST_REGISTERSTRIPE_START";
export const POST_REGISTERSTRIPE_SUCCESS = "POST_REGISTERSTRIPE_SUCCESS";
export const POST_REGISTERSTRIPE_FAIL = "POST_REGISTERSTRIPE_FAIL";

export const getPlans = () => dispatch => {
  dispatch({
    type: GET_PLANS_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/stripe/plans`)
    .then(res =>
      dispatch({
        type: GET_PLANS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_PLANS_FAIL, error: err }));
};

export const getCustomersPlan = stripe => dispatch => {
  dispatch({
    type: GET_CUSTOMER_PLAN_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/stripe/customer/plan`, { stripe })
    .then(res =>
      dispatch({
        type: GET_CUSTOMER_PLAN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_CUSTOMER_PLAN_FAIL, error: err }));
};

export const unsubscribe = (user_id, stripe) => dispatch => {
  dispatch({
    type: POST_UNSUBSCRIBE_START
  });
  axios
    .post(`${process.env.REACT_APP_API}/api/stripe/unsubscribe`, {
      user_id,
      stripe
    })
    .then(res =>
      dispatch({ type: POST_UNSUBSCRIBE_SUCCESS, payload: res.data })
    )
    .catch(err => dispatch({ type: POST_UNSUBSCRIBE_FAIL, error: err }));
};

export const submit = (
  token,
  name,
  email,
  user_id,
  stripe,
  plan
) => dispatch => {
  if (stripe) {
    dispatch({
      type: POST_SUBSCRIBE_START
    });
    axios
      .post(`${process.env.REACT_APP_API}/api/stripe`, {
        token,
        name,
        email,
        user_id,
        stripe,
        plan
      })
      .then(res =>
        dispatch({ type: POST_SUBSCRIBE_SUCCESS, payload: res.data })
      )
      .catch(err => dispatch({ type: POST_SUBSCRIBE_FAIL, error: err }));
  } else {
    dispatch({
      type: POST_REGISTERSTRIPE_START
    });
    axios
      .post(`${process.env.REACT_APP_API}/api/stripe/register`, {
        token,
        name,
        email,
        user_id,
        stripe,
        plan
      })
      .then(res =>
        dispatch({ type: POST_REGISTERSTRIPE_SUCCESS, payload: res.data })
      )
      .catch(err => dispatch({ type: POST_REGISTERSTRIPE_FAIL, error: err }));
  }
};

//Notes on what everything equals out to for debugging purposes.
// const { name, email, user_id, stripe } = this.props.user;
// const { plan } = this.state;

// let { token } = this.createToken(user_id);
// let response = await axios.post(`${process.env.REACT_APP_API}/api/stripe`, {
// token,
// name,
// email,
// user_id,
// stripe,
// plan,
// });

// if (response.status === 200) this.setState({ complete: true, paymentToggle: false });
