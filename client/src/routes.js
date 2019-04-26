import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

//Routing
import { Route, Router } from "react-router-dom";

//Components
import App from './App';
import Pricing from './components/LandingPage/Pricing';
import Team from './components/LandingPage/Team';
import DashboardView from './components/Dashboard/DashboardView';

//Callback
import Callback from "./components/Callback/Callback.js";

//Auth
import Authenticate from "./components/Misc/authenticate/authenticate.js";

//History
import history from "./history.js";

import rootReducer from "./store/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//Use this for rendering all of our components
export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/pricing" component={Pricing} />
            <Route path="/team" component={Team} />
            <Route path="/home" component={Authenticate(DashboardView)} />
            <Route path="/callback" component={Callback} />
          </div>
        </>
      </Router>
    </Provider>
  );
};
