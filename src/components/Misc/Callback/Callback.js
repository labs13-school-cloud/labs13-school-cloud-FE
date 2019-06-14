import React, { useEffect } from "react";

//Loading SVG that gets displayed
import Progress from "components/UI/Progress/ProgressCircle";
import { style } from "./styles.js";

//Auth
import { getUserProfile } from "Auth/Auth";
// * if deprecated functions are needed please add "setAccessToken" and "setIdToken" to above import

function Callback({ history }) {
  useEffect(() => {
    // componentDidMount
    // ! Deprecated in favor of letting the AuthService take care of setting the access_token and id_token
    // setAccessToken();
    // setIdToken();
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
