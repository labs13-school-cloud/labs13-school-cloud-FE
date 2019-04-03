import axios from "axios";

export const FETCH_TEAM_START = "FETCH_TEAM_START";
export const FETCH_TEAM_SUCCESS = "FETCH_TEAM_SUCCESS";
export const FETCH_TEAM_FAIL = "FETCH_TEAM_FAIL";

export const FETCH_SINGLE_MEMBER_START = "FETCH_SINGLE_MEMBER_START";
export const FETCH_SINGLE_MEMBER_SUCCESS = "FETCH_SINGLE_MEMBER_SUCCESS";
export const FETCH_SINGLE_MEMBER_FAIL = "FETCH_SINGLE_MEMBER_FAIL";

export const ADD_MEMBER_START = "ADD_MEMBER_START";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";
export const ADD_MEMBER_FAIL = " ADD_MEMBER_FAIL";

export const DELETE_MEMBER_START = "DELETE_MEMBER_START";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAIL = "DELETE_MEMBER_FAIL";

export const EDIT_MEMBER_START = "EDIT_MEMBER_START";
export const EDIT_MEMBER_SUCCESS = "EDIT_MEMBER_SUCCESS";
export const EDIT_MEMBER_FAIL = "EDIT_MEMBER_FAIL";

export const ADD_MEMBER_TO_TRAININGSERIES_START =
  "ADD_MEMBER_TO_TRAININGSERIES_START";
export const ADD_MEMBER_TO_TRAININGSERIES_SUCCESS =
  "ADD_MEMBER_TO_TRAININGSERIES_SUCCESS";
export const ADD_MEMBER_TO_TRAININGSERIES_FAIL =
  "ADD_MEMBER_TO_TRAININGSERIES_FAIL";

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

export const editTeamMember = (id, changes) => dispatch => {
  dispatch({ type: EDIT_MEMBER_START });

  axios
    .put(`${baseUrl}/team-members/${id}`, changes)
    .then(res => {
      console.log("EDIT RESPONSE", res.data);
      dispatch({
        type: EDIT_MEMBER_SUCCESS,
        payload: res.data.updatedTeamMember
      });
    })
    .catch(err => dispatch({ type: EDIT_MEMBER_FAIL, payload: err }));
};

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

export const getTeamMemberByID = id => dispatch => {
  dispatch({ type: FETCH_SINGLE_MEMBER_START });
  axios
    .get(`${baseUrl}/team-members/${id}`)
    .then(res => {
      dispatch({
        type: FETCH_SINGLE_MEMBER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => dispatch({ type: FETCH_SINGLE_MEMBER_FAIL, error: err }));
};

export const addTeamMemberToTrainingSeries = data => dispatch => {
  dispatch({ type: ADD_MEMBER_TO_TRAININGSERIES_START });
  console.log("data from action", data);
  axios
    .post(`${baseUrl}/team-members/assign`, data)
    .then(res => {
      console.log("ADD TEAM MEMBER DATA", res.data);
      axios
        .get(`${baseUrl}/team-members/${data.assignments[0]}`)
        .then(res => {
          console.log("PAYLOAD FROM ACTION", res.data);
          dispatch({
            type: ADD_MEMBER_TO_TRAININGSERIES_SUCCESS,
            payload: res.data
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err =>
      dispatch({ type: ADD_MEMBER_TO_TRAININGSERIES_FAIL, error: err })
    );
};
