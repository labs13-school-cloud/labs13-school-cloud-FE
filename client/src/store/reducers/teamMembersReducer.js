import {
  FETCH_TEAM_FAIL,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_START,
  ADD_MEMBER_START,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAIL
} from "../actions";

const initialState = {
  teamMembers: [],
  error: null,
  status: {
    isLoading: false,
    loadSuccess: false,
    isAdding: false,
    addSuccess: false,
    addFailed: false,
    loadFailed: false
  }
};

const teamMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TEAM_START:
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: true,
          loadSuccess: false,
          loadFailed: false
        }
      };
    case FETCH_TEAM_SUCCESS:
      return {
        ...state,
        teamMembers: action.payload,
        status: {
          ...state.status,
          isLoading: false,
          loadSuccess: true,
          loadFailed: false
        }
      };
    case FETCH_TEAM_FAIL:
      return {
        ...state,
        error: action.payload,
        status: {
          ...state.status,
          loadFailed: true
        }
      };
    case ADD_MEMBER_START:
      return {
        ...state,
        status: {
          ...state.status,
          isAdding: true,
          addSuccess: false,
          addFailed: false
        }
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        teamMembers: [...state.teamMembers, action.payload],
        status: {
          ...state.status,
          isAdding: false,
          addSuccess: true,
          addFailed: false
        }
      };
    case ADD_MEMBER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          addFailed: true
        },
        error: action.payload
      };
    default:
      return state;
  }
};

export default teamMembersReducer;
