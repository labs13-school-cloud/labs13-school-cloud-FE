import axios from "axios";
import history from "../../history.js";
// GET MESSAGES
export const GET_MESSAGES_START = "GET_MESSAGES_START";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAIL = "GET_MESSAGES_FAIL";

// GET SINGLE MESSAGE
export const GET_SINGLE_MESSAGE_START = "GET_SINGLE_MESSAGE_START";
export const GET_SINGLE_MESSAGE_SUCCESS = "GET_SINGLE_MESSAGE_SUCCESS";
export const GET_SINGLE_MESSAGE_FAIL = "GET_SINGLE_MESSAGE_FAIL";

// ADD A NEW MESSAGE
export const ADD_MESSAGE_START = "ADD_MESSAGE_START";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";
export const ADD_MESSAGE_FAIL = "ADD_MESSAGE_FAIL";

// EDIT A MESSAGE
export const EDIT_MESSAGE_START = "EDIT_MESSAGE_START";
export const EDIT_MESSAGE_SUCCESS = "EDIT_MESSAGE_SUCCESS";
export const EDIT_MESSAGE_FAIL = "EDIT_MESSAGE_FAIL";

// DELETE A MESSAGE
export const DELETE_MESSAGE_START = "DELETE_MESSAGE_START";
export const DELETE_MESSAGE_SUCCESS = "DELETE_MESSAGE_SUCCESS";
export const DELETE_MESSAGE_FAIL = "DELETE_MESSAGE_FAIL";

// GET all messages for a training series

export const getTrainingSeriesMessages = id => dispatch => {
  dispatch({
    type: GET_MESSAGES_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/training-series/${id}/messages`) //endpoint validated
    .then(res => {
      dispatch({
        type: GET_MESSAGES_SUCCESS,
        payload: res.data // should include ".trainingSeries and .messages"
      });
    })
    .catch(err => {
      dispatch({ type: GET_MESSAGES_FAIL, error: err });
    });
};

//GET a single message by id
export const getMessageById = id => dispatch => {
  dispatch({ type: GET_SINGLE_MESSAGE_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/messages/${id}`) //endpoint validated
    .then(
      res =>
        dispatch({
          type: GET_SINGLE_MESSAGE_SUCCESS,
          payload: res.data.message
        }) //response validated
    )
    .catch(err => dispatch({ type: GET_SINGLE_MESSAGE_FAIL, error: err }));
};
// POST a new message
export const createAMessage = (message, trainingSeriesID) => dispatch => {
  dispatch({ type: ADD_MESSAGE_START });
  axios
    .post(`${process.env.REACT_APP_API}/api/messages`, message) //endpoint validated
    .then(res => {
      dispatch({ type: ADD_MESSAGE_SUCCESS, payload: res.data.newMessage }); //response is correct
    })
    .catch(err => dispatch({ type: ADD_MESSAGE_FAIL, error: err }))
    .finally(() => {
      // dispatch(getTrainingSeriesMessages(trainingSeriesID))
      history.push(`/home/training-series/${trainingSeriesID}`); //potentially why the routing on TS messes up?
    });
};
// PUT a message
export const editMessage = (id, updates) => dispatch => {
  //console.log(updates)
  dispatch({ type: EDIT_MESSAGE_START });
  axios
    .put(`${process.env.REACT_APP_API}/api/messages/${id}`, updates) //endpoint validated, but should endpoint now be req.body.updates?
    .then(
      res =>
        dispatch({
          type: EDIT_MESSAGE_SUCCESS,
          payload: res.data.updatedMessage
        }) //response validated
    )
    .catch(err => dispatch({ type: EDIT_MESSAGE_FAIL, error: err }));
};
// DELETE a message
export const deleteMessage = id => dispatch => {
  dispatch({ type: DELETE_MESSAGE_START });
  axios
    .delete(`${process.env.REACT_APP_API}/api/messages/${id}`) //endpint validated
    .then(res => dispatch({ type: DELETE_MESSAGE_SUCCESS, payload: id })) //100000%
    .catch(err => dispatch({ type: DELETE_MESSAGE_FAIL, error: err }));
};
