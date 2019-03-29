import {
  FETCH_TEAM_FAIL,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_START,
  ADD_MEMBER_START,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAIL,
  DELETE_MEMBER_START,
  DELETE_MEMBER_FAIL,
  DELETE_MEMBER_SUCCESS,
  EDIT_MEMBER_START,
  EDIT_MEMBER_SUCCESS,
  EDIT_MEMBER_FAIL
} from "../actions";
import { CardActions } from "@material-ui/core";

const initialState = {
  teamMembers: [],
  teamMember: {},
  error: null,
  status: {
    isLoading: false,
    loadSuccess: false,
    isAdding: false,
    addSuccess: false,
    addFailed: false,
    loadFailed: false,
    isEditing: false,
    editSuccess: false,
    editFailed: false,
    isDeleting: false,
    deleteSuccess: false,
    deleteFailed: false
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

    case EDIT_MEMBER_START:
      return {
        ...state,
        status: {
          ...state.status,
          isEditing: true,
          editSuccess: false,
          editFailed: false
        }
      };
    case EDIT_MEMBER_SUCCESS:
      const updatedMember = state.teamMembers.map(member => {
        if (member.teamMemberID === action.payload.teamMemberID) {
          return {
            ...member,
            ...action.payload
          };
        } else {
          return member;
        }
      });
      return {
        ...state,
        teamMembers: updatedMember,
        status: {
          ...state.status,
          isEditing: false,
          editSuccess: true
        }
      };

    case EDIT_MEMBER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          editFailed: true,
          editSuccess: false
        },
        error: action.payload
      };

    case DELETE_MEMBER_START:
      return {
        ...state,
        status: {
          ...state.status,
          isDeleting: true,
          deleteFailed: false,
          deleteSuccess: false
        }
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        teamMembers: [
          ...state.teamMembers.filter(
            member => member.teamMemberID !== action.payload
          )
        ],
        status: {
          isDeleting: false,
          deleteSuccess: true
        }
      };
    case DELETE_MEMBER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          deleteSuccess: false,
          deleteFailed: true
        },
        error: action.payload
      };
    default:
      return state;
  }
};

export default teamMembersReducer;
