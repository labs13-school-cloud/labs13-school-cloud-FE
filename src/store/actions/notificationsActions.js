import axios from "axios";

// GET NOTIFICATIONS
export const GET_NOTIFICATIONS_START = "GET_NOTIFICATIONS_START";
export const GET_NOTIFICATIONS_SUCCESS = "GET_NOTIFICATIONS_SUCCESS";
export const GET_NOTIFICATIONS_FAIL = "GET_NOTIFICATIONS_FAIL";

// GET SINGLE NOTIFICATION
export const GET_SINGLE_NOTIFICATION_START = "GET_SINGLE_NOTIFICATION_START";
export const GET_SINGLE_NOTIFICATION_SUCCESS = "GET_NOTIFICATION_SUCCESS";
export const GET_SINGLE_NOTIFICATION_FAIL = "GET_NOTIFICATION_FAIL";

// ADD NOTIFICATION
export const ADD_NOTIFICATION_START = "ADD_NOTIFICATION_START";
export const ADD_NOTIFICATION_SUCCESS = "ADD_NOTIFICATION_SUCCESS";
export const ADD_NOTIFICATION_FAIL = "ADD_NOTIFICATION_FAIL";

// DELETE NOTIFICATION
export const DELETE_NOTIFICATION_START = "DELETE_NOTIFICATION_START";
export const DELETE_NOTIFICATION_SUCCESS = "DELETE_NOTIFICATION_SUCCESS";
export const DELETE_NOTIFICATION_FAIL = "DELETE_NOTIFICATION_FAIL";

// GET all notifications (BE is set up so it will only retrieve notifications for logged-in user)
export const getNotifications = () => dispatch => {
  dispatch({ type: GET_NOTIFICATIONS_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/notifications`)
    .then(res => {
      console.log("NOTIF", res.data.notifications);
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: res.data.notifications
      });
    })
    .catch(err => dispatch({ type: GET_NOTIFICATIONS_FAIL, error: err }));
};

// GET single notification by id
export const getNotificationById = id => dispatch => {
  dispatch({ type: GET_SINGLE_NOTIFICATION_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/notifications/${id}`)
    .then(res => {
      dispatch({
        type: GET_SINGLE_NOTIFICATION_SUCCESS,
        payload: res.data.notification
      });
    })
    .catch(err => dispatch({ type: GET_SINGLE_NOTIFICATION_FAIL, error: err }));
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
