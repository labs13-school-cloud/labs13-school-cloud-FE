// parent component for app once logged in
import React, { Children } from "react";
import { NavigationView } from "../Navigation";
import { Link } from "react-router-dom";
import TeamMembersView from "../TeamMembers/TeamMembersView";
import TrainingSeriesView from "../TrainingSeries/TrainingSeriesView";

class Dashboard extends React.Component {
  state = {
    tabValue: 0
  };

  // tracking the tab value in navigation.js
  changeTabValue = value => {
    this.setState({
      tabValue: value
    });
  };

  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    console.log(this.props);

    return (
      <>
        <NavigationView
          tabValue={this.state.tabValue}
          changeTabValue={this.changeTabValue}
        />
        {isAuthenticated() && (
          <>
            <h4>
              You are logged in! You can now view your{" "}
              <Link to="profile">profile area</Link>.
            </h4>
            <div>
              // Displays training series or team members based on which tab is
              selected
              {this.state.tabValue === 0 && <TrainingSeriesView />}
              {this.setState.tabValue === 1 && <TeamMembersView />}
            </div>
          </>
        )}
        {!isAuthenticated() && (
          <h4>
            You are not logged in! Please{" "}
            <a style={{ cursor: "pointer" }} onClick={this.login.bind(this)}>
              Log In
            </a>{" "}
            to continue.
          </h4>
        )}
      </>
    );
  }
}

export default Dashboard;
