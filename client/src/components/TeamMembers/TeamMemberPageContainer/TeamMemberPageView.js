import React from "react";

//Components
import TeamMemberPage from "./TeamMemberPage";
import Snackbar from "../../Snackbar/Snackbar";

//Redux
import {connect} from "react-redux";
import {
  editTeamMember,
  getTrainingSeries,
  getTeamMemberByID,
  deleteTeamMember,
} from "../../../store/actions";

class TeamMemberPageView extends React.Component {
  state = {
    displaySnackbar: false,
  };
  componentDidMount() {
    this.props.getTeamMemberByID(this.props.match.params.id);
    this.props.getTrainingSeries(this.props.userId);
    if (this.props.location.state) {
      this.setState({
        displaySnackbar: this.props.location.state.success,
      });
    }
    this.resetHistory();
  }
  resetHistory = () => {
    this.props.history.replace({
      state: null,
    });
  };

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
  };

  renderTeamMemberPage = () => {
    if (
      this.props.loadSuccess &&
      Object.keys(this.props.teamMember).length !== 0
    ) {
      return (
        <TeamMemberPage
          teamMember={this.props.teamMember}
          urlId={this.props.match.params.id}
          editTeamMember={this.editTeamMember}
          deleteTeamMember={this.deleteTeamMember}
          userId={this.props.userId}
          history={this.props.history}
        />
      );
    }
  };

  render() {
    return (
      <>
        {this.state.displaySnackbar && (
          <>
            <Snackbar
              message="Your team member has been successfully added."
              type="success"
            />
          </>
        )}
        {this.renderTeamMemberPage()}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isEditing: state.teamMembersReducer.status.isEditing,
    isLoading: state.trainingSeriesReducer.isLoading,
    loadSuccess: state.teamMembersReducer.status.loadSuccess,
    loadFailed: state.teamMembersReducer.status.loadFailed,
    deleteSuccess: state.teamMembersReducer.status.deleteSuccess,
    isDeleting: state.teamMembersReducer.status.isDeleting,
    isAssigning: state.teamMembersReducer.status.isAssigning,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    teamMember: state.teamMembersReducer.teamMember,
  };
};

export default connect(
  mapStateToProps,
  {getTeamMemberByID, editTeamMember, getTrainingSeries, deleteTeamMember}
)(TeamMemberPageView);
