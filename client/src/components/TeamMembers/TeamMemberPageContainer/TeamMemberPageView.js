import React from "react";

import { connect } from "react-redux";

import TeamMemberPage from "./TeamMemberPage";

import {
  editTeamMember,
  getTrainingSeries,
  getTeamMemberByID
} from "../../../store/actions";

class TeamMemberPageView extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <>
        {" "}
        <TeamMemberPage />{" "}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEditing: state.teamMembersReducer.status.isEditing,
    isLoading: state.teamMembersReducer.status.isLoading,
    loadSuccess: state.teamMembersReducer.status.loadSuccess,
    loadFailed: state.teamMembersReducer.status.loadFailed,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    teamMember: state.teamMembersReducer.teamMember
  };
};

export default connect(
  mapStateToProps,
  {}
)(TeamMemberPageView);
