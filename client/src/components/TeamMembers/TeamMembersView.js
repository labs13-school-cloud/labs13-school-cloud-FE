// component to contain all the components related to team members

import React from 'react';

//API Dependency
import axios from 'axios';
import TeamMembersList from './TeamMembersList';
import styled from 'styled-components';

import { connect } from 'react-redux';
import {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
} from '../../store/actions';

import TeamMemberModal from '../Modals/TeamMemberModal';

class TeamMembersView extends React.Component {
  state = {
    users: [],
    profile: [],
    teamMembers: [],
  };

  componentDidMount() {
    this.props.getTeamMembers(this.props.userId);
    this.setState({
      teamMembers: this.props.teamMembers,
    });
  }

  deleteMember = (e, id) => {
    e.preventDefault();
    this.props.deleteTeamMember(id);
  };

  render() {
    return (
      <TeamMembersContainer>
        <TeamMemberModal
          userId={this.props.userId}
          addTeamMember={this.props.addTeamMember}
        />
        <TeamMembersList
          teamMembers={this.props.teamMembers}
          deleteTeamMember={this.deleteMember}
        />
      </TeamMembersContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.teamMembersReducer.status.isLoading,
    loadFailed: state.teamMembersReducer.status.loadFailed,
    isAdding: state.teamMembersReducer.status.isAdding,
    addSuccess: state.teamMembersReducer.status.addSuccess,
    addFailed: state.teamMembersReducer.status.addFailed,
    teamMembers: state.teamMembersReducer.teamMembers,
  };
};

export default connect(
  mapStateToProps,
  { getTeamMembers, addTeamMember, deleteTeamMember }
)(TeamMembersView);


const TeamMembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  border: 1px solid black;
`;