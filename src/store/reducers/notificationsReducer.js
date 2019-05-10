import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  ADD_NOTIFICATION_START,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_START,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAIL
} from "../actions";

const initialState = {
  notifications: [],
  error: "",
  isLoading: false
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    // get notifications
    case GET_NOTIFICATIONS_START:
      return { ...state, isLoading: true, error: "" };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isLoading: false
      };
    case GET_NOTIFICATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    // add notification
    case ADD_NOTIFICATION_START:
      return {
        ...state,
        error: ""
      };
    case ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case ADD_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.error
      };
    // delete notification
    case DELETE_NOTIFICATION_START:
      return {
        ...state,
        error: ""
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case DELETE_NOTIFICATION_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default notificationsReducer;
