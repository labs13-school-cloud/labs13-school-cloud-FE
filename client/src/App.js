/*
This app is using Absolute Paths so before it will work, there must be an
environmental variable NODE_PATH set to src/.  So if you are getting error
messages that certain files cannot be found, then inside the "client" folder,
create a file called ".env" and paste this into it and save:
NODE_PATH=src/

Resource:
https://medium.com/@ktruong008/absolute-imports-with-create-react-app-4338fbca7e3d
*/

import React from "react";

//Styling
import CssBaseline from "@material-ui/core/CssBaseline";

//Components
import LandingPageView from "components/LandingPage/LandingPageView/";

function App() {
  return (
    <>
      <CssBaseline />
      <LandingPageView />
    </>
  );
}

export default App;
