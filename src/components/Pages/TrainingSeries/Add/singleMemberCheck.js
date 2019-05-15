import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default function SingleMemberCheck({ addMember, teamMember }) {
  const [checked, setChecked] = useState(false);
  const collectIDs = () => {
    const ids = { team_member: teamMember.id };
    if (teamMember.manager_id) ids.manager = teamMember.manager_id;
    if (teamMember.mentor_id) ids.mentor = teamMember.mentor_id;
    return ids;
  };
  return (
    <div>
      <p>
        {teamMember.first_name} {teamMember.last_name}
        <Checkbox
          checked={checked}
          value="checkedB"
          color="primary"
          onChange={e => {
            setChecked(!checked);
            addMember(collectIDs());
          }}
        />
      </p>
    </div>
  );
}
