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
  DELETE_TRIANING_SERIES_FAIL,
  GET_MEMBERS_ASSIGNED_START,
  GET_MEMBERS_ASSIGNED_SUCCESS,
  GET_MEMBERS_ASSIGNED_FAIL
} from "../actions";

const initialState = {
  trainingSeries: [],
  trainingSeriesID: '',
  error: '',
  isLoading: false,
  isEditing: false,
  isGettingAssignments: false,
  assignments: [],
  isAdding: false,
  addSuccess: false
};

const trainingSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET TRAINING SERIES---
    case GET_TRAINING_SERIES_START:
      return { ...state, isLoading: true, error: '' };
    case GET_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: action.payload.reverse(),
        isLoading: false,
        error: ''
      };
    case GET_TRAINING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // ---ADD TRAINING SERIES---
    case ADD_TRIANING_SERIES_START:
      return {
        ...state,
        isLoading: true,
        isAdding: true,
        error: ''
      };
    case ADD_TRIANING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeries: [...state.trainingSeries, action.payload],
        trainingSeriesID: action.payload.trainingSeriesID,
        isLoading: false,
        isAdding: false,
        addSuccess: true,
        error: ''
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
        error: '',
        isEditing: true
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
        isEditing: false,
        isLoading: false,
        error: '',
        trainingSeries: updatedItem
      };

    case EDIT_TRIANING_SERIES_FAIL:
      return {
        ...state,
        isEditing: false,
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
        error: ''
      };
    case DELETE_TRIANING_SERIES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    case GET_MEMBERS_ASSIGNED_START:
    return {
      ...state,
      isGettingAssignments: true,
      error: ""
    };
    case GET_MEMBERS_ASSIGNED_SUCCESS:
    return {
      ...state,
      isGettingAssignments: false,
      assignments: action.payload
    };
    case GET_MEMBERS_ASSIGNED_FAIL:
    return {
      ...state,
      isGettingAssignments: false,
      error: action.error
    }
    default:
      return state;
  }
};

export default trainingSeriesReducer;
