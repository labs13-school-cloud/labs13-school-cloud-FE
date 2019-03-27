import {
  GET_TRAINING_SERIES_START,
  GET_TRAINING_SERIES_SUCCESS,
  GET_TRAINING_SERIES_FAIL,
  ADD_TRIANING_SERIES_START,
  ADD_TRIANING_SERIES_SUCCESS,
  ADD_TRIANING_SERIES_FAIL,
  EDIT_TRIANING_SERIES_START,
  EDIT_TRIANING_SERIES_SUCCESS,
  EDIT_TRIANING_SERIES_FAIL,
  DELETE_TRIANING_SERIES_START,
  DELETE_TRIANING_SERIES_SUCCESS,
  DELETE_TRIANING_SERIES_FAIL
} from "../actions";

const initialState = {
  trainingSeries: [],
  isLoading: false,
  error: "",
  isDoneAdding: false,
  isDoneEditing: false,
  isDoneDeleting: false
};

const trainingSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET TRAINING SERIES---
    case GET_TRAINING_SERIES_START:
      return { ...state, isDoneAdding: false, isLoading: true, error: "" };
    case GET_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: action.payload,
        isDoneAdding: false,
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
    case ADD_TRIANING_SERIES_START:
      return { ...state, isLoading: true, error: "" };
    case ADD_TRIANING_SERIES_SUCCESS:
      return { ...state, isDoneAdding: true, isLoading: false, error: "" };
    case ADD_TRIANING_SERIES_FAIL:
      return {
        ...state,
        isDoneAdding: false,
        isLoading: false,
        error: action.payload
      };
    // ---DELETE TRAINING SERIES---
    case DELETE_TRIANING_SERIES_START:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_TRIANING_SERIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: "",
        trainingSeries: [
          ...state.trainingSeries.filter(series => series.id !== action.payload)
        ]
      };
    case DELETE_TRIANING_SERIES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default trainingSeriesReducer;
