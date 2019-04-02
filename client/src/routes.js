import React from "react";

//Routing
import { Route, Router } from "react-router-dom";

//Components
import App from "./App";
import DashboardView from "./components/Dashboard/DashboardView";
import ProfileView from "./components/Profile/ProfileView";
import AppBar from "./components/AppBar/AppBar";
import TeamMemberPage from "./components/TeamMembers/TeamMemberPage";

//Callback
import Callback from "./components/Callback/callback";

//History
import history from "./history";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./store/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

//Use this for rendering all of our components
export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          {/* <AppBar /> */}
          <div>
            <Route exact path="/" component={App} />
            <Route path="/home" component={DashboardView} />
            {/* <Route path='/profile' component={ProfileView} />
            <Route path='/team-member/:id' component={TeamMemberPage} /> */}
            <Route path="/callback" component={Callback} />
          </div>
        </>
      </Router>
    </Provider>
  );
};
