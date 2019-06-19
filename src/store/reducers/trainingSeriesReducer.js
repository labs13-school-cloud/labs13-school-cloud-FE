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
  GET_TRAINING_SERIES_MESSAGES_FAIL,
  GET_TRAINING_SERIES_ID_START,
  GET_TRAINING_SERIES_ID_SUCCESS,
  GET_TRAINING_SERIES_ID_FAIL,
  GET_VOLUNTEERS_FOR_TRAINING_SERIES_START,
  GET_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS,
  GET_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL,
  ADD_VOLUNTEERS_FOR_TRAINING_SERIES_START,
  ADD_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS,
  ADD_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL,
  DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_START,
  DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS,
  DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL
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
  addSuccess: false,
  assignments: [],
  activeTrainingSeries: {},
  trainingSeriesVolunteers: [],
  volunteer: {}
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
    // --- GET ID OF TRAINING SERIES --
    case GET_TRAINING_SERIES_ID_START:
      return { ...state, isLoading: true, error: "" };
    case GET_TRAINING_SERIES_ID_SUCCESS:
      return {
        ...state,
        activeTrainingSeries: action.payload,
        isLoading: false,
        error: ""
      };
    case GET_TRAINING_SERIES_ID_FAIL:
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
    // ---ADD VOLUNTEER TO TRAINING SERIES---
    case ADD_VOLUNTEERS_FOR_TRAINING_SERIES_START:
      return {
        ...state,
        isAdding: true,
        error: ""
      };
    case ADD_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeriesVolunteers: [...state.volunteers, action.payload],
        isAdding: false,
        addSuccess: true,
        error: ""
      };
    case ADD_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    // ---REMOVE A VOLUNTEER FROM TRAINING SERIES---
    case DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_START:
      return {
        ...state,
        error: ""
      };
    case DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeriesVolunteers: [
          ...state.trainingSeriesVolunteers.filter(
            series => series.volunteer_id !== action.payload
          )
        ],
        error: ""
      };
    case DELETE_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL:
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
            series: action.payload
          };
        } else return series;
      });
      return {
        ...state,
        isEditing: false,
        // isLoading: false,
        error: "",
        activeTrainingSeries: updatedItem
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
        messages: action.payload,
        error: ""
      };
    case GET_TRAINING_SERIES_MESSAGES_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    // --- GET VOLUNTEERS ASSIGNED TO TRAINING SERIES --
    case GET_VOLUNTEERS_FOR_TRAINING_SERIES_START:
      return { ...state, error: "" };
    case GET_VOLUNTEERS_FOR_TRAINING_SERIES_SUCCESS:
      return {
        ...state,
        trainingSeriesVolunteers: action.payload,
        error: ""
      };
    case GET_VOLUNTEERS_FOR_TRAINING_SERIES_FAIL:
      return {
        ...state,
        error: action.payload,
        trainingSeriesVolunteers: action.payload
      };

    default:
      return state;
  }
};

export default trainingSeriesReducer;
