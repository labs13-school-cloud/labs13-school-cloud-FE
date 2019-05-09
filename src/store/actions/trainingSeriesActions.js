import axios from "axios";

//GET TRAINING SERIES
export const GET_TRAINING_SERIES_START = "GET_TRAINING_SERIES_START";
export const GET_TRAINING_SERIES_SUCCESS = "GET_TRAINING_SERIES_COMPLETE";
export const GET_TRAINING_SERIES_FAIL = "GET_TRAINING_SERIES_FAIL";
//ADD TRAINING SERIES
export const ADD_TRAINING_SERIES_START = "ADD_TRAINING_SERIES_START";
export const ADD_TRAINING_SERIES_SUCCESS = "ADD_TRAINING_SERIES_SUCCESS";
export const ADD_TRAINING_SERIES_FAIL = "ADD_TRAINING_SERIES_FAIL";
//EDIT TRAINING SERIES
export const EDIT_TRAINING_SERIES_START = "EDIT_TRAINING_SERIES_START";
export const EDIT_TRAINING_SERIES_SUCCESS = "EDIT_TRAINING_SERIES_SUCCESS";
export const EDIT_TRAINING_SERIES_FAIL = "EDIT_TRAINING_SERIES_FAIL";
//DELETE TRAINING SERIES
export const DELETE_TRAINING_SERIES_START = "DELETE_TRAINING_SERIES_START";
export const DELETE_TRAINING_SERIES_SUCCESS = "DELETE_TRAINING_SERIES_SUCCESS";
export const DELETE_TRAINING_SERIES_FAIL = "DELETE_TRAINING_SERIES_FAIL";

export const getTrainingSeries = () => dispatch => {
  dispatch({
    type: GET_TRAINING_SERIES_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/training-series`)
    .then(res =>
      dispatch({
        type: GET_TRAINING_SERIES_SUCCESS,
        payload: res.data.trainingSeries
      })
    )
    .catch(err => dispatch({ type: GET_TRAINING_SERIES_FAIL, error: err }));
};

export const addTrainingSeries = trainingSeriesData => dispatch => {
  dispatch({
    type: ADD_TRAINING_SERIES_START
  });
  axios
    .post(
      `${process.env.REACT_APP_API}/api/training-series`,
      trainingSeriesData
    )
    .then(res =>
      dispatch({
        type: ADD_TRAINING_SERIES_SUCCESS,
        payload: res.data.newTrainingSeries
      })
    )
    .catch(err => dispatch({ type: ADD_TRAINING_SERIES_FAIL, error: err }));
};

export const editTrainingSeries = (id, trainingSeriesData) => dispatch => {
  dispatch({ type: EDIT_TRAINING_SERIES_START });
  axios
    .put(
      `${process.env.REACT_APP_API}/api/training-series/${id}`,
      trainingSeriesData
    )
    .then(res =>
      dispatch({
        type: EDIT_TRAINING_SERIES_SUCCESS,
        payload: res.data.updatedTrainingSeries
      })
    )
    .catch(err => dispatch({ type: EDIT_TRAINING_SERIES_FAIL, error: err }));
};

export const deleteTrainingSeries = trainingSeriesID => dispatch => {
  dispatch({ type: DELETE_TRAINING_SERIES_START });
  axios
    .delete(
      `${process.env.REACT_APP_API}/api/training-series/${trainingSeriesID}`
    )
    .then(() =>
      dispatch({
        type: DELETE_TRAINING_SERIES_SUCCESS,
        payload: trainingSeriesID
      })
    )
    .catch(err => dispatch({ type: DELETE_TRAINING_SERIES_FAIL, error: err }));
};
