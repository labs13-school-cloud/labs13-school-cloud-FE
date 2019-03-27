import teamMembersReducer from "./teamMembersReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  teamMembersReducer,
  trainingSeriesReducer
});

export default rootReducer;
