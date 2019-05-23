import axios from "axios";

// GET RESPONSES FOR SINGLE NOTIFICATION
export const GET_RESPONSES_START = "GET_RESPONSES_START";
export const GET_RESPONSES_SUCCESS = "GET_RESPONSES_SUCCESS";
export const GET_RESPONSES_FAIL = "GET_RESPONSES_FAIL";

// GET SINGLE RESPONSE
export const GET_SINGLE_RESPONSE_START = "GET_SINGLE_RESPONSE_START";
export const GET_SINGLE_RESPONSE_SUCCESS = "GET_SINGLE_RESPONSE_SUCCESS";
export const GET_SINGLE_RESPONSE_FAIL = "GET_SINGLE_RESPONSE_FAIL";

// CREATE RESPONSE
export const ADD_RESPONSE_START = "ADD_RESPONSE_START";
export const ADD_RESPONSE_SUCCESS = "ADD_RESPONSE_SUCCESS";
export const ADD_RESPONSE_FAIL = "ADD_RESPONSE_FAIL";

// MARKED AS SEEN  - TEMPORARY ENDPOINT
export const SEE_RESPONSE = "SEE_RESPONSE";

// DELETE RESPONSE
export const DELETE_RESPONSE_START = "DELETE_RESPONSE_START";
export const DELETE_RESPONSE_SUCCESS = "DELETE_RESPONSE_SUCCESS";
export const DELETE_RESPONSE_FAIL = "DELETE_RESPONSE_FAIL";

// GET all responses for a single notification by the notification id
export const getNotificationResponses = id => dispatch => {
  dispatch({ type: GET_RESPONSES_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/notifications/${id}/responses`)
    .then(res => {
      dispatch({ type: GET_RESPONSES_SUCCESS, payload: res.data.responses });
    })
    .catch(err => {
      dispatch({ type: GET_RESPONSES_FAIL, error: err });
    });
};

// GET single response by its id
export const getResponseById = id => dispatch => {
  dispatch({ type: GET_SINGLE_RESPONSE_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/responses/${id}`)
    .then(res =>
      dispatch({
        type: GET_SINGLE_RESPONSE_SUCCESS,
        payload: res.data.response
      })
    )
    .catch(err => dispatch({ type: GET_SINGLE_RESPONSE_FAIL, error: err }));
};

// ADD a response
export const addResponse = response => dispatch => {
  dispatch({ type: ADD_RESPONSE_START });
  axios
    .post(`${process.env.REACT_APP_API}/api/responses`, response)
    .then(res => {
      dispatch({ type: ADD_RESPONSE_SUCCESS, payload: res.data.newResponse });
    })
    .catch(err => dispatch({ type: ADD_RESPONSE_FAIL, error: err }));
};

// DELETE a response by its id
export const deleteResponse = id => dispatch => {
  dispatch({ type: DELETE_RESPONSE_START });
  axios
    .delete(`${process.env.REACT_APP_API}/api/responses/${id}`)
    .then(res => {
      dispatch({ type: DELETE_RESPONSE_SUCCESS, payload: id });
    })
    .catch(err => dispatch({ tye: DELETE_RESPONSE_FAIL }));
};

export const seeResponse = id => {
  return { type: SEE_RESPONSE, payload: id };
};
