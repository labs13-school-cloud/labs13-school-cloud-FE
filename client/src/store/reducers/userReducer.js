import {
	GET_USER_START,
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	EDIT_USER_START,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAIL,
	DELETE_USER_START,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
} from '../actions/userActions';
import { POST_SUBSCRIBE_SUCCESS, POST_UNSUBSCRIBE_SUCCESS } from '../actions/stripeActions';

const initialState = {
	userProfile: [],
	error: '',
	isLoading: false,
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
			return {
				...state,
				userProfile: action.payload,
				isLoading: false,
				doneLoading: true,
				error: '',
			};
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
				error: '',
			};
		case EDIT_USER_SUCCESS:
			return {
				...state,
				userProfile: [...state.userProfile],
				isLoading: false,
				error: '',
			};
		case EDIT_USER_FAIL:
			return {
				...state,
				isLoading: false,
				error: action.payload,
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
				userProfile: update,
			};
		case POST_UNSUBSCRIBE_SUCCESS:
			let update2 = {
				message: state.userProfile.message,
				user: {
					userID: state.userProfile.user.userID,
					accountTypeID: action.payload,
					email: state.userProfile.user.email,
					name: state.userProfile.user.name,
					stripe: state.userProfile.user.stripe,
				},
				trainingSeries: [...state.userProfile.trainingSeries],
			};
			return {
				...state,
				userProfile: update2,
			};

		default:
			return state;
	}
};

export default userReducer;
