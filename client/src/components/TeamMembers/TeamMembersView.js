// component to contain all the components related to team members
import React from 'react';

//API Dependency
import axios from 'axios';

class TeamMembersView extends React.Component {
  state = {
    users: [],
    profile: [],
    teamMembers: [],
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get(`${process.env.REACT_APP_API}/api/team-members`)
      .then(res => {
        console.log(res.data.teamMembers);
        this.setState({
          teamMembers: res.data.teamMembers,
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <p>Team Members View</p>
        {this.state.teamMembers.map(member => (
          <div key={member.teamMemberID}>
            <p>First Name: {member.firstName}</p>
            <p>Last Name: {member.lastName}</p>
            <p>Job: {member.jobDescription}</p>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phoneNumber}</p>
          </div>
        ))}
      </>
    );
  }
}

export default TeamMembersView;
