// component to contain all the components related to team members
import React from "react";

//API Dependency
import axios from "axios";
import TeamMembersList from "./TeamMembersList";

class TeamMembersView extends React.Component {
  state = {
    users: [],
    profile: [],
    teamMembers: []
  };

  componentDidMount() {
    // axios
    // 	// replace endpoint with team-members by user_ID
    // 	.get(`${process.env.REACT_APP_API}/api/team-members`)
    // 	.then(res => {
    // 		this.setState({
    // 			teamMembers: res.data.teamMembers,
    // 		});
    // 	})
    // 	.catch(err => console.log(err));
  }
  render() {
    return <TeamMembersList teamMembers={this.state.teamMembers} />;
  }
}

export default TeamMembersView;
