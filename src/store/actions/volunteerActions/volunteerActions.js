import axios from "axios";

import { 
    // GET VOLUNTEERS
    GET_VOLUNTEERS_START,
    GET_VOLUNTEERS_SUCCESS,
    GET_VOLUNTEERS_FAILURE,
    // DELETE VOLUNTEERS
    DELETE_VOLUNTEER_START,
    DELETE_VOLUNTEER_SUCCESS,
    DELETE_VOLUNTEER_FAILURE
 } from "./actions.js";

const baseUrl = process.env.REACT_APP_API;

export const getVolunteers = () => dispatch => {
    dispatch({ type: GET_VOLUNTEERS_START });

    axios.get(`${baseUrl}/api/users`)
        .then(res => dispatch({ type: GET_VOLUNTEERS_SUCCESS, payload: res.data.users }))
        .catch(err => dispatch({ type: GET_VOLUNTEERS_FAILURE, payload: err }));
}

export const deleteVolunteer = (volunteerId) => dispatch => {
    dispatch({ type: DELETE_VOLUNTEER_START });

    axios.delete(`${baseUrl}/api/users/${volunteerId}`)
        .then(() => dispatch({ type: DELETE_VOLUNTEER_SUCCESS, payload: volunteerId }))
        .catch(err => dispatch({ type: DELETE_VOLUNTEER_FAILURE, payload: err }))
}