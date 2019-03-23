// parent component for app once logged in
import React, { Children } from "react";
import { NavigationView } from "../Navigation";
import { Link } from "react-router-dom";
import TeamMembersView from "../TeamMembers/TeamMembersView";
import TrainingSeriesView from "../TrainingSeries/TrainingSeriesView";
import AppBar from "../AppBar/AppBar";
import styled from "styled-components";
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
        <AppBar />
        <DashboardContainer>
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
        </DashboardContainer>
      </>
    );
  }
}

const DashboardContainer = styled.div`
  margin: 100px 0;
`;

export default Dashboard;
