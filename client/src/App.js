import React, { Component } from "react";

//Styling
import CssBaseline from "@material-ui/core/CssBaseline";

//Components
import LandingPageView from "./components/LandingPage/LandingPageView";

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <LandingPageView />
      </>
    );
  }
}

export default App;
