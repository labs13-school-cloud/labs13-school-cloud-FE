import teamMemberReducer from "./teamMembersReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  teamMemberReducer,
  trainingSeriesReducer
});

export default rootReducer;
