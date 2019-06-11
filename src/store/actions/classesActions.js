import axios from "axios";
import history from "../../history.js";

export const FETCH_CLASSES_START = "FETCH_CLASSES_START";
export const FETCH_CLASSES_SUCCESS = "FETCH_CLASSES_SUCCESS";
export const FETCH_CLASSES_FAILURE  = "FETCH_CLASSES_FAILURE";

export const FETCH_SINGLE_CLASS_START = "FETCH_SINGLE_CLASS_START";
export const FETCH_SINGLE_CLASS_SUCCESS = "FETCH_SINGLE_CLASS_SUCCESS";
export const FETCH_SINGLE_CLASS_FAIL = "FETCH_SINGLE_CLASS_FAIL";

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

export const getClasses = () => dispatch => {
    dispatch({ type: FETCH_CLASSES_START });
    axios
        .get(`${baseUrl}/classes`)
        .then(res => {
            dispatch({ type: FETCH_CLASSES_SUCCESS, payload: res.data.classes })
        })
        .catch(err => dispatch({ type: FETCH_CLASSES_FAILURE, payload: err }));
};

export const addClass = classes => dispatch => {
    dispatch({ type: ADD_CLASS_START });
    axios
        .post(`${baseUrl}/classes`, classes)
        .then(res => {
            dispatch({ type: ADD_CLASS_SUCCESS, payload: res.data.newClass });
        })
        .then(() => history.push({ pathname: "/home", state: { success: true } }))
        .catch(err => dispatch({ type: ADD_CLASS_FAILURE, payload: err }));
};

export const editClass = classes => dispatch => {
    const { id, class_name, grade_level, subject, teacher_name, number_of_students, ...changes } = classes;
    //
    //
    dispatch({ type: EDIT_CLASS_START });
    axios
        .put(`${baseUrl}/classes/${id}`, changes)
        .then(res => {
            dispatch({
                type: EDIT_CLASS_SUCCESS,
                payload: res.data.updatedClass
            });
        })
        .catch(err => dispatch({ type: EDIT_CLASS_FAILURE, payload: err }));
};

export const deleteClass = (classID) => dispatch => {
    dispatch({ type :DELETE_CLASS_START });
    axios
        .delete(`${baseUrl}/classes/${classesID}`)
        .then(res => {
            dispatch({ type: DELETE_CLASS_SUCCESS, payload: classID })
        })
        .then(() => {
            if(history.location.pathname === "/home") {
            } else {
                history.push("/home");
            }
        })
        .catch(err => dispatch({ type: DELETE_CLASS_FAILURE, payload: err }))
};

export const getClassByID = id => dispatch => {
    dispatch({ type: FETCH_SINGLE_CLASS_START });
    axios
        .get(`${baseUrl}/classes/${id}`)
        .then(res => {
            dispatch({ 
                type: FETCH_SINGLE_CLASS_SUCCESS,
                payload: res.data.classes
            });
        })
        .catch(err => dispatch({ type: FETCH_SINGLE_CLASS_FAIL, error: err }));
};
