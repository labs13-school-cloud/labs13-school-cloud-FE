import axios from "axios";

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

export const getTrainingSeries = id => dispatch => {
  dispatch({
    type: GET_TRAINING_SERIES_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/users/${id}/training-series`)
    .then(res =>
      dispatch({
        type: GET_TRAINING_SERIES_SUCCESS,
        payload: res.data.userTrainingSeries
      })
    )
    .catch(err => dispatch({ type: GET_TRAINING_SERIES_FAIL, error: err }));
};

export const addTrainingSeries = trainingSeriesData => dispatch => {
  dispatch({
    type: ADD_TRIANING_SERIES_START
  });
  axios
    .post(
      `${process.env.REACT_APP_API}/api/training-series`,
      trainingSeriesData
    )
    .then(res =>
      dispatch({
        type: ADD_TRIANING_SERIES_SUCCESS,
        payload: res.data.newTrainingSeries
      })
    )
    .catch(err => dispatch({ type: ADD_TRIANING_SERIES_FAIL, error: err }));
};

export const editTrainingSeries = (id, trainingSeriesData) => dispatch => {
  dispatch({ type: EDIT_TRIANING_SERIES_START });
  axios
    .put(
      `${process.env.REACT_APP_API}/api/training-series/${id}`,
      trainingSeriesData
    )
    .then(res =>
      dispatch({ type: EDIT_TRIANING_SERIES_SUCCESS, payload: res.data })
    )
    .catch(err => dispatch({ type: EDIT_TRIANING_SERIES_FAIL, error: err }));
};

export const deleteTrainingSeries = id => dispatch => {
  dispatch({ type: DELETE_TRIANING_SERIES_START });
  axios
    .delete(`${process.env.REACT_APP_API}/api/training-series/${id}`)
    .then(res =>
      dispatch({ type: DELETE_TRIANING_SERIES_SUCCESS, payload: id })
    )
    .catch(err => dispatch({ type: DELETE_TRIANING_SERIES_FAIL, error: err }));
};
