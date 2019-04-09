import React, { Component } from "react";

//State Management
import { connect } from "react-redux";
import { addTeamMemberToTrainingSeries } from "../../../store/actions/";
import AddMember from "./AddMember";

// I need to bring in the user ID and the training series ID

class AddMembersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trainingSeriesID: "",
      startDate: "",
      selectedTeamMembers: []
    };
  }

  componentDidMount() {
    console.log(this.props);
    let d = new Date();
    let formattedDate = d.toISOString();
    this.setState({
      trainingSeriesID: this.props.location.state.trainingSeriesID,
      startDate: formattedDate
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isEditing) {
      this.setState({ email: this.props.email, name: this.props.name });
    }
  }

  handler = {
    handleDateChange: date => {
      let d = date;
      this.setState({
        startDate: d.toISOString()
      });
    },
    handleSubmit: e => {
      e.preventDefault();
      const data = {
        startDate: this.state.startDate,
        trainingSeriesID: this.state.trainingSeriesID,
        assignments: this.state.selectedTeamMembers
      };
      this.props.addTeamMemberToTrainingSeries(data);
    },
    handleChecked: id => {
      if (!this.state.selectedTeamMembers.includes(id)) {
        this.setState({
          ...this.state,
          selectedTeamMembers: [...this.state.selectedTeamMembers, id]
        });
      } else {
        let filteredTeamMembers = this.state.selectedTeamMembers.filter(
          member => member !== id
        );
        this.setState({
          ...this.state,
          selectedTeamMembers: filteredTeamMembers
        });
      }
    },
    handleChange: name => event => {
      this.setState({ [name]: event.target.value });
    }
  };
  render() {
    console.log(this.state);
    return (
      <AddMember
        startDate={this.state.startDate}
        teamMembers={this.props.teamMembers}
        handler={this.handler}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    isLoading: state.userReducer.isLoading,
    teamMembers: state.teamMembersReducer.teamMembers
  };
};

export default connect(
  mapStateToProps,
  {
    addTeamMemberToTrainingSeries
  }
)(AddMembersView);
