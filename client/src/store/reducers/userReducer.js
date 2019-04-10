import {
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  EDIT_USER_START,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
} from '../actions/userActions';
import {
  POST_SUBSCRIBE_START,
  POST_SUBSCRIBE_SUCCESS,
  POST_SUBSCRIBE_FAIL,
  POST_UNSUBSCRIBE_START,
  POST_UNSUBSCRIBE_SUCCESS,
  POST_UNSUBSCRIBE_FAIL,
  POST_REGISTERSTRIPE_START,
  POST_REGISTERSTRIPE_SUCCESS,
  POST_REGISTERSTRIPE_FAIL,
} from '../actions/stripeActions';

const initialState = {
  userProfile: [],
  error: '',
  isLoading: false,
  isEditing: false,
  doneLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_START:
      return {
        ...state,
        isLoading: true,
        doneLoading: false,
        error: '',
      };
    case GET_USER_SUCCESS:
      if (action.payload.newUser) {
        return {
          ...state,

          userProfile: {
            ...action.payload,
            user: action.payload.newUser,
          },
          isLoading: false,
          doneLoading: true,
          error: '',
        };
      } else {
        return {
          ...state,
          userProfile: action.payload,
          isLoading: false,
          doneLoading: true,
          error: '',
        };
      }
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        doneLoading: false,
        error: action.payload,
      };
    case EDIT_USER_START:
      return {
        ...state,
        isLoading: true,
        isEditing: true,
        error: '',
      };
    case EDIT_USER_SUCCESS:
      console.log(state.userProfile);
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          user: {
            email: action.payload.email,
            name: action.payload.name,
          },
        },
        isLoading: false,
        isEditing: false,
        error: '',
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isEditing: false,
        error: action.payload,
      };

    // STRIPE SUBSCRIPTION REDUCERS
    case POST_SUBSCRIBE_START:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case POST_SUBSCRIBE_SUCCESS:
      let accountTypeID;
      if (action.payload.plan.id === 'plan_EmJallrSdkqpPS') {
        accountTypeID = 2;
      } else if (action.payload.plan.id === 'plan_EmJaXZor4Ef3co') {
        accountTypeID = 3;
      }
      let update = {
        message: state.userProfile.message,
        user: {
          userID: state.userProfile.user.userID,
          accountTypeID: accountTypeID,
          email: state.userProfile.user.email,
          name: state.userProfile.user.name,
          stripe: state.userProfile.user.stripe,
        },
        trainingSeries: [...state.userProfile.trainingSeries],
      };
      return {
        ...state,
        isLoading: false,
        userProfile: update,
      };
    case POST_SUBSCRIBE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    //REGISTER&SUBSCRIBE
    case POST_REGISTERSTRIPE_START:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case POST_REGISTERSTRIPE_SUCCESS:
      console.log('action.payload', action.payload);
      let accountTypeID2;
      if (
        action.payload.subscriptions.data[0].plan.id === 'plan_EmJallrSdkqpPS'
      ) {
        accountTypeID2 = 2;
      } else if (
        action.payload.subscriptions.data[0].plan.id === 'plan_EmJaXZor4Ef3co'
      ) {
        accountTypeID2 = 3;
      }

      let update3 = {
        message: state.userProfile.message,
        user: {
          userID: state.userProfile.user.userID,
          accountTypeID: accountTypeID2,
          email: state.userProfile.user.email,
          name: state.userProfile.user.name,
          stripe: action.payload.id,
        },
        trainingSeries: [...state.userProfile.trainingSeries],
      };
      return {
        ...state,
        isLoading: false,
        userProfile: update3,
      };
    case POST_REGISTERSTRIPE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    // UNSUBSCRIPE
    case POST_UNSUBSCRIBE_START:
      return {
        ...state,
        isLoading: true,
        error: '',
      };

    case POST_UNSUBSCRIBE_SUCCESS:
      let update2 = {
        message: state.userProfile.message,
        user: {
          userID: state.userProfile.user.userID,
          accountTypeID: 1,
          email: state.userProfile.user.email,
          name: state.userProfile.user.name,
          stripe: state.userProfile.user.stripe,
        },
        trainingSeries: [...state.userProfile.trainingSeries],
      };
      return {
        ...state,
        isLoading: false,
        userProfile: update2,
      };
    case POST_UNSUBSCRIBE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
