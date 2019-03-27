// import axios from "axios";

//GET TRAINING SERIES
export const GET_TRAINING_SERIES_START = "GET_TRAINING_SERIES_START";
export const GET_TRAINING_SERIES_SUCCESS = "GET_TRAINING_SERIES_COMPLETE";
export const GET_TRAINING_SERIES_FAIL = "GET_TRAINING_SERIES_FAIL";
//ADD TRAINING SERIES
export const ADD_TRIANING_SERIES_START = "ADD_TRIANING_SERIES_START";
export const ADD_TRIANING_SERIES_SUCCESS = "ADD_TRIANING_SERIES_SUCCESS";
export const ADD_TRIANING_SERIES_FAIL = "ADD_TRIANING_SERIES_FAIL";
//EDIT TRAINING SERIES
//DELETE TRAINING SERIES

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
      dispatch({ type: ADD_TRIANING_SERIES_SUCCESS, payload: res.data })
    )
    .catch(err => dispatch({ type: ADD_TRIANING_SERIES_FAIL, error: err }));
};

