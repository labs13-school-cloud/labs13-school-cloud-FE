import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  ADD_MESSAGE_START,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAIL,
  EDIT_MESSAGE_START,
  EDIT_MESSAGE_SUCCESS,
  EDIT_MESSAGE_FAIL,
  DELETE_MESSAGE_START,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAIL
} from "../actions";

const initialState = {
  messages: [],
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
      return { ...state, isLoading: true, error: "" };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messages: action.payload,
        error: ""
      };
    case GET_MESSAGES_FAIL:
      return { ...state, isLoading: false, error: action.error };
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
        messages: [...state.messages, action.payload]
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
            ...action.payload
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
    // ---DELETE ACTIVITIES---
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
    default:
      return state;
  }
};

export default messagesReducer;
