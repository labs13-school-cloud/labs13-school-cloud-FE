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
    this.props.getTrainingSeries(this.props.userId);
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isDeleting !== this.props.isDeleting) {
  //     console.log("PREV PROPS");
  //     setTimeout(() => {
  //       this.props.history.push("/home");
  //     }, 1000);
  //   }
  // }

  editTeamMember = (e, changes) => {
    e.preventDefault();

    this.props.editTeamMember(this.props.match.params.id, changes);
  };

  deleteTeamMember = async e => {
    e.preventDefault();
    this.props.deleteTeamMember(this.props.match.params.id);

    setTimeout(() => {
      this.props.history.push("/home");
    }, 400);

    // try {
    //   await this.props.deleteTeamMember(this.props.match.params.id);
    //   console.log(this.props.deleteSuccess);
    //   if (!this.props.isDeleting) {
    //     this.props.history.push("/home");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    // setTimeout(() => {
    //   this.props.history.goBack();
    // }, 1000);
  };

  render() {
    console.log("IS DELETING", this.props.isDeleting);
    console.log("PROPS ON TMPV", this.props);
    return (
      <>
        {this.props.loadSuccess && (
          <TeamMemberPage
            teamMember={this.props.teamMember}
            urlId={this.props.match.params.id}
            editTeamMember={this.editTeamMember}
            deleteTeamMember={this.deleteTeamMember}
            userId={this.props.userId}
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
    deleteSuccess: state.teamMembersReducer.status.deleteSuccess,
    isDeleting: state.teamMembersReducer.status.isDeleting,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    teamMember: state.teamMembersReducer.teamMember
  };
};

export default connect(
  mapStateToProps,
  { getTeamMemberByID, editTeamMember, getTrainingSeries, deleteTeamMember }
)(TeamMemberPageView);
