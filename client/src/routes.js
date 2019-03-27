import React from 'react';

//Routing
import { Route, Router } from 'react-router-dom';

//Components
import App from './App';
import Dashboard from './components/Dashboard/Dashboard';
import ProfileView from './components/Profile/ProfileView';

//Callback
import Callback from './components/Callback/callback';

//History
import history from './history';

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
<<<<<<< HEAD
	return (
		<Router history={history}>
			<div>
				<Route exact path="/" component={App} />
				<Route path="/home" component={Dashboard} />
				<Route path="/profile" component={ProfileView} />
				<Route path="/callback" component={Callback} />
			</div>
		</Router>
	);
=======
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/" component={App} />
          <Route path="/home" component={Dashboard} />
          <Route path="/profile" component={ProfileView} />
          <Route path="/callback" component={Callback} />
        </div>
      </Router>
    </Provider>
  );
>>>>>>> b3fb7c0a61ffe196a47f5d8a93e999d45fd88d7a
};
