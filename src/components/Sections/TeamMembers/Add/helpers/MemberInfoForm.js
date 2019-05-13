import React from "react";
import NumberFormat from "react-number-format";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { styles, MemberInfoContainer } from "../styles.js";

function MemberInfoForm({ classes, state, updateMember }) {
  return (
    <>
      <MemberInfoContainer>
        <TextField
          autoFocus={true}
          id="standard-name"
          label="First Name"
          className={classes.textField}
          value={state.teamMember.first_name}
          onChange={e => updateMember("first_name", e.target.value)}
          margin="normal"
          required
        />
        <TextField
          id="standard-name"
          label="Last Name"
          className={classes.textField}
          value={state.teamMember.last_name}
          onChange={e => updateMember("last_name", e.target.value)}
          margin="normal"
          required
        />
        <TextField
          id="standard-name"
          label="Job Description"
          className={classes.textField}
          value={state.teamMember.job_description}
          onChange={e => updateMember("job_description", e.target.value)}
          margin="normal"
          required
        />
      </MemberInfoContainer>
      <MemberInfoContainer>
        <NumberFormat
          format="+1 (###) ###-####"
          // mask='_'
          type="tel"
          inputProps={{ minLength: 10 }}
          id="standard-name"
          label="Phone Number"
          customInput={TextField}
          className={classes.textField}
          value={state.teamMember.phone_number}
          onChange={e => updateMember("phone_number", e.target.value)}
          margin="normal"
          required
        />
        <TextField
          id="standard-name"
          label="Email"
          type="email"
          className={classes.textField}
          value={state.teamMember.email}
          onChange={e => updateMember("email", e.target.value)}
          margin="normal"
        />
      </MemberInfoContainer>
    </>
  );
}

export default withStyles(styles)(MemberInfoForm);
