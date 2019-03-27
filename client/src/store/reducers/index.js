import teamMemberReducer from "./teamMembersReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";
import postsReducer from './postsReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  teamMemberReducer,
  trainingSeriesReducer,
  postsReducer
});

export default rootReducer;
