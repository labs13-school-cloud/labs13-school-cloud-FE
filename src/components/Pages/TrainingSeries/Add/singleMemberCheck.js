import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

export default function SingleMemberCheck({
  addMember,
  teamMember,
  handelAddComMethod
}) {
  const [checked, setChecked] = useState(false);

  const [textChecked, setTextChecked] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [slackChecked, setSlackChecked] = useState(false);

  const collectIDs = () => {
    const ids = { team_member: teamMember.id };
    if (teamMember.manager_id) ids.manager = teamMember.manager_id;
    if (teamMember.mentor_id) ids.mentor = teamMember.mentor_id;
    return ids;
  };
  return (
    <MainWrapper>
      <p
        style={{ cursor: "pointer" }}
        onClick={e => {
          setChecked(!checked);
          addMember(collectIDs());
        }}
      >
        <Checkbox checked={checked} value="checkedB" color="primary" />
        {teamMember.first_name} {teamMember.last_name}
      </p>
      <Options>
        {teamMember.phone_number && (
          <div>
            text:{" "}
            <Checkbox
              checked={textChecked}
              value="checkedB"
              color="secondary"
              onChange={e => {
                //These check boxes will send an object up to AddMemberToTrainingSeries with the name of the team member plus their preffered method of communication.
                if (textChecked === true) {
                  setTextChecked(false);
                } else {
                  setSlackChecked(false);
                  setEmailChecked(false);
                  setTextChecked(true);

                  const method = 1; //1 is the equvilant of saying you want this to send via twillio
                  handelAddComMethod(teamMember.id, method);
                }
              }}
            />
          </div>
        )}

        {teamMember.email && (
          <div>
            email:{" "}
            <Checkbox
              checked={emailChecked}
              value="checkedB"
              color="secondary"
              onChange={e => {
                if (emailChecked === true) {
                  setEmailChecked(false);
                } else {
                  setSlackChecked(false);
                  setEmailChecked(true);
                  setTextChecked(false);

                  const method = 2; //2 is the same as saying you want this to send via sendgrid
                  handelAddComMethod(teamMember.id, method);
                }
              }}
            />
          </div>
        )}

        {teamMember.slack_uuid && (
          <div>
            slack:{" "}
            <Checkbox
              checked={slackChecked}
              value="checkedB"
              color="secondary"
              onChange={e => {
                if (slackChecked === true) {
                  setSlackChecked(false);
                } else {
                  setSlackChecked(true);
                  setEmailChecked(false);
                  setTextChecked(false);

                  const method = 3; //3 is the same as saying that you want this to send via slack
                  handelAddComMethod(teamMember.id, method);
                }
              }}
            />
          </div>
        )}
      </Options>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid black;
  margin-bottom: 5px;
`;

const Options = styled.div`
  display: flex;
  color: rgba(0, 0, 0, 0.4);
  margin: 0;
`;
