import React, { Component } from "react";
import { Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { LandingPageView } from "./components/LandingPage";
import { TeamMembersView } from "./components/TeamMembers";
import Auth from "./Auth/Auth";

const auth = new Auth();

class App extends Component {
  handleAuthentication = ({ location }) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  };

  render() {
    return (
      <>
        <CssBaseline />
        <Route
          exact
          path='/'
          render={props => <LandingPageView {...props} auth={auth} />}
        />
        {/* Note from Leigh-Ann: This component will need to be restructured with proper routes, displaying training-series is a placeholder */}
        <Route
          path='/training-series'
          render={props => {
            this.handleAuthentication(props);
            return <TeamMembersView {...props} />;
          }}
        />
      </>
    );
  }
}

export default App;
