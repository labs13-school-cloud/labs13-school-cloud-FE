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

//Axios
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    tabValue: 0
  };

  componentDidMount() {
    this.sendUserDataToDatabase();
  }

  // tracking the tab value in navigation.js
  changeTabValue = value => {
    this.setState({
      tabValue: value
    });
  };

  sendUserDataToDatabase = () => {
    const userData = JSON.parse(localStorage.getItem("Profile"));
    const { email, name } = userData;
    console.log(email, name);
    axios
      .post("https://labs11-trainingbot-dev.herokuapp.com/api/auth", {
        email,
        name
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));
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
          {isLoggedIn() && (
            <>
              <h4>
                You are logged in! You can now view your{" "}
                <Link to='profile'>profile area</Link>.
              </h4>
              <div>
                {this.state.tabValue === 0 && <TrainingSeriesView />}
                {this.state.tabValue === 1 && <TeamMembersView />}
              </div>
            </>
          )}
          {!isLoggedIn() && (
            <h4>
              You are not logged in! Please{" "}
              <a style={{ cursor: "pointer" }} onClick={() => login()}>
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
export default Dashboard;

//Styled Components
const DashboardContainer = styled.div`
  margin: 100px 0;
`;
