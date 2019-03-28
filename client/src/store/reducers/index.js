import teamMembersReducer from "./teamMembersReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";
import postsReducer from './postsReducer';

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  teamMembersReducer,
  trainingSeriesReducer,
  postsReducer
});

export default rootReducer;
