import {
  GET_TEXT_NOTIFICATIONS_START,
  GET_TEXT_NOTIFICATIONS_SUCCESS,
  GET_TEXT_NOTIFICATIONS_FAIL,
  GET_EMAIL_NOTIFICATIONS_START,
  GET_EMAIL_NOTIFICATIONS_SUCCESS,
  GET_EMAIL_NOTIFICATIONS_FAIL
} from "../actions";

const initialState = {
  textNotifications: [],
  emailNotifications: [],
  error: "",
  isLoading: false,
  isEditing: false
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET NOTIFICATIONS--
    case GET_TEXT_NOTIFICATIONS_START:
      return { ...state, isLoading: true, error: "" };
    case GET_TEXT_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        textNotifications: action.payload,
        isLoading: false,
        error: ""
      };
    case GET_TEXT_NOTIFICATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_EMAIL_NOTIFICATIONS_START:
      return { ...state, isLoading: true, error: "" };
    case GET_EMAIL_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        emailNotifications: action.payload,
        isLoading: false,
        error: ""
      };
    case GET_EMAIL_NOTIFICATIONS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default notificationsReducer;
