export const initialState = {
  teamMember: {
    first_name: "",
    last_name: "",
    job_description: "",
    email: "",
    phone_number: "",
    user_id: "",
    slack_uuid: "",
    manager_id: "",
    mentor_id: ""
  },
  isRouting: false,
  addDisabled: true,
  memberManager: "",
  memberMentor: ""
};

const emptyUser = {
  first_name: "",
  last_name: "",
  job_description: "",
  email: "",
  phone_number: "",
  user_id: "",
  slack_uuid: "",
  manager_id: "",
  mentor_id: ""
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MEMBER":
      return {
        ...state,
        teamMember: { ...state.teamMember, [action.key]: action.payload }
      };
    case "EDITING_MEMBER":
      return {
        ...state,
        teamMember: { ...state.teamMember, ...action.payload }
      };
    case "CLEAR_MEMBER":
      return { ...state, teamMember: emptyUser };
    case "TOGGLE_ROUTING":
      return { ...state, isRouting: !state.isRouting };
    case "TOGGLE_BUTTON":
      return {
        ...state,
        buttons: { ...state.buttons, [action.key]: !state.buttons[action.key] }
      };
    case "KILL_POPUP":
      return { ...state, buttons: { ...state.buttons, [action.key]: false } };
    case "UPDATE_DISABLED":
      return { ...state, addDisabled: action.payload };
    case "UPDATE_MANAGER_NAME":
      return { ...state, memberManager: action.payload };
    case "UPDATE_MENTOR_NAME":
      return { ...state, memberMentor: action.payload };
    default:
      return state;
  }
};
