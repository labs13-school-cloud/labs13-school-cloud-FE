import React from 'react';

//Routing
import {Redirect, Route, Router} from 'react-router-dom';

//Components
import App from './App';
import Home from './components/Dashboard/Dashboard';
import Profile from './components/Profile/profile';

//Callback
import Callback from './Callback/callback';

//History
import history from './history';

//Authentication
import Auth from './Auth/Auth';

//Creates a new Authentication class
const auth = new Auth();

//Handles authentication for routes
const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};
//Use this for rendering all of our components
export const makeMainRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          exact
          path="/"
          render={props => <App auth={auth} {...props} />}
        />
        <Route path="/home" render={props => <Home auth={auth} {...props} />} />
        <Route
          path="/profile"
          render={props =>
            !auth.isAuthenticated() ? (
              <Redirect to="/home" />
            ) : (
              <Profile auth={auth} {...props} />
            )
          }
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
