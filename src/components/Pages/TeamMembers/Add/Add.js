import React, { useReducer, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { addTeamMember, getTeamMembers } from "store/actions";
import { initialState, reducer } from "./reducer";
import MemberInfoForm from "./helpers/MemberInfoForm.js";
import Relationships from "./helpers/Relationships.js";
import SelectSlackID from "./helpers/SelectSlackID.js";
import AddButtons from "./helpers/AddButtons.js";
import EditButtons from "./helpers/EditButtons.js";

import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { styles, MainContainer } from "./styles.js";

function Add(props) {
  const {
    getTeamMembers: getTeamMembersFromProps,
    user_id,
    teamMember
  } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getSlackUsers() {
      const url = `${process.env.REACT_APP_API}/api/slack/`;
      const { data } = await axios.get(url);
      dispatch({ type: "UPDATE_SLACK_USERS", payload: data });
    }
    getSlackUsers();
    getTeamMembersFromProps(user_id);
    dispatch({ type: "UPDATE_MEMBER", key: "user_id", payload: user_id });
    if (teamMember) {
      dispatch({ type: "EDITING_MEMBER", payload: teamMember });
    }
  }, [dispatch, getTeamMembersFromProps, user_id, teamMember]);

  useEffect(() => {
    const phoneNumberTest = () => {
      return (
        /^$/gm.test(state.teamMember.phone_number) === true ||
        (/\+1 \(\d{0}/gm.test(state.teamMember.phone_number) === true &&
          /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\S*$/gm.test(
            state.teamMember.phone_number
          ) === false)
      );
    };
    // Checks input conditions.  If all required field conditions are met, Add Member button is activated
    const { first_name, last_name, job_description } = state.teamMember;
    console.log("STATE", state);
    const payload = !(
      first_name.length &&
      last_name.length &&
      job_description.length &&
      !phoneNumberTest()
    );
    dispatch({ type: "UPDATE_DISABLED", payload });
  }, [state]);

  const updateMember = (key, value) => {
    dispatch({ type: "UPDATE_MEMBER", key, payload: value });
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

    props.addTeamMember(state.teamMember);
    dispatch({ type: "TOGGLE_ROUTING" });
  };

  const { classes } = props;
  return (
    <MainContainer style={{ position: "relative" }}>
      <InfoPopup
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
      <form className={classes.form} onSubmit={e => addNewTeamMember(e)}>
        <Paper className={classes.paper}>
          <Typography variant="title">
            {teamMember ? "Edit Team Member" : "Add New Team Member"}
          </Typography>{" "}
          <Divider className={classes.divider} />
          <MemberInfoForm
            state={state}
            updateMember={updateMember}
            classes={classes}
          />
          <Relationships
            state={state}
            dispatch={dispatch}
            teamMembers={props.teamMembers}
          />
          <SelectSlackID state={state} updateMember={updateMember} />
          {teamMember ? (
            <EditButtons state={state} />
          ) : (
            <AddButtons
              state={state}
              classes={classes}
              history={props.history}
            />
          )}
        </Paper>
      </form>
    </MainContainer>
  );
}

const mapStateToProps = state => ({
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  { addTeamMember, getTeamMembers }
)(withStyles(styles)(Add));
