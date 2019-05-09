import {
  GET_TRAINING_SERIES_START,
  GET_TRAINING_SERIES_SUCCESS,
  GET_TRAINING_SERIES_FAIL,
  ADD_TRAINING_SERIES_START,
  ADD_TRAINING_SERIES_SUCCESS,
  ADD_TRAINING_SERIES_FAIL,
  EDIT_TRAINING_SERIES_START,
  EDIT_TRAINING_SERIES_SUCCESS,
  EDIT_TRAINING_SERIES_FAIL,
  DELETE_TRAINING_SERIES_START,
  DELETE_TRAINING_SERIES_SUCCESS,
  DELETE_TRAINING_SERIES_FAIL,
  GET_TRAINING_SERIES_MESSAGES_START,
  GET_TRAINING_SERIES_MESSAGES_SUCCESS,
  GET_TRAINING_SERIES_MESSAGES_FAIL
} from "../actions";

const initialState = {
  trainingSeries: [],
  trainingSeriesID: "",
  error: "",
  isLoading: false,
  isEditing: false,
  isGettingMessages: false,
  messages: [],
  isAdding: false,
  addSuccess: false
};

const trainingSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET TRAINING SERIES---
    case GET_TRAINING_SERIES_START:
      return { ...state, isLoading: true, error: "" };
    case GET_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: action.payload.reverse(),
        isLoading: false,
        error: ""
      };
    case GET_TRAINING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // ---ADD TRAINING SERIES---
    case ADD_TRAINING_SERIES_START:
      return {
        ...state,
        isLoading: true,
        isAdding: true,
        error: ""
      };
    case ADD_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: [...state.trainingSeries, action.payload],
        trainingSeriesID: action.payload.id,
        isLoading: false,
        isAdding: false,
        addSuccess: true,
        error: ""
      };
    case ADD_TRAINING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // ---EDIT TRAINING SERIES---
    case EDIT_TRAINING_SERIES_START:
      return {
        ...state,
        // isLoading: true,
        error: "",
        isEditing: true
      };
    case EDIT_TRAINING_SERIES_SUCCESS:
      const updatedItem = state.trainingSeries.map(series => {
        if (series.trainingSeriesID === action.payload.id) {
          return {
            ...series,
            title: action.payload.title
          };
        } else return series;
      });
      return {
        ...state,
        isEditing: false,
        // isLoading: false,
        error: "",
        trainingSeries: updatedItem
      };

    case EDIT_TRAINING_SERIES_FAIL:
      return {
        ...state,
        isEditing: false,
        // isLoading: false,
        error: action.payload
      };
    // ---DELETE TRAINING SERIES---
    case DELETE_TRAINING_SERIES_START:
      return { ...state, isLoading: false };
    case DELETE_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: [
          ...state.trainingSeries.filter(series => series.id !== action.payload)
        ],
        isLoading: false,
        error: ""
      };
    case DELETE_TRAINING_SERIES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case GET_TRAINING_SERIES_MESSAGES_START:
      return { ...state, isLoading: true };
    case GET_TRAINING_SERIES_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: action.payload.messages,
        error: ""
      };
    case GET_TRAINING_SERIES_MESSAGES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default trainingSeriesReducer;
