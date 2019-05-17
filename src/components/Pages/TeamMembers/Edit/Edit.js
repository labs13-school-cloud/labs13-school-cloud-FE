import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import EditTeamMember from "../Add/";
import NotificationsCard from "components/Pages/Notifications/Card/";
import TeamMemberNotifications from "components/Pages/Notifications/Card/TeamMember";
import Grid from "@material-ui/core/Grid";

import {
  editTeamMember,
  getTrainingSeries,
  getTeamMemberByID
} from "store/actions";

import { EditWrapper } from "./styles.js";

function Edit(props) {
  const {
    match,
    user_id,
    getTeamMemberByID: getTMFromProps,
    getTrainingSeries: getTSFromProps
  } = props;

  useEffect(() => {
    getTMFromProps(match.params.id);
    getTSFromProps(user_id);
  }, [getTMFromProps, getTSFromProps, match, user_id]);
  const [secretMsg, setSecretMsg] = useState("");

  const sendMsgMeow = () => {
    const { first_name, slack_uuid } = props.teamMember;
    const notification = {
      first_name,
      subject: "Slack Test",
      body: secretMsg,
      slack_uuid,
      team_member_id: props.teamMember.id
    };
    const url = `${process.env.REACT_APP_API}/api/slack/sendMessageNow`;
    axios.post(url, { notification });
    setSecretMsg("");
  };
  const buttonText = props.teamMember.slack_uuid
    ? "Send Msg Meow"
    : "No Slack ID";
  return (
    <EditWrapper>
      <div style={{ display: "none" }}>
        <input value={secretMsg} onChange={e => setSecretMsg(e.target.value)} />
        <button
          disabled={!props.teamMember.slack_uuid}
          onClick={() => sendMsgMeow()}
        >
          {buttonText}
        </button>
      </div>

      <Grid item xs={12} lg={5}>
        <EditTeamMember user_id={user_id} teamMember={props.teamMember} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <NotificationsCard
          maxWidth="768px"
          limit={10}
          List={TeamMemberNotifications}
          member_id={match.params.id}
        />
      </Grid>
    </EditWrapper>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  teamMember: state.teamMembersReducer.teamMember
});

export default connect(
  mapStateToProps,
  { getTeamMemberByID, editTeamMember, getTrainingSeries }
)(Edit);
