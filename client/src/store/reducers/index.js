import userReducer from './userReducer';
import teamMembersReducer from './teamMembersReducer';
import trainingSeriesReducer from './trainingSeriesReducer';
import postsReducer from './postsReducer';
import stripeReducer from './stripeReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	userReducer,
	teamMembersReducer,
	trainingSeriesReducer,
	postsReducer,
	stripeReducer,
});

export default rootReducer;
