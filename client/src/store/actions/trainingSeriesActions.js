import axios from "axios";
import {
  getTextNotifications,
  getEmailNotifications,
} from "./notificationsActions";

import history from "../../history.js";

//GET TRAINING SERIES
export const GET_TRAINING_SERIES_START = "GET_TRAINING_SERIES_START";
export const GET_TRAINING_SERIES_SUCCESS = "GET_TRAINING_SERIES_COMPLETE";
export const GET_TRAINING_SERIES_FAIL = "GET_TRAINING_SERIES_FAIL";
//ADD TRAINING SERIES
export const ADD_TRIANING_SERIES_START = "ADD_TRIANING_SERIES_START";
export const ADD_TRIANING_SERIES_SUCCESS = "ADD_TRIANING_SERIES_SUCCESS";
export const ADD_TRIANING_SERIES_FAIL = "ADD_TRIANING_SERIES_FAIL";
//EDIT TRAINING SERIES
export const EDIT_TRIANING_SERIES_START = "EDIT_TRIANING_SERIES_START";
export const EDIT_TRIANING_SERIES_SUCCESS = "EDIT_TRIANING_SERIES_SUCCESS";
export const EDIT_TRIANING_SERIES_FAIL = "EDIT_TRIANING_SERIES_FAIL";
//DELETE TRAINING SERIES
export const DELETE_TRIANING_SERIES_START = "DELETE_TRIANING_SERIES_START";
export const DELETE_TRIANING_SERIES_SUCCESS = "DELETE_TRIANING_SERIES_SUCCESS";
export const DELETE_TRIANING_SERIES_FAIL = "DELETE_TRIANING_SERIES_FAIL";
//GET MEMBERS ASSIGNED TO SINGLE TRAINING SERIES
export const GET_MEMBERS_ASSIGNED_START = "GET_MEMBERS_ASSIGNED_START";
export const GET_MEMBERS_ASSIGNED_SUCCESS = "GET_MEMBERS_ASSIGNED_SUCCESS";
export const GET_MEMBERS_ASSIGNED_FAIL = "GET_MEMBERS_ASSIGNED_FAIL";

export const getTrainingSeries = id => dispatch => {
  dispatch({
    type: GET_TRAINING_SERIES_START,
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/users/${id}/training-series`)
    .then(res =>
      dispatch({
        type: GET_TRAINING_SERIES_SUCCESS,
        payload: res.data.userTrainingSeries,
      })
    )
    .catch(err => dispatch({type: GET_TRAINING_SERIES_FAIL, error: err}));
};

export const addTrainingSeries = trainingSeriesData => dispatch => {
  dispatch({
    type: ADD_TRIANING_SERIES_START,
  });
  axios
    .post(
      `${process.env.REACT_APP_API}/api/training-series`,
      trainingSeriesData
    )
    .then(res => {
      dispatch({
        type: ADD_TRIANING_SERIES_SUCCESS,
        payload: res.data.newTrainingSeries,
      });
      history.push(
        `/home/training-series/${res.data.newTrainingSeries.trainingSeriesID}`
      );
    })
    .catch(err => dispatch({type: ADD_TRIANING_SERIES_FAIL, error: err}));
};

export const editTrainingSeries = (id, trainingSeriesData) => dispatch => {
  dispatch({type: EDIT_TRIANING_SERIES_START});
  axios
    .put(
      `${process.env.REACT_APP_API}/api/training-series/${id}`,
      trainingSeriesData
    )
    .then(res =>
      dispatch({
        type: EDIT_TRIANING_SERIES_SUCCESS,
        payload: res.data.updatedTrainingSeries,
      })
    )
    .catch(err => dispatch({type: EDIT_TRIANING_SERIES_FAIL, error: err}));
};

export const deleteTrainingSeries = (trainingSeriesID, userID) => dispatch => {
  dispatch({type: DELETE_TRIANING_SERIES_START});
  axios
    .delete(
      `${process.env.REACT_APP_API}/api/training-series/${trainingSeriesID}`
    )
    .then(() =>
      dispatch({
        type: DELETE_TRIANING_SERIES_SUCCESS,
        payload: trainingSeriesID,
      })
    )
    .then(() => {
      dispatch(getEmailNotifications(userID));
      dispatch(getTextNotifications(userID));
    })
    .catch(err => dispatch({type: DELETE_TRIANING_SERIES_FAIL, error: err}));
};

export const getMembersAssigned = id => dispatch => {
  dispatch({type: GET_MEMBERS_ASSIGNED_START});
  axios
    .get(`${process.env.REACT_APP_API}/api/training-series/${id}/assignments`)
    .then(res =>
      dispatch({
        type: GET_MEMBERS_ASSIGNED_SUCCESS,
        payload: res.data.assignments,
      })
    )
    .catch(err => dispatch({type: GET_MEMBERS_ASSIGNED_FAIL, error: err}));
};
