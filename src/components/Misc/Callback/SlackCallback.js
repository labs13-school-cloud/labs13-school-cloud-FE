import React, { useEffect } from "react";
import axios from "axios";

function SlackCallback(props) {
  useEffect(() => {
    // componentDidMount;
    console.log("CDM");
    const code = getQueryVariable("code");
    //const state = getQueryVariable("state");
    axios.post(`${process.env.REACT_APP_API}/api/slack/oauth`, { code });
  }, []);

  return <div>Authorizing Slack, please wait...</div>;
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
  console.log("Query variable %s not found", variable);
}

export default SlackCallback;
