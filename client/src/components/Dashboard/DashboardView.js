// parent component for app once logged in
import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../../history.js";

//Styling
import {
  TripleColumn,
  SmallColumns,
  DashboardContainer,
  DashWrapper
} from "./styles.js";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PermIdentity from "@material-ui/icons/PermIdentityOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswerOutlined";
import Timeline from "@material-ui/icons/TimelineOutlined";

//Components
import TeamMembersView from "../TeamMembers/TeamMembersView";
import TeamMembersTab from "../TeamMembers/TeamMembersTab";
import TrainingSeriesView from "../TrainingSeries/TrainingSeriesView";
import TrainingSeriesTab from "../TrainingSeries/TrainingSeriesTab.js";
import ProgressCircle from "../Misc/Progress/ProgressCircle";
import ProfileView from "../Profile/ProfileView";
import AppBar from "../AppBar/AppBar";
import TeamMemberPageView from "../TeamMembers/TeamMemberPageContainer/TeamMemberPageView";
import AddTrainingSeriesView from "../TrainingSeries/AddMembersToTrainingSeries/AddMembersView.js";
import CreateTrainingSeries from "../TrainingSeries/CreateTrainingSeries";
import ReturnToDashboardButton from "../Navigation/ReturnToDashboard";
import TrainingSeriesPosts from "../TrainingSeries/TrainingSeriesPosts";
import AddTeamMemberPage from "../TeamMembers/TeamMemberPageContainer/AddTeamMemberPage";
import CreatePost from "../TrainingSeries/CreatePost";
import PostPage from "../TrainingSeries/PostPage";
import NotificationsView from "../Notifications/NotificationsView";
import AssignMemberPage from "../TeamMembers/TeamMemberPageContainer/AssignMemberPage";
import Snackbar from "../Snackbar/Snackbar";
import DashboardTour from "../Tour/Tour";

//Auth
import Authenticate from "../Misc/authenticate/authenticate";

//State Management
import { connect } from "react-redux";
import { getUser } from "store/actions/userActions";

class Dashboard extends React.Component {
  state = {
    tabValue: 0,
    displaySnackbar: false,
    isTourOpen: true,
    topTabValue: "overview"
  };

  componentDidMount() {
    this.props.getUser();
  }

  componentDidUpdate(prevProps) {
    //Checks if an already existing user, if so disable tour.
    if (this.props.newUser !== prevProps.newUser) {
      this.setState({ isTourOpen: false });
    }
    if (this.props.location.state) {
      if (
        this.props.location.state !== prevProps.location.state &&
        this.props.location.state.success
      ) {
        this.setState({
          displaySnackbar: true
        });
      }
    }
  }

  toggleFreakinSnackBar = e => {
    this.setState({
      displaySnackbar: false
    });
  };

  handleDashChange = (e, value) => {
    console.log(this.state.tabValue);
    this.setState({ topTabValue: value });
  };

  renderDashboard = () => {
    const { topTabValue } = this.state;
    const user = this.props.userProfile.user;
    return (
      <DashWrapper>
        <BottomNavigation
          value={topTabValue}
          onChange={this.handleDashChange}
          style={{ width: "80%" }}
        >
          <BottomNavigationAction
            label="Overview"
            value="overview"
            icon={<Home />}
            color="primary"
          />
          <BottomNavigationAction
            label="Team Members"
            value="team members"
            icon={<PermIdentity />}
          />
          <BottomNavigationAction
            label="Training Series"
            value="training series"
            icon={<Timeline />}
          />
          <BottomNavigationAction
            label="Messages"
            value="messages"
            icon={<QuestionAnswer />}
          />
        </BottomNavigation>

        {topTabValue === "overview" && (
          <TripleColumn>
            <SmallColumns>
              <TeamMembersView
                toggleFreakinSnackBar={this.toggleFreakinSnackBar}
                userId={user.id}
              />
              <TrainingSeriesView
                toggleFreakinSnackBar={this.toggleFreakinSnackBar}
                userId={user.id}
                match={this.props.match}
              />
            </SmallColumns>
            <NotificationsView userId={user.id} />
          </TripleColumn>
        )}

        {topTabValue === "team members" && (
          <TeamMembersTab history={this.props.history} userId={user.id} />
        )}
        {topTabValue === "training series" && (
          <TrainingSeriesTab history={this.props.history} userId={user.id} />
        )}
      </DashWrapper>
    );
  };

  render() {
    return (
      <>
        {this.props.doneLoading ? (
          <>
            {this.state.displaySnackbar && (
              <>
                <Snackbar
                  message="Your team members have been successfully added."
                  type="success"
                />
              </>
            )}
            <AppBar />
            {this.props.location.pathname !== "/home" && (
              <ReturnToDashboardButton />
            )}
            <DashboardContainer>
              <Router history={history}>
                <Route exact path="/home" component={this.renderDashboard} />
                <Route
                  path="/home/profile"
                  render={props => (
                    <ProfileView
                      {...props}
                      activateTutorial={this.activateTutorial}
                      toggleFreakinSnackBar={this.toggleFreakinSnackBar}
                    />
                  )}
                />
                <Route
                  path="/home/team-member/:id"
                  render={props => (
                    <TeamMemberPageView
                      {...props}
                      userId={this.props.userProfile.user.id}
                    />
                  )}
                />
                <Route
                  path="/home/create-team-member/"
                  render={props => (
                    <AddTeamMemberPage
                      {...props}
                      userId={this.props.userProfile.user.id}
                    />
                  )}
                />
                <Route
                  path="/home/create-training-series"
                  render={props => (
                    <CreateTrainingSeries
                      {...props}
                      userId={this.props.userProfile.user.id}
                    />
                  )}
                />
                <Route
                  path="/home/training-series/:id"
                  render={props => (
                    <TrainingSeriesPosts
                      {...props}
                      userId={this.props.userProfile.user.id}
                    />
                  )}
                />
                <Route
                  path="/home/create-post"
                  render={props => <CreatePost {...props} />}
                />
                <Route
                  path="/home/assign-members/:id"
                  render={props => {
                    console.log("Route Triggered");
                    return (
                      <AddTrainingSeriesView
                        {...props}
                        userId={this.props.userProfile.user.id}
                      />
                    );
                  }}
                />
                <Route
                  path="/home/assign-series/:id"
                  render={props => (
                    <AssignMemberPage
                      {...props}
                      userId={this.props.userProfile.user.id}
                    />
                  )}
                />
                <Route path="/home/post/:id" component={PostPage} />
              </Router>
              <DashboardTour
                isTourOpen={this.state.isTourOpen}
                closeTour={this.closeTour}
                newUser={this.props.newUser}
              />
            </DashboardContainer>
          </>
        ) : (
          <ProgressCircle />
        )}
      </>
    );
  }

  // tracking the tab value in navigation.js
  changeTabValue = value => {
    this.setState({
      tabValue: value
    });
  };

  //Tour methods
  closeTour = () => {
    this.setState({ isTourOpen: false });
  };
  activateTutorial = () => {
    this.props.history.push("/home");
    this.setState({ isTourOpen: true });
  };
}

const mapStateToProps = state => {
  return {
    userProfile: state.userReducer.userProfile,
    doneLoading: state.userReducer.doneLoading,
    newUser: state.userReducer.newUser
  };
};

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(Authenticate(Dashboard));
