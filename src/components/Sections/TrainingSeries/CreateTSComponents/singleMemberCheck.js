import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";

export default function SingleMemberCheck(props) {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <p>
        {props.teamMember.first_name} {props.teamMember.last_name}
        <Checkbox
          checked={checked}
          value="checkedB"
          color="primary"
          onChange={e => {
            setChecked(!checked);
          }}
        />
      </p>
    </div>
  );
}
