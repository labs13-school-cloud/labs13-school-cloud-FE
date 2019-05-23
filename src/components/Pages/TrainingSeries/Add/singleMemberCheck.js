import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";

import { styles, MainWrapper } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";

function SingleMemberCheck({
  addMember,
  teamMember,
  handelAddComMethod,
  classes
}) {
  const [isUserSelected, setIsUserSelected] = useState(false);

  const [service, setService] = useState("Text");

  const changeService = service => {
    const serviceConversion = { Text: 1, Email: 2, Slack: 3 };
    handelAddComMethod(serviceConversion[service]);
    setService(service);
  };

  const collectIDs = () => {
    const ids = { team_member: teamMember.id };
    if (teamMember.manager_id) ids.manager = teamMember.manager_id;
    if (teamMember.mentor_id) ids.mentor = teamMember.mentor_id;
    return ids;
  };
  return (
    <MainWrapper>
      <div
        style={{ cursor: "pointer" }}
        onClick={e => {
          setIsUserSelected(!isUserSelected);
          addMember(collectIDs());
        }}
      >
        <Checkbox checked={isUserSelected} value="checkedB" color="primary" />
        {teamMember.first_name} {teamMember.last_name}
      </div>

      <RadioGroup
        aria-label="Service"
        name="select-service"
        className={classes.radioGroup}
        value={service}
        onChange={e => changeService(e.target.value)}
      >
        <FormControlLabel
          value="Text"
          control={<Radio />}
          label="Text Message"
          className={classes.radioItem}
        />
        <FormControlLabel
          value="Email"
          control={<Radio />}
          label="Email"
          disabled={!teamMember.email}
          className={classes.radioItem}
        />
        <FormControlLabel
          value="Slack"
          control={<Radio />}
          label="Slack"
          disabled={!teamMember.slack_uuid}
          className={classes.radioItem}
        />
      </RadioGroup>
    </MainWrapper>
  );
}

export default withStyles(styles)(SingleMemberCheck);
