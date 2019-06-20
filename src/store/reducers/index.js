import userReducer from "./userReducer";
import trainingSeriesReducer from "./trainingSeriesReducer";
import messagesReducer from "./messagesReducer";
import stripeReducer from "./stripeReducer";
import notificationsReducer from "./notificationsReducer";
import responsesReducer from "./responsesReducer";
import classesReducer from "./classesReducer";
import volunteerReducer from "./volunteerReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer,
  trainingSeriesReducer,
  classesReducer,
  messagesReducer,
  stripeReducer,
  notificationsReducer,
  responsesReducer,
  volunteerReducer
});

export default rootReducer;
