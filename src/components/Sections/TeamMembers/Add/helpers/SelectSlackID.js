import React from "react";

//import { MemberInfoContainer } from "../styles.js";

function SelectSlackID({ updateMember, state }) {
  return (
    <>
      <div>Select Slack User:</div>
      <div>
        <select
          value={state.teamMember.slack_uuid}
          onChange={e => updateMember("slack_uuid", e.target.value)}
        >
          {/*<option value="">None</option>*/}
          {state.slackUsers &&
            state.slackUsers
              .filter(
                user =>
                  user.id !== "USLACKBOT" &&
                  user.real_name.toLowerCase() !==
                    "Training Bot".toLowerCase() &&
                  user.real_name.toLowerCase() !== "Training-Bot".toLowerCase()
              )
              .map(user => (
                <option key={user.id} value={user.id}>
                  {user.real_name}
                </option>
              ))}
        </select>
      </div>
    </>
  );
}

export default SelectSlackID;
