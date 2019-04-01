import React, { Component } from "react";

//Styling
import CssBaseline from "@material-ui/core/CssBaseline";
import styled from "styled-components";
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
