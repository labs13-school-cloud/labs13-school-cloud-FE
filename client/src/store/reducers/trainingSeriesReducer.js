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
  error: "",
  isLoading: false
};

const trainingSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET TRAINING SERIES---
    case GET_TRAINING_SERIES_START:
      return { ...state, isLoading: true, error: "" };
    case GET_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: action.payload,
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
      return {
        ...state,
        trainingSeries: [...state.trainingSeries, action.payload],
        isLoading: false,
        error: ""
      };
    case ADD_TRIANING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // ---EDIT TRIANING SERIES---
    case EDIT_TRIANING_SERIES_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case EDIT_TRIANING_SERIES_SUCCESS:
      const updatedItem = state.trainingSeries.map(series => {
        if (series.trainingSeriesID === action.payload.trainingSeriesID) {
          return {
            ...series,
            title: action.payload.title
          };
        } else return series;
      });
      return {
        ...state,
        isLoading: false,
        error: "",
        trainingSeries: updatedItem
      };

    case EDIT_TRIANING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // ---DELETE TRAINING SERIES---
    case DELETE_TRIANING_SERIES_START:
      return { ...state, isLoading: false, error: action.payload };
    case DELETE_TRIANING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: [
          ...state.trainingSeries.filter(
            series => series.trainingSeriesID !== action.payload
          )
        ],
        isLoading: false,
        error: ""
      };
    case DELETE_TRIANING_SERIES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default trainingSeriesReducer;
