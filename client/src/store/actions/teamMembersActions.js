import axios from "axios";

export const FETCH_TEAM_START = "FETCH_TEAM_START";
export const FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS";
export const FETCH_TEAM_FAIL = "FETCH_TEAM_FAIL";

export const ADD_MEMBER_START = "ADD_MEMBER_START";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const ADD_MEMBER_FAIL = " ADD_MEMBER_FAIL";

export const DELETE_MEMBER_START = "DELETE_MEMBER_START";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAIL = "DELETE_MEMBER_FAIL";

const baseUrl = `${process.env.REACT_APP_API}/api`;

export const getTeamMembers = id => dispatch => {
  dispatch({ type: FETCH_TEAM_START });
  axios
    .get(`${baseUrl}/users/${id}/team-members`)
    .then(res =>
      dispatch({ type: FETCH_TEAM_SUCCESS, payload: res.data.members })
    )
    .catch(err => dispatch({ type: FETCH_TEAM_FAIL, payload: err }));
};

export const addTeamMember = teamMember => dispatch => {
  dispatch({ type: ADD_MEMBER_START });

  axios
    .post(`${baseUrl}/team-members`, teamMember)
    .then(res => {
      dispatch({ type: ADD_MEMBER_SUCCESS, payload: res.data.newTeamMember });
    })

    .catch(err => dispatch({ type: ADD_MEMBER_FAIL, payload: err }));
};

export const editTeamMember = changes => dispatch => {};

export const deleteTeamMember = id => dispatch => {
  dispatch({ type: DELETE_MEMBER_START });

  axios
    .delete(`${baseUrl}/team-members/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({ type: DELETE_MEMBER_SUCCESS, payload: id });
    })
    .catch(err => dispatch({ type: DELETE_MEMBER_FAIL, payload: err }));
};
