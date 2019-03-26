// parent component for app once logged in
import React, { Children } from "react";

//Routing
import { Link } from "react-router-dom";

//Styling
import styled from "styled-components";

//Components
import AppBar from "../AppBar/AppBar";
import TeamMembersView from "../TeamMembers/TeamMembersView";
import TrainingSeriesView from "../TrainingSeries/TrainingSeriesView";
import { NavigationView } from "../Navigation";

//Authentication
import { isLoggedIn, login } from "../../Auth/Auth";
import Authenticate from "../authenticate/authenticate";
class Dashboard extends React.Component {
  state = {
    tabValue: 0,
    user: {}
  };

  componentDidMount() {
    this.setLocalStorageToState();
  }

  // tracking the tab value in navigation.js
  changeTabValue = value => {
    this.setState({
      tabValue: value
    });
  };

  setLocalStorageToState = () => {
    //Gets local storage data & sets state
    const user = JSON.parse(localStorage.getItem("userData"));
    this.setState({
      user: { ...user }
    });
    //Removes local storage data
    localStorage.removeItem("userData");
  };

  render() {
    return (
      <>
        <AppBar />
        <DashboardContainer>
          <NavigationView
            tabValue={this.state.tabValue}
            changeTabValue={this.changeTabValue}
          />

          <h4>
            You are logged in! You can now view your{" "}
            <Link to='profile'>profile area</Link>.
          </h4>
          <div>
            {this.state.tabValue === 0 && <TrainingSeriesView />}
            {this.state.tabValue === 1 && <TeamMembersView />}
          </div>
        </DashboardContainer>
      </>
    );
  }
}

export default Authenticate(Dashboard);

//Styled Components
const DashboardContainer = styled.div`
  margin: 100px 0;
`;
