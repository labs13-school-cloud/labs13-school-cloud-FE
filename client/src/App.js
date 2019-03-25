import React, { Component } from "react";

//Styling
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

//Components
import { LandingPageView } from "./components/LandingPage";
import { TeamMembersView } from "./components/TeamMembers";
import { Dashboard } from "./components/Dashboard";

import { login, logout, isLoggedIn } from "./Auth/Auth";

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Button onClick={() => login()} color='primary' variant='contained'>
          Register
        </Button>
      </>
    );
  }
}

export default App;
