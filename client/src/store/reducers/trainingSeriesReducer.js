import {
  GET_TRAINING_SERIES_START,
  GET_TRAINING_SERIES_SUCCESS,
  GET_TRAINING_SERIES_FAIL,
  getTrainingSeries,
  ADD_TRIANING_SERIES_START,
  ADD_TRIANING_SERIES_SUCCESS,
  ADD_TRIANING_SERIES_FAIL,
  addTrainingSeries
} from "../actions";

const initialState = {
  trainingSeries: [],
  isLoading: false,
  error: "",
  isDoneAdding: false
};

const trainingSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET ACTIVITIES---
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
    // ---ADD ACTIVITY---
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
    default:
      return state;
  }
};

export default trainingSeriesReducer;
