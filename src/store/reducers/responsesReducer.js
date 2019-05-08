import {
  GET_RESPONSES_START,
  GET_RESPONSES_SUCCESS,
  GET_RESPONSES_FAIL,
  GET_SINGLE_RESPONSE_START,
  GET_SINGLE_RESPONSE_SUCCESS,
  GET_SINGLE_RESPONSE_FAIL,
  ADD_RESPONSE_START,
  ADD_RESPONSE_SUCCESS,
  ADD_RESPONSE_FAIL,
  DELETE_RESPONSE_START,
  DELETE_RESPONSE_SUCCESS,
  DELETE_RESPONSE_FAIL
} from "../actions";

const initialState = {
  responses: [],
  singleResponse: [],
  isLoading: false,
  isAdding: false,
  isDeleting: false,
  error: ""
};

const responsesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESPONSES_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case GET_RESPONSES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        responses: action.payload
      };
    case GET_RESPONSES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_SINGLE_RESPONSE_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case GET_SINGLE_RESPONSE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        singleResponse: action.payload
      };
    case GET_RESPONSES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ADD_RESPONSE_START:
      return {
        ...state,
        isAdding: true,
        error: ""
      };
    case ADD_RESPONSE_SUCCESS:
      return {
        ...state,
        isAdding: false,
        responses: [...state.responses, action.payload]
      };
    case ADD_RESPONSE_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.error
      };
    case DELETE_RESPONSE_START:
      return {
        ...state,
        isDeleting: true,
        error: ""
      };
    case DELETE_RESPONSE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        responses: state.responses.filter(r => r.id !== action.payload)
      };
    case DELETE_RESPONSE_FAIL:
      return {
        ...state,
        isDeleting: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default responsesReducer;
