import axios from 'axios';

//GET NOTIFICATIONS
export const GET_NOTIFICATION_START = 'GET_TRAINING_SERIES_START';
export const GET_NOTIFICATION_SUCCESS = 'GET_TRAINING_SERIES_COMPLETE';
export const GET_NOTIFICATION_FAIL = 'GET_TRAINING_SERIES_FAIL';

export const getNotifications = id => dispatch => {
  dispatch({
    type: GET_NOTIFICATIONS_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/notifications/${id}`)
    .then(res =>
      dispatch({
        type: GET_NOTIFICATIONS_SUCCESS,
        payload: res.data.notifications
      })
    )
    .catch(err => dispatch({ type: GET_NOTIFICATIONS_FAIL, error: err }));
};
