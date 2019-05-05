import React, { useEffect } from "react";

//Loading SVG that gets displayed
import Progress from "../Progress/ProgressCircle";
import { style } from './styles.js';

//Auth
import { setAccessToken, setIdToken, getUserProfile } from "../../../Auth/Auth";

function Callback(props) {
  useEffect(() => {
    // componentDidMount
    setAccessToken();
    setIdToken();
    getUserProfile(() => {
      props.history.push("/home");
    });
  }, []);

  //Customized styling


  return (
    <div style={style}>
      <Progress />
    </div>
  );
}

export default Callback;
