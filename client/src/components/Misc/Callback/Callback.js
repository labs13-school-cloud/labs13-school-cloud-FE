import React, { useEffect } from "react";

//Loading SVG that gets displayed
import Progress from "components/UI/Progress/ProgressCircle";
import { style } from "./styles.js";

//Auth
import { setAccessToken, setIdToken, getUserProfile } from "Auth/Auth";

function Callback({ history }) {
  useEffect(() => {
    // componentDidMount
    setAccessToken();
    setIdToken();
    getUserProfile(() => {
      history.push("/home");
    });
  }, [history]);

  //Customized styling

  return (
    <div style={style}>
      <Progress />
    </div>
  );
}

export default Callback;
