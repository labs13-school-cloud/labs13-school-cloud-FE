import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL
} from "../actions/userActions";
import {
  POST_SUBSCRIBE_START,
  POST_SUBSCRIBE_SUCCESS,
  POST_SUBSCRIBE_FAIL,
  POST_UNSUBSCRIBE_START,
  POST_UNSUBSCRIBE_SUCCESS,
  POST_UNSUBSCRIBE_FAIL,
  POST_REGISTERSTRIPE_START,
  POST_REGISTERSTRIPE_SUCCESS,
  POST_REGISTERSTRIPE_FAIL
} from "../actions/stripeActions";

import {
  GET_VOLUNTEERS_START,
  GET_VOLUNTEERS_SUCCESS,
  GET_VOLUNTEERS_FAILURE,
  ADD_VOLUNTEERS_START,
  ADD_VOLUNTEERS_SUCCESS,
  ADD_VOLUNTEERS_FAILURE,
  EDIT_VOLUNTEERS_START,
  EDIT_VOLUNTEERS_SUCCESS,
  EDIT_VOLUNTEERS_FAILURE,
  GET_VOLUNTEER_ID_START,
  GET_VOLUNTEER_ID_SUCCESS,
  GET_VOLUNTEER_ID_FAILURE,
} from "store/actions/volunteerActions"

const initialState = {
  userProfile: [],
  volunteers: [],
  singleVolunteer: {},
  volunteerId: "",
  error: "",
  isLoading: false,
  isEditing: false,
  isAdding: false,
  addSuccess: false,
  doneLoading: false,
  paymentLoading: false,
  newUser: true
};

//returned stripe ids, currently only test versions should be passed back unless App wants to accept real money
const testPremium = "plan_EyjXqiSYXoKEXf";
const testPro = "plan_EyjXEzjQkZf78d";
// const livePremium = "plan_Ex95NK1FuaNiWb";
// const livePro = "plan_Ex955Zz8JE0ZuW";

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_START:
      return {
        ...state,
        isLoading: true,
        doneLoading: false,
        error: ""
      };
    case GET_USER_SUCCESS:
      if (action.payload.newUser) {
        return {
          ...state,
          userProfile: {
            ...action.payload,
            user: action.payload.newUser
          },
          isLoading: false,
          doneLoading: true,
          newUser: true,
          error: ""
        };
      } else {
        return {
          ...state,
          userProfile: action.payload,
          isLoading: false,
          doneLoading: true,
          newUser: false,
          error: ""
        };
      }
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        doneLoading: false,
        error: action.payload
      };
    // Get All VOLUNTEERS
    case GET_VOLUNTEERS_START:
      return {
        ...state,
        error: ""
      };
    case GET_VOLUNTEERS_SUCCESS:
      return {
        ...state,
        volunteers: action.payload,

      };
    case GET_VOLUNTEERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        doneLoading: false,
        error: ""
      };
    case ADD_VOLUNTEERS_START:
      return {
        ...state,
        isLoading: true,
        isAdding: true,
        error: ""
      };
    case ADD_VOLUNTEERS_SUCCESS:
      return {
        ...state,
        volunteers: [...state.volunteers, action.payload],
        volunteerId: action.payload.id,
        isLoading: false,
        isAdding: false,
        addSuccess: true,
        error: ""
      };
    case ADD_VOLUNTEERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case EDIT_VOLUNTEERS_START:
      return {
        ...state,
        error: "",
        isEditing: true
      };
    case EDIT_VOLUNTEERS_SUCCESS: // v = volunteers
      const updatedVolunteer = state.volunteers.map(v => {
        if(v.id === action.payload.id) {
          return {
            ...v,
            v: action.payload
          }
        } else return v;
      })
      return {
        ...state,
        isEditing: false,
        error: "",
        singleVolunteer: updatedVolunteer
      };
    case EDIT_VOLUNTEERS_FAILURE:
      return {
        ...state,
        isEditing: false,
        error: action.payload
      }
    case GET_VOLUNTEER_ID_START: 
      return {
        ...state,
        isLoading: true,
        error: ""
      }
    case GET_VOLUNTEER_ID_SUCCESS:
      return {
        ...state,
        singleVolunteer: action.payload,
        isLoading: false,
        error: ""
      }
    case GET_VOLUNTEER_ID_FAILURE: 
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case EDIT_USER_START:
      return {
        ...state,
        isLoading: true,
        isEditing: true,
        error: ""
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            email: action.payload.email,
            name: action.payload.name
          }
        },
        isLoading: false,
        isEditing: false,
        error: ""
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        error: action.payload
      };

    // STRIPE SUBSCRIPTION REDUCERS
    case POST_SUBSCRIBE_START:
      return {
        ...state,
        paymentLoading: true,
        error: ""
      };

    case POST_SUBSCRIBE_SUCCESS:
      let sub, maxNotif;
      if (action.payload.plan.id === testPremium) {
        sub = "Premium";
        maxNotif = 200;
      } else if (action.payload.plan.id === testPro) {
        sub = "Pro";
        maxNotif = 1000;
      }
      return {
        ...state,
        paymentLoading: false,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            subscription: sub,
            stripe: state.userProfile.user.stripe,
            max_notification_count: maxNotif
          }
        }
      };
    case POST_SUBSCRIBE_FAIL:
      return {
        ...state,
        paymentLoading: false,
        error: action.payload
      };
    //REGISTER&SUBSCRIBE
    case POST_REGISTERSTRIPE_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };

    case POST_REGISTERSTRIPE_SUCCESS:
      if (action.payload.subscriptions.data[0].plan.id === testPremium) {
        sub = "Premium";
        maxNotif = 200;
      } else if (action.payload.subscriptions.data[0].plan.id === testPro) {
        sub = "Pro";
        maxNotif = 1000;
      }

      return {
        ...state,
        isLoading: false,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            subscription: sub,
            stripe: action.payload.id,
            max_notification_count: maxNotif
          }
        }
      };
    case POST_REGISTERSTRIPE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    // UNSUBSCRIBE
    case POST_UNSUBSCRIBE_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case POST_UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: {
          ...state.userProfile,
          user: {
            ...state.userProfile.user,
            subscription: "free",
            stripe: null,
            max_notification_count: 50
          }
        }
      };
    case POST_UNSUBSCRIBE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
