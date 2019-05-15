import {
  GET_PLANS_START,
  GET_PLANS_SUCCESS,
  GET_PLANS_FAIL,
  GET_CUSTOMER_PLAN_START,
  GET_CUSTOMER_PLAN_SUCCESS,
  GET_CUSTOMER_PLAN_FAIL
} from "../actions";

const initialState = {
  plans: [],
  plan: "",
  subscription: "",
  unsubscribe: "",
  isLoading: false,
  subscribeLoading: false,
  error: ""
};

const stripeReducer = (state = initialState, action) => {
  switch (action.type) {
    // ---GET ACTIVITIES---
    case GET_PLANS_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case GET_PLANS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        plans: action.payload.reverse()
      };
    case GET_PLANS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_CUSTOMER_PLAN_START:
      return {
        ...state,
        isLoading: true,
        error: ""
      };
    case GET_CUSTOMER_PLAN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        plan: action.payload
      };
    case GET_CUSTOMER_PLAN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default stripeReducer;
