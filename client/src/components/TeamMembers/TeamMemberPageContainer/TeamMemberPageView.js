import React from "react";

import { connect } from "react-redux";

import TeamMemberPage from "./TeamMemberPage";

import {
  editTeamMember,
  getTrainingSeries,
  getTeamMemberByID,
  deleteTeamMember
} from "../../../store/actions";

class TeamMemberPageView extends React.Component {
  componentDidMount() {
    this.props.getTeamMemberByID(this.props.match.params.id);
  }

  editTeamMember = (e, changes) => {
    e.preventDefault();
    this.props.editTeamMember(this.props.match.params.id, changes);
  };

  render() {
    return (
      <>
        {this.props.loadSuccess && (
          <TeamMemberPage
            teamMember={this.props.teamMember}
            urlId={this.props.match.params.id}
            editTeamMember={this.editTeamMember}
            deleteTeamMember={this.deleteTeamMember}
          />
        )}
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
  { getTeamMemberByID, editTeamMember, getTrainingSeries, deleteTeamMember }
)(TeamMemberPageView);
