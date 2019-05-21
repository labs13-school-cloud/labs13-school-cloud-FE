import React from "react";
import styled from "styled-components";

import DeleteModal from "components/UI/Modals/deleteModal";
import NotificationWidget from "components/UI/Snackbar/SnackBarTeamMember.js";

function EditButtons(props) {
  const { state } = props;

  return (
    <ButtonContainer>
      <NotificationWidget
        disabled={state.addDisabled}
        teamMember={state.teamMember}
        type="success"
        submitType="edit"
      />
      <DeleteModal
        deleteType="inTeamMemberPage"
        teamMemberId={state.teamMember.id}
        user_id={state.teamMember.user_id}
        displayType="button"
      />
    </ButtonContainer>
  );
}

export default EditButtons;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
