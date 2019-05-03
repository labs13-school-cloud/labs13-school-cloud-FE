import React, { useEffect } from "react";
import qs from "query-string";
import axios from "axios";

function SlackCallback(props) {
  useEffect(() => {
    // componentDidMount
    const { search } = props.location;
    const code = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).code;
    const state = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).state;

    axios.post(`${process.env.REACT_APP_API}/api/slack/oauth`, { code });
  }, []);

  return <div>Authorizing Slack, please wait...</div>;
}

export default SlackCallback;
