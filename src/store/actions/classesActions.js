import axios from "axios";
import history from "history.js";

export const FETCH_CLASSES_START = "FETCH_CLASSES_START";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAILURE = "FETCH_CLASSES_FAILURE";
// Get Volunteer's classes
export const GET_VOLUNTEER_CLASSES_START = "GET_VOLUNTEER_CLASSES_START";
export const GET_VOLUNTEER_CLASSES_SUCCESS = "GET_VOLUNTEER_CLASSES_SUCCESS";
export const GET_VOLUNTEER_CLASSES_FAILURE = "GET_VOLUNTEER_CLASSES_FAILURE";

export const FETCH_SINGLE_CLASS_START = "FETCH_SINGLE_CLASS_START";
export const FETCH_SINGLE_CLASS_SUCCESS = "FETCH_SINGLE_CLASS_SUCCESS";
export const FETCH_SINGLE_CLASS_FAIL = "FETCH_SINGLE_CLASS_FAIL";
// Get classes' id
export const GET_CLASS_ID_START = "GET_CLASS_ID_START";
export const GET_CLASS_ID_SUCCESS = "GET_CLASS_ID_SUCCESS";
export const GET_CLASS_ID_FAIL = "GET_CLASS_ID_FAIL";

export const ADD_CLASS_START = "ADD_CLASS_START";
export const ADD_CLASS_SUCCESS = "ADD_CLASS_SUCCESS";
export const ADD_CLASS_FAILURE = "ADD_CLASS_FAILURE";

export const DELETE_CLASS_START = "DELETE_CLASS_START";
export const DELETE_CLASS_SUCCESS = "DELETE_CLASS_SUCCESS";
export const DELETE_CLASS_FAILURE = "DELETE_CLASS_FAILURE";

export const EDIT_CLASS_START = "EDIT_CLASS_START";
export const EDIT_CLASS_SUCCESS = "EDIT_CLASS_SUCCESS";
export const EDIT_CLASS_FAILURE = "EDIT_CLASS_FAILURE";

const baseUrl = `${process.env.REACT_APP_API}/api`;

//get all classes
export const getClassList = () => dispatch => {
  dispatch({ type: FETCH_CLASSES_START });
  axios
    .get(`${baseUrl}/classes`)
    .then(res => {
      dispatch({ type: FETCH_CLASSES_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: FETCH_CLASSES_FAILURE, payload: err }));
};

//Add class
export const addClass = classList => dispatch => {
    dispatch({ type: ADD_CLASS_START });
    axios
        .post(`${baseUrl}/classes`, classList)
        .then(res => {
            dispatch({ type: ADD_CLASS_SUCCESS, payload: res.data.newClass });
        })
        .catch(err => dispatch({ type: ADD_CLASS_FAILURE, payload: err }));
};

//Edit class
export const editClass = (id, changes) => dispatch => {
  dispatch({ type: EDIT_CLASS_START });
  axios
    .put(`${baseUrl}/classes/${id}`, changes)
    .then(res => {
      dispatch({
        type: EDIT_CLASS_SUCCESS,
        payload: { id, changes }
      });
    })
    .catch(err => dispatch({ type: EDIT_CLASS_FAILURE, payload: err }));
};

//Delete class
export const deleteClass = classID => dispatch => {
  dispatch({ type: DELETE_CLASS_START });
  axios
    .delete(`${baseUrl}/classes/${classID}`)
    .then(res => {
      dispatch({ type: DELETE_CLASS_SUCCESS, payload: classID });
    })
    .then(() => {
      if (history.location.pathname === "/home") {
      } else {
        history.push("/home");
      }
    })
    .catch(err => dispatch({ type: DELETE_CLASS_FAILURE, payload: err }));
};

//Get class by id
export const getClassByID = id => dispatch => {
  dispatch({ type: GET_CLASS_ID_START });
  axios
    .get(`${baseUrl}/classes/${id}`)
    .then(res => {
      dispatch({
        type: GET_CLASS_ID_SUCCESS,
        payload: res.data.id
      });
    })
    .catch(err => dispatch({ type: GET_CLASS_ID_FAIL, error: err }));
};

//get all classes for Volunteer
export const getVolunteerClasses = user_id => dispatch => {
  dispatch({ type: GET_VOLUNTEER_CLASSES_START });
  axios
    .get(`${baseUrl}/classes/volunteers/${user_id}`)
    .then(res => {
      dispatch({
        type: GET_VOLUNTEER_CLASSES_SUCCESS,
        payload: res.data.classes
      });
    })
    .catch(err =>
      dispatch({ type: GET_VOLUNTEER_CLASSES_FAILURE, payload: err })
    );
};

//Get single class info
export const getActiveClass = id => dispatch => {
  dispatch({ type: FETCH_SINGLE_CLASS_START });
  axios
    .get(`${baseUrl}/classes/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_CLASS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => dispatch({ type: FETCH_SINGLE_CLASS_FAIL, error: err }));
};
