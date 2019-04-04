import {
  GET_NOTIFICATIONS_START,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAIL
} from '../actions';

const initialState = {
  notifications: [],
  error: '',
  isLoading: false,
  isEditing: false
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET NOTIFICATIONS--
    case GET_TRAINING_SERIES_START:
      return { ...state, isLoading: true, error: '' };
    case GET_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isLoading: false,
        error: ''
      };
    case GET_TRAINING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default trainingSeriesReducer;
