import React, { useState, useEffect } from "react";
import axios from "axios";

import history from "history.js";

function SlackCallback(props) {
  const [authFailed, setAuthFailed] = useState(false);
  const [code, setCode] = useState(null);

  useEffect(() => {
    if (authFailed) {
      setTimeout(() => {
        history.push("/home/profile");
      }, 2000);
    }
  }, [authFailed]);

  useEffect(() => {
    // componentDidMount
    const code = getQueryVariable("code");
    //const state = getQueryVariable("state");
    axios
      .post(`${process.env.REACT_APP_API}/api/slack/oauth`, {
        code
      })
      .then(res => {
        history.push("/home");
      })
      .catch(err => {
        setCode(err.response.status);
        setAuthFailed(true);
      });
  }, []);

  return (
    <>
      {!authFailed ? (
        <div>Authorizing Slack, please wait...</div>
      ) : (
        <div>Auth failed with code {code}, rerouting to profile...</div>
      )}
    </>
  );
}

function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

export default SlackCallback;
