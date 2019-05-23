import React, { useReducer, useEffect } from "react";
import { connect } from "react-redux";

import {
  addTeamMember,
  editTeamMember,
  getTeamMembers,
  getAllMessages,
  getNotifications,
  addNotification,
  deleteNotification
} from "store/actions";
import history from "history.js";

import { initialState, reducer } from "./reducer";
import MemberInfoForm from "./helpers/MemberInfoForm.js";
import Relationships from "./helpers/Relationships.js";
import SelectSlackID from "./helpers/SelectSlackID.js";
import Buttons from "./helpers/Buttons.js";
import phoneNumberTest from "./helpers/testPhoneNumber.js";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";
import updateNotifications from "./helpers/updateNotifications.js";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { styles, MainContainer, MemberInfoContainer } from "./styles.js";

function Add(props) {
  const {
    addTeamMember,
    editTeamMember,
    getTeamMembers,
    getAllMessages,
    getNotifications,
    addNotification,
    deleteNotification,
    user_id,
    teamMember,
    teamMembers,
    notifications,
    messages
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // CDM
    getAllMessages();
    getNotifications();
    getTeamMembers();
    dispatch({ type: "UPDATE_MEMBER", key: "user_id", payload: user_id });
    if (teamMember) {
      const manager_id = teamMember.manager_id ? teamMember.manager_id : "";
      const mentor_id = teamMember.mentor_id ? teamMember.mentor_id : "";
      dispatch({
        type: "EDITING_MEMBER",
        payload: { ...teamMember, manager_id, mentor_id }
      });
    }
  }, [
    getAllMessages,
    getNotifications,
    getTeamMembers,
    user_id,
    dispatch,
    teamMember
  ]);

  useEffect(() => {
    // Checks input conditions.  If all required field conditions are met, Add Member button is activated
    const payload = !(
      state.teamMember.first_name &&
      state.teamMember.last_name &&
      state.teamMember.job_description &&
      !phoneNumberTest(state.teamMember.phone_number)
    );
    dispatch({ type: "UPDATE_DISABLED", payload });
  }, [state.teamMember]);

  const updateMember = (key, value) => {
    dispatch({ type: "UPDATE_MEMBER", key, payload: value });
  };

  const editExistingMember = e => {
    e.preventDefault();
    const updateNotifObj = {
      state,
      teamMembers,
      notifications,
      messages,
      deleteNotification,
      addNotification
    };
    updateNotifications(updateNotifObj);
    editTeamMember(state.teamMember);
    dispatch({ type: "DISPLAY_SNACKBAR", payload: true });
    history.push("/home");
  };

  const addNewTeamMember = e => {
    e.preventDefault();
    const { teamMember } = state;
    if (teamMember.manager_id === "") {
      teamMember.manager_id = null;
    }
    if (teamMember.mentor_id === "") {
      teamMember.mentor_id = null;
    }
    addTeamMember(state.teamMember);
    dispatch({ type: "TOGGLE_ROUTING" });
    dispatch({ type: "DISPLAY_SNACKBAR", payload: true });
    history.push("/home");
  };

  const { classes } = props;
  return (
    <MainContainer
      style={{ position: "relative" }}
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
    >
      <InfoPopup
        left="10px"
        style={{ position: "relative" }}
        popOverText={
          <p>
            On this page you can add a new Team Member! If you've already got
            some Team Members, you can assign them as a mentor or a manager.
            Whenever a team member is assigned to a training series, you can
            choose to send their mentor or managers notifications as well. If
            you've set up Slack in your preferences, you can choose to assign
            this team member to their slack account.
          </p>
        }
      />
      <form
        className={classes.form}
        onSubmit={e =>
          teamMember ? editExistingMember(e) : addNewTeamMember(e)
        }
      >
        <Paper className={classes.paper}>
          <Typography variant="title">
            {teamMember ? "Edit Team Member" : "Add New Team Member"}
          </Typography>
          <Divider className={classes.divider} />
          <MemberInfoContainer>
            <MemberInfoForm
              state={state}
              updateMember={updateMember}
              classes={classes}
            />
            <SelectSlackID
              state={state}
              updateMember={updateMember}
              dispatch={dispatch}
            />
            <Relationships
              state={state}
              dispatch={dispatch}
              teamMembers={teamMembers}
            />
          </MemberInfoContainer>

          <Buttons
            state={state}
            classes={classes}
            status={teamMember ? "edit" : "add"}
          />
        </Paper>
      </form>
    </MainContainer>
  );
}

const mapStateToProps = state => ({
  messages: state.messagesReducer.messages,
  notifications: state.notificationsReducer.notifications,
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  {
    addTeamMember,
    editTeamMember,
    getTeamMembers,
    getAllMessages,
    getNotifications,
    addNotification,
    deleteNotification
  }
)(withStyles(styles)(Add));
