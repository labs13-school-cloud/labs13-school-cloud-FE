import React from 'react';

//Routing
import { Route, Router } from 'react-router-dom';

//Components
import App from './App';
import Pricing from './components/LandingPage/Pricing';
import Team from './components/LandingPage/Team';
import DashboardView from './components/Dashboard/DashboardView';
    //workbench components
    import TeamMembersTab from './components/TeamMembers/TeamMembersTab.js';

//Callback
import Callback from './components/Callback/callback';

//Auth
import Authenticate from './components/authenticate/authenticate';

//History
import history from './history';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers';

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
