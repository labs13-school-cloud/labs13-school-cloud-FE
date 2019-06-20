import axios from "axios";

//GET TRAINING SERIES
export const GET_TRAINING_SERIES_START = "GET_TRAINING_SERIES_START";
export const GET_TRAINING_SERIES_SUCCESS = "GET_TRAINING_SERIES_SUCCESS";
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

export const GET_TRAINING_SERIES_MESSAGES_START =
  "GET_TRAINING_SERIES_MESSAGES_START";
export const GET_TRAINING_SERIES_MESSAGES_SUCCESS =
  "GET_TRAINING_SERIES_MESSAGES_SUCCESS";
export const GET_TRAINING_SERIES_MESSAGES_FAIL =
  "GET_TRAINING_SERIES_MESSAGES_FAIL";
// GET TRAINING SERIES BY ID
export const GET_TRAINING_SERIES_ID_START = "GET_TRAINING_SERIES_ID_START";
export const GET_TRAINING_SERIES_ID_SUCCESS = "GET_TRAINING_SERIES_ID_SUCCESS";
export const GET_TRAINING_SERIES_ID_FAIL = "GET_TRAINING_SERIES_ID_FAIL";
// GET VOLUNTEERS IN TRAINING SERIES BY ID
export const GET_VOLUNTEERS_FOR_TRAINING_SERIES_START =
  "GET_VOLUNTEERS_FOR_TRAINING_SERIES_START";
export const GET_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS =
  "GET_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS";
export const GET_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL =
  "GET_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL";
// ADD VOLUNTEERS TO TRAINING SERIES
export const ADD_VOLUNTEERS_FOR_TRAINING_SERIES_START =
  "ADD_VOLUNTEERS_FOR_TRAINING_SERIES_START";
export const ADD_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS =
  "ADD_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS";
export const ADD_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL =
  "ADD_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL";
// DELETE VOLUNTEERS TO TRAINING SERIES
export const DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_START =
  "DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_START";
export const DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS =
  "DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS";
export const DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL =
  "DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL";
// GET TRAINING SERIES FOR A VOLUNTEER
export const GET_TRAINING_SERIES_FOR_VOLUNTEER_START =
  "GET_TRAINING_SERIES_FOR_VOLUNTEER_START";
export const GET_TRAINING_SERIES_FOR_VOLUNTEER_SUCCESS =
  "GET_TRAINING_SERIES_FOR_VOLUNTEER_SUCCESS";
export const GET_TRAINING_SERIES_FOR_VOLUNTEER_FAIL =
  "GET_TRAINING_SERIES_FOR_VOLUNTEER_FAIL";

export const getTrainingSeries = () => dispatch => {
  dispatch({
    type: GET_TRAINING_SERIES_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/training-series`)
    .then(res =>
      dispatch(
        {
          type: GET_TRAINING_SERIES_SUCCESS,
          payload: res.data.trainingSeries
        },
      )
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
  console.log(id)
  console.log(trainingSeriesData)
  axios
    .put(
      `${process.env.REACT_APP_API}/api/training-series/${id}`,
      trainingSeriesData
    )
    .then(res => {
      console.log('fires')
      dispatch({
        type: EDIT_TRAINING_SERIES_SUCCESS,
        payload: { id, trainingSeriesData }
      })
    })
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

// Get the id of Training Series to show individual page with information
export const getTrainingSeriesID = trainingSeriesID => dispatch => {
  dispatch({
    type: GET_TRAINING_SERIES_ID_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/training-series/${trainingSeriesID}`)
    .then(res =>
      dispatch(
        {
          type: GET_TRAINING_SERIES_ID_SUCCESS,
          payload: res.data.trainingSeries
        },
        console.log("From Actions", res.data.trainingSeries)
      )
    )
    .catch(err => dispatch({ type: GET_TRAINING_SERIES_FAIL, error: err }));
};

// Get a list of Volunteers assigned to a Training Series
export const getTrainingSeriesForVolunteer = trainingSeriesID => dispatch => {
  dispatch({
    type: GET_VOLUNTEERS_FOR_TRAINING_SERIES_START
  });
  axios
    .get(
      `${
        process.env.REACT_APP_API
      }/api/training-series/volunteers/${trainingSeriesID}`
    )
    .then(res =>
      dispatch(
        {
          type: GET_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS,
          payload: res.data.volunteers
        },
        console.log("From Actions", res.data.volunteers)
      )
    )
    .catch(err =>
      dispatch({ type: GET_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL, error: err })
    );
};

// Add a Volunteers to a Training Series
export const addVolunteerToTrainingSeries = (id, user_id) => dispatch => {
  dispatch({
    type: ADD_VOLUNTEERS_FOR_TRAINING_SERIES_START
  });
  axios
    .post(`${process.env.REACT_APP_API}/api/training-series/${id}/volunteers`, {
      id,
      user_id
    })
    .then(res =>
      dispatch(
        {
          type: ADD_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS,
          payload: res.data.volunteers
        },
        console.log("From Actions", id, user_id)
      )
    )
    .catch(err =>
      dispatch({ type: ADD_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL, error: err })
    );
};

// Remove a Volunteers from Training Series
export const deleteVolunteerFromTrainingSeries = ({
  id,
  user_id
}) => dispatch => {
  dispatch({
    type: DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_START
  });
  axios
    .delete(
      `${
        process.env.REACT_APP_API
      }/api/training-series/${id}/volunteers/${user_id}`
    )
    .then(res =>
      dispatch(
        {
          type: DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS,
          payload: user_id
        },
        console.log("From Actions-Delete", id, user_id)
      )
    )
    .catch(err =>
      dispatch({ type: DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL, error: err })
    );
};

// Get Training Series for Volunteer
export const getVolunteerTrainingSeries = user_id => dispatch => {
  dispatch({
    type: GET_TRAINING_SERIES_FOR_VOLUNTEER_START
  });
  axios
    .get(
      `${process.env.REACT_APP_API}/api/training-series/volunteers/${user_id}`
    )
    .then(res =>
      dispatch(
        {
          type: GET_TRAINING_SERIES_FOR_VOLUNTEER_SUCCESS,
          payload: res.data.trainingSeries
        },
        console.log(
          "From Actions-Get volunteer's training series",
          res.data.trainingSeries
        )
      )
    )
    .catch(err =>
      dispatch({ type: GET_TRAINING_SERIES_FOR_VOLUNTEER_FAIL, error: err })
    );
};
