import userReducer from "./userReducer";
import teamMembersReducer from "./teamMembersReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";
import messagesReducer from "./messagesReducer";
import stripeReducer from "./stripeReducer";
import notificationsReducer from "./notificationsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer,
  teamMembersReducer,
  trainingSeriesReducer,
  messagesReducer,
  stripeReducer,
  notificationsReducer
});

export default rootReducer;
