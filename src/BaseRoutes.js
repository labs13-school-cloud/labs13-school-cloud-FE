import React from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import LandingPage from "components/Pages/LandingPage/LandingPage/";
import Pricing from "components/Pages/LandingPage/Pricing";
import Team from "components/Pages/LandingPage/Team";
import LoadDashboard from "components/Pages/Dashboard/Loader/";

import Callback from "components/Misc/Callback/Callback.js";
import SlackCallback from "components/Misc/Callback/SlackCallback.js";
import authenticate from "components/Misc/authenticate/authenticate.js";
import rootReducer from "store/reducers";

import history from "./history.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//Use this for rendering all of our components
function Routes() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/team" component={Team} />
        <Route path="/home" component={authenticate(LoadDashboard)} />
        <Route path="/callback" component={Callback} />
        <Route path="/slack-callback" component={SlackCallback} />
      </Router>
    </Provider>
  );
}

export default Routes;
