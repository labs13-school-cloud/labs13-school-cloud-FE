import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from '../actions/userActions';

const initialState = {
  userProfile: [],
  error: '',
  isLoading: false,
  doneLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_START:
      return {
        ...state,
        isLoading: true,
        doneLoading: false,
        error: '',
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isLoading: false,
        doneLoading: true,
        error: '',
      };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        doneLoading: false,
        error: action.payload,
      };
    case EDIT_USER_START:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        userProfile: [...state.userProfile],
        isLoading: false,
        error: '',
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
