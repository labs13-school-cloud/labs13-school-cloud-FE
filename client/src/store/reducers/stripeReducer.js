import {
	GET_PLANS_START,
	GET_PLANS_SUCCESS,
	GET_PLANS_FAIL,
	//
	GET_CUSTOMER_PLAN_START,
	GET_CUSTOMER_PLAN_SUCCESS,
	GET_CUSTOMER_PLAN_FAIL,
	//
	POST_UNSUBSCRIBE_START,
	POST_UNSUBSCRIBE_SUCCESS,
	POST_UNSUBSCRIBE_FAIL,
	//
	POST_SUBSCRIBE_START,
	POST_SUBSCRIBE_SUCCESS,
	POST_SUBSCRIBE_FAIL,
} from '../actions';

const initialState = {
	plans: [],
	plan: '',
	subscription: '',
	unsubscribe: '',
	isLoading: false,
	subscribeLoading: false,
	error: '',
};

const stripeReducer = (state = initialState, action) => {
	switch (action.type) {
		// ---GET ACTIVITIES---
		case GET_PLANS_START:
			return {
				...state,
				isLoading: true,
				error: '',
			};
		case GET_PLANS_SUCCESS:
			return {
				...state,
				isLoading: false,
				plans: action.payload,
			};
		case GET_PLANS_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case GET_CUSTOMER_PLAN_START:
			return {
				...state,
				isLoading: true,
				error: '',
			};
		case GET_CUSTOMER_PLAN_SUCCESS:
			return {
				...state,
				isLoading: false,
				plan: action.payload,
			};
		case GET_CUSTOMER_PLAN_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		//---POST ACTIVITIES---
		case POST_UNSUBSCRIBE_START:
			return {
				...state,
				isLoading: true,
				error: '',
			};
		case POST_UNSUBSCRIBE_SUCCESS:
			return {
				...state,
				unsubscribe: action.payload,
				isLoading: false,
			};
		case POST_UNSUBSCRIBE_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case POST_SUBSCRIBE_START:
			return {
				...state,
				subscribeLoading: true,
				error: '',
			};
		case POST_SUBSCRIBE_SUCCESS:
			return {
				...state,
				subscription: action.payload,
				subscribeLoading: false,
			};
		case POST_SUBSCRIBE_FAIL:
			return {
				...state,
				subscribeLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default stripeReducer;
