import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_SINGLE_NOTIFICATION_START,
  GET_SINGLE_NOTIFICATION_SUCCESS,
  GET_SINGLE_NOTIFICATION_FAIL,
  ADD_NOTIFICATION_START,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAIL,
  DELETE_NOTIFICATION_START,
  DELETE_NOTIFICATION_SUCCESS,
  DELETE_NOTIFICATION_FAIL
} from "../actions";

const initialState = {
  notifications: [],
  singleNotification: [],
  error: "",
  isLoading: false,
  isAdding: false,
  isDeleting: false
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
    // get single notification
    case GET_SINGLE_NOTIFICATION_START:
      return { ...state, isLoading: true, error: "" };
    case GET_SINGLE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        singleNotification: action.payload,
        isLoading: false
      };
    case GET_SINGLE_NOTIFICATION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    // add notification
    case ADD_NOTIFICATION_START:
      return {
        ...state,
        isAdding: true,
        error: ""
      };
    case ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isAdding: false,
        notifications: [...state.notifications, action.payload]
      };
    case ADD_NOTIFICATION_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.error
      };
    // delete notification
    case DELETE_NOTIFICATION_START:
      return {
        ...state,
        isDeleting: true,
        error: ""
      };
    case DELETE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case DELETE_NOTIFICATION_FAIL:
      return {
        ...state,
        isDeleting: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default notificationsReducer;
