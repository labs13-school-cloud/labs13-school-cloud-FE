import axios from "axios";

// GET NOTIFICATIONS
export const GET_NOTIFICATIONS_START = "GET_NOTIFICATIONS_START";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAIL = "GET_NOTIFICATIONS_FAIL";

// ADD NOTIFICATION
export const ADD_NOTIFICATION_START = "ADD_NOTIFICATION_START";
export const ADD_NOTIFICATION_SUCCESS = "ADD_NOTIFICATION_SUCCESS";
export const ADD_NOTIFICATION_FAIL = "ADD_NOTIFICATION_FAIL";

// DELETE NOTIFICATION
export const DELETE_NOTIFICATION_START = "DELETE_NOTIFICATION_START";
export const DELETE_NOTIFICATION_SUCCESS = "DELETE_NOTIFICATION_SUCCESS";
export const DELETE_NOTIFICATION_FAIL = "DELETE_NOTIFICATION_FAIL";

// DELETE NOTIFICATIONS BY UNASSIGNING TEAM MEMBER
export const UNASSIGN_START = "UNASSIGN_START";
export const UNASSIGN_SUCCESS = "UNASSIGN_SUCCESS";
export const UNASSIGN_FAIL = "UNASSIGN_FAIL";

// GET all notifications (BE is set up so it will only retrieve notifications for logged-in user)
export const getNotifications = () => dispatch => {
  dispatch({ type: GET_NOTIFICATIONS_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/notifications`)
    .then(res => {
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: res.data.notifications
      });
    })
    .catch(err => dispatch({ type: GET_NOTIFICATIONS_FAIL, error: err }));
};

// ADD notification
export const addNotification = notification => dispatch => {
  dispatch({ type: ADD_NOTIFICATION_START });
  axios
    .post(`${process.env.REACT_APP_API}/api/notifications/`, notification)
    .then(res => {
      dispatch({
        type: ADD_NOTIFICATION_SUCCESS,
        payload: res.data.newNotification
      });
    })
    .catch(err => dispatch({ type: ADD_NOTIFICATION_FAIL, error: err }));
};

// DELETE notification by id
export const deleteNotification = id => dispatch => {
  dispatch({ type: DELETE_NOTIFICATION_START });
  axios
    .delete(`${process.env.REACT_APP_API}/api/notifications/${id}`)
    .then(res => {
      dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: id });
    })
    .catch(err => dispatch({ type: DELETE_NOTIFICATION_FAIL, error: err }));
};

// DELETE notifications by unassigning a team member from a training series
export const unassignTeamMember = (tm_id, ts_id) => dispatch => {
  dispatch({ type: UNASSIGN_START });
  axios
    .delete(
      `${process.env.REACT_APP_API}/api/team-members/${tm_id}/unassign/${ts_id}`
    )
    .then(res => {
      console.log(res);
      dispatch({ type: UNASSIGN_SUCCESS, payload: res.data.ids });
    })
    .catch(err => dispatch({ type: UNASSIGN_FAIL, error: err }));
};
