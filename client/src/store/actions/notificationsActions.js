import axios from 'axios';

//GET NOTIFICATIONS
export const GET_TEXT_NOTIFICATIONS_START = 'GET_TEXT_NOTIFICATIONS_START';
export const GET_TEXT_NOTIFICATIONS_SUCCESS = 'GET_TEXT_NOTIFICATIONS_SUCCESS';
export const GET_TEXT_NOTIFICATIONS_FAIL = 'GET_TEXT_NOTIFICATIONS_FAIL';
export const GET_EMAIL_NOTIFICATIONS_START = 'GET_EMAIL_NOTIFICATIONS_START';
export const GET_EMAIL_NOTIFICATIONS_SUCCESS =
  'GET_EMAIL_NOTIFICATIONS_SUCCESS';
export const GET_EMAIL_NOTIFICATIONS_FAIL = 'GET_EMAIL_NOTIFICATIONS_FAIL';

export const getTextNotifications = id => dispatch => {
  dispatch({
    type: GET_TEXT_NOTIFICATIONS_START
  });
  axios
    .get(`http://localhost:5000/api/users/${id}/text-notifications/`)
    .then(res =>
      dispatch({
        type: GET_TEXT_NOTIFICATIONS_SUCCESS,
        payload: res.data.textNotifications
      })
    )
    .catch(err => dispatch({ type: GET_TEXT_NOTIFICATIONS_FAIL, error: err }));
};

export const getEmailNotifications = id => dispatch => {
  dispatch({
    type: GET_EMAIL_NOTIFICATIONS_START
  });
  axios
    .get(`http://localhost:5000/api/users/${id}/email-notifications/`)
    .then(res =>
      dispatch({
        type: GET_EMAIL_NOTIFICATIONS_SUCCESS,
        payload: res.data.emailNotifications
      })
    )
    .catch(err => dispatch({ type: GET_EMAIL_NOTIFICATIONS_FAIL, error: err }));
};
