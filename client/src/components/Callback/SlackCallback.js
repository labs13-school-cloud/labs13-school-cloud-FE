import React, { useEffect } from "react";
import qs from "query-string";
import axios from "axios";

function SlackCallback(props) {
  useEffect(() => {
    // componentDidMount
    async function getToken(code) {
      console.log("getting token");
      const query = `client_id=604670969987.618830021958&secret=3f5c8ca69b156e93b72e4039494324a6&code=${code}&redirect_uri=${`${
        process.env.REACT_APP_URL
      }/slack-callback}`}`;

      const token = await axios.get(
        `https://slack.com/api/oauth.access?${query}`
      );
      console.log("DSFKOLJ", token);
      return token;
    }
    const { search } = props.location;
    const code = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).code;
    const state = qs.parse(props.location.search, {
      ignoreQueryPrefix: true
    }).state;

    const token = getToken(code);
    //console.log(token);
  }, []);

  return <div>Authorizing Slack, please wait...</div>;
}

export default SlackCallback;
