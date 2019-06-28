import axios from "axios";

//GET USER
export const GET_USER_START = "GET_USER_START";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAIL = "GET_USER_FAIL";
//GET All Admin
export const GET_ALL_ADMIN_START = "GET_ALL_ADMIN_START";
export const GET_ALL_ADMIN_SUCCESS = "GET_ALL_ADMIN_SUCCESS";
export const GET_ALL_ADMIN_FAIL = "GET_ALL_ADMIN_FAIL";
//GET ALL VOLUNTEERS
export const GET_ALL_VOLUNTEERS_START = "GET_ALL_VOLUNTEERS_START";
export const GET_ALL_VOLUNTEERS_SUCCESS = "GET_ALL_VOLUNTEERS_SUCCESS";
export const GET_ALL_VOLUNTEERS_FAIL = "GET_ALL_VOLUNTEERS_FAIL";
//EDIT USER
export const EDIT_USER_START = "EDIT_USER_START";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";
//DELETE USER
export const DELETE_USER_START = "DELETE_USER_START";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";
//--GET USER--
export const getUser = () => dispatch => {
  dispatch({ type: GET_USER_START });
  const userData = JSON.parse(localStorage.getItem("Profile"));
  const { email, name } = userData;
  axios
    .post(`${process.env.REACT_APP_API}/api/auth`, {
      email,
      name
    })
    .then(res => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_USER_FAIL, error: err }));
};
//--GET ALL Volunteers--
export const getAllVolunteers = () => dispatch => {
  dispatch({ type: GET_ALL_VOLUNTEERS_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/users/volunteers`)
    .then(res => {
      dispatch({
        type: GET_ALL_VOLUNTEERS_SUCCESS,
        payload: res.data.volunteers
      });
    })
    .catch(err => dispatch({ type: GET_ALL_VOLUNTEERS_FAIL, error: err }));
};
//--GET ALL Admin--
export const getAllAdmin = () => dispatch => {
  dispatch({ type: GET_ALL_ADMIN_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/users/admin`)
    .then(res => {
      dispatch({ type: GET_ALL_ADMIN_SUCCESS, payload: res.data.admin });
    })
    .catch(err => dispatch({ type: GET_ALL_ADMIN_FAIL, error: err }));
};
//--EDIT USER--
export const editUser = (id, updatedData) => dispatch => {
  dispatch({ type: EDIT_USER_START });
  axios
    .put(`${process.env.REACT_APP_API}/api/users/${id}`, updatedData)
    .then(res =>
      dispatch({ type: EDIT_USER_SUCCESS, payload: res.data.updatedUser })
    )
    .catch(err => dispatch({ type: EDIT_USER_FAIL, error: err }));
};
//--DELETE USER--
export const deleteUser = id => dispatch => {
  dispatch({ type: DELETE_USER_START });
  axios
    .delete(`${process.env.REACT_APP_API}/api/users/${id}`)
    .then(res => dispatch({ type: DELETE_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: DELETE_USER_FAIL, error: err }));
};
