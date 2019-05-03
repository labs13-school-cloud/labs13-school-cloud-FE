import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_SINGLE_MESSAGE_START,
  GET_SINGLE_MESSAGE_SUCCESS,
  GET_SINGLE_MESSAGE_FAIL,
  ADD_MESSAGE_START,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL,
  EDIT_MESSAGE_START,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAIL,
  DELETE_MESSAGE_START,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL,
  EDIT_TRAINING_SERIES_START,
  EDIT_TRAINING_SERIES_SUCCESS,
  EDIT_TRAINING_SERIES_FAIL
} from "../actions";

const initialState = {
  messages: [],
  newMessage: [],
  singleTrainingSeries: {},
  isLoading: false,
  isAdding: false,
  isEditing: false,
  isDeleting: false,
  error: "",
  addedSuccessfully: false,
  editedSuccessfully: false,
  deletedSuccessfully: false
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET ACTIVITIES---
    case GET_MESSAGES_START:
      return {
        ...state,
        isLoading: true,
        isAdding: false,
        error: ""
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload.messages
        //,singleTrainingSeries: action.payload.training_series[0]
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case GET_SINGLE_MESSAGE_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case GET_SINGLE_MESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload
      };
    case GET_SINGLE_MESSAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    // ---POST ACTIVITIES---
    case ADD_MESSAGE_START:
      return {
        ...state,
        isAdding: true,
        error: ""
      };
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        isAdding: false,
        addedSuccessfully: true,
        singleMessage: action.payload //should probably be newMessage??
      };
    case ADD_MESSAGE_FAIL:
      return {
        ...state,
        isAdding: false,
        error: action.error
      };
    // ---EDIT ACTIVITIES---
    case EDIT_MESSAGE_START:
      return {
        ...state,
        isEditing: true,
        error: ""
      };
    case EDIT_MESSAGE_SUCCESS:
      const updatedMessages = state.messages.map(msg => {
        if (msg.id === action.payload.id) {
          return {
            ...msg,
            message_name: action.payload.message_name,
            message_details: action.payload.message_details,
            link: action.payload.link,
            days_from_start: action.payload.days_from_start
          };
        } else return msg;
      });
      return {
        ...state,
        isEditing: false,
        editedSuccessfully: true,
        messages: updatedMessages
      };
    case EDIT_MESSAGE_FAIL:
      return {
        ...state,
        isEditing: false,
        error: action.error
      };
    case DELETE_MESSAGE_START:
      return {
        ...state,
        isDeleting: true,
        error: ""
      };
    case DELETE_MESSAGE_SUCCESS:
      const filteredMessages = state.messages.filter(
        msg => msg.id !== action.payload
      );
      return {
        ...state,
        isDeleting: false,
        deletedSuccessfully: true,
        messages: filteredMessages
      };
    case DELETE_MESSAGE_FAIL:
      return {
        ...state,
        isDeleting: false,
        error: action.error
      };
    case EDIT_TRAINING_SERIES_START:
      return {
        ...state
      };
    case EDIT_TRAINING_SERIES_SUCCESS:
      let updates = {
        training_series_id: state.singleTrainingSeries.id,
        title: action.payload.title,
        user_id: state.singleTrainingSeries.user_id
      };
      return {
        ...state,
        singleTrainingSeries: updates
      };
    case EDIT_TRAINING_SERIES_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
};

export default messagesReducer;
