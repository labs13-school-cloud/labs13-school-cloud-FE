import axios from 'axios';

const baseUrl = `${process.env.REACT_APP_API}/api`;


// GET ALL VOLUNTEERS
export const GET_VOLUNTEERS_START = "GET_VOLUNTEERS_START";
export const GET_VOLUNTEERS_SUCCESS = "GET_VOLUNTEERS_SUCCESS";
export const GET_VOLUNTEERS_FAILURE = "GET_VOLUNTEERS_FAILURE";

export const  getVolunteers  = () => dispatch => {
    dispatch({
        type: GET_VOLUNTEERS_START
    });
    axios
        .get(`${baseUrl}/users`)
        .then(res => {
            // console.log("res", res)
            dispatch({ 
                type: GET_VOLUNTEERS_SUCCESS, 
                payload: res.data.users
            })
        })
        .catch(err => dispatch({ 
            type: GET_VOLUNTEERS_FAILURE, 
            payload:err 
        }))
};

// ADD A VOLUNTEER
export const ADD_VOLUNTEERS_START = "ADD_VOLUNTEERS_START";
export const ADD_VOLUNTEERS_SUCCESS = "ADD_VOLUNTEERS_SUCCESS";
export const ADD_VOLUNTEERS_FAILURE = "ADD_VOLUNTEERS_FAILURE";

export const addVolunteer  = volunteer => dispatch => {
    dispatch({ 
        type: ADD_VOLUNTEERS_START
    });
    axios
        .post(`${baseUrl}/users`, volunteer)
        .then(res => {
            dispatch({
                type: ADD_VOLUNTEERS_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => dispatch({ 
            type: ADD_VOLUNTEERS_FAILURE,
            payload: err
        }));
}

// EDIT A VOLUNTEER
export const EDIT_VOLUNTEERS_START = "EDIT_VOLUNTEERS_START";
export const EDIT_VOLUNTEERS_SUCCESS = "EDIT_VOLUNTEERS_SUCCESS";
export const EDIT_VOLUNTEERS_FAILURE = "EDIT_VOLUNTEERS_FAILURE";

export const editVolunteer = (id, changes) => dispatch => {
    dispatch({
        type: EDIT_VOLUNTEERS_START
    });
    axios
        .put(`${baseUrl}/users/${id}`, changes)
        .then(res => {
            dispatch({
                type: EDIT_VOLUNTEERS_SUCCESS,
                payload: { id, changes }
            })
        })
        .catch(err => dispatch({
            type: EDIT_VOLUNTEERS_FAILURE,
            payload: err
        }))
}


//GET  VOLUNTEERS BY THEIR ID
export const GET_VOLUNTEER_ID_START = "GET_VOLUNTEER_ID_START";
export const GET_VOLUNTEER_ID_SUCCESS = "GET_VOLUNTEER_ID_SUCCESS";
export const GET_VOLUNTEER_ID_FAILURE = "GET_VOLUNTEER_ID_FAILURE";

export const getVolunteersByID = id => dispatch => {
    dispatch({ type: GET_VOLUNTEER_ID_START });
    axios
        .get(`${baseUrl}/users/${id}`)
        .then(res => {
            dispatch({
                type: GET_VOLUNTEER_ID_SUCCESS,
                payload: res.data.volunteer.id
            });
        })
        .catch(err => dispatch({ type: GET_VOLUNTEER_ID_FAILURE, payload: err }))
}