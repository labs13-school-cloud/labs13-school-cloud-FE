// parent component for app once logged in
import React from "react";
import { NavigationView } from "../Navigation";
import TeamMembersView from "../TeamMembers/TeamMembersView";

class Dashboard extends React.Component {
  state = {
    profile: {}
  };
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    console.log(userProfile, getProfile);
    if (!userProfile) {
      getProfile((err, profile) => {
        console.log(profile);
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    return (
      <>
        <NavigationView />
      </>
    );
  }
}

export default Dashboard;
