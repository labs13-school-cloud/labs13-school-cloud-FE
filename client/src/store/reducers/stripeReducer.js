import { 
    GET_PLANS_START, 
    GET_PLANS_SUCCESS, 
    GET_PLANS_FAIL ,
   //
    POST_UNSUBSCRIBE_START, 
    POST_UNSUBSCRIBE_SUCCESS, 
    POST_UNSUBSCRIBE_FAIL ,
   //
    POST_SUBSCRIBE_START, 
    POST_SUBSCRIBE_SUCCESS, 
    POST_SUBSCRIBE_FAIL ,
} from '../actions';

const initialState = {
    plans: [],
    isLoading:false,
    subscribeLoading:false,
    error:'',
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
