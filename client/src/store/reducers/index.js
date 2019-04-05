import userReducer from './userReducer';
import teamMembersReducer from './teamMembersReducer';
import trainingSeriesReducer from './trainingSeriesReducer';
import postsReducer from './postsReducer';
import stripeReducer from './stripeReducer';
import notificationsReducer from './notificationsReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userReducer,
  teamMembersReducer,
  trainingSeriesReducer,
  postsReducer,
  stripeReducer,
  notificationsReducer
});

export default rootReducer;
