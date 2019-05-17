import React, { useEffect } from "react";
import axios from "axios";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { withStyles } from "@material-ui/core/styles";

import { styles } from "../styles.js";

function SelectSlackID({ updateMember, state, classes, dispatch }) {
  useEffect(() => {
    async function getSlackUsers() {
      const url = `${process.env.REACT_APP_API}/api/slack/`;
      try {
        const res = await axios.get(url);
        dispatch({ type: "UPDATE_SLACK_USERS", payload: res.data });
      } catch (err) {
        if (err.response.status === 404) {
          dispatch({ type: "SLACK_ERROR", payload: "NO TOKEN" });
        }
      }
    }
    getSlackUsers();
  }, []);

  const title =
    state.slackError === "NO TOKEN" ? "AUTHORIZE SLACK" : "Slack User";
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={`slack-simple`}>{title}</InputLabel>
      <Select
        disabled={state.slackError}
        value={state.teamMember.slack_uuid}
        onChange={e => updateMember("slack_uuid", e.target.value)}
        inputProps={{
          name: `slack`,
          id: `slack-simple`
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {state.slackUsers &&
          state.slackUsers
            .filter(
              user =>
                user.id !== "USLACKBOT" &&
                user.real_name.toLowerCase() !== "Training Bot".toLowerCase() &&
                user.real_name.toLowerCase() !== "Training-Bot".toLowerCase()
            )
            .map(user => (
              <MenuItem key={user.id} value={user.id}>
                {user.real_name}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}

export default withStyles(styles)(SelectSlackID);
