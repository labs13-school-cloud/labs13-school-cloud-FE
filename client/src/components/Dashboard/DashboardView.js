// parent component for app once logged in
import React from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../../history';

//Styling
import styled from 'styled-components';

//Components
import TeamMembersView from '../TeamMembers/TeamMembersView';
import TrainingSeriesView from '../TrainingSeries/TrainingSeriesView';
import ProgressCircle from '../Progress/ProgressCircle';
import ProfileView from '../Profile/ProfileView';
import AppBar from '../AppBar/AppBar';
import TeamMemberPageView from '../TeamMembers/TeamMemberPageContainer/TeamMemberPageView';

//Auth
import { getUserProfile } from '../../Auth/Auth';
import Authenticate from '../authenticate/authenticate';

//State Management
import { connect } from 'react-redux';
import { getUser } from '../../store/actions/userActions';
import TrainingSeriesPosts from '../TrainingSeries/TrainingSeriesPosts';

class Dashboard extends React.Component {
  state = {
    tabValue: 0
  };

  componentDidMount() {
    getUserProfile(() => {
      this.props.getUser();
    });
  }

  renderDashboard = () => {
    const { user } = this.props.userProfile;
    return (
      <>
        <TeamMembersView userId={user.userID} />
        <TrainingSeriesView userId={user.userID} match={this.props.match} />
      </>
    );
  };

  render() {
    return (
      <>
        {this.props.doneLoading ? (
          <>
            <AppBar />
            <DashboardContainer>
              <Router history={history}>
                <Route exact path="/home" component={this.renderDashboard} />
                <Route path="/home/profile" component={ProfileView} />
                <Route
                  path="/home/team-member/:id"
                  render={props => (
                    <TeamMemberPageView
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/training-series/:id"
                  render={props => <TrainingSeriesPosts {...props} />}
                />
              </Router>
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
}

const mapStateToProps = state => {
  return {
    userProfile: state.userReducer.userProfile,
    doneLoading: state.userReducer.doneLoading
  };
};

export default connect(
  mapStateToProps,
  {
    getUser
  }
)(Authenticate(Dashboard));

//Styled Components
const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 100px auto;
  max-width: 1000px;
`;

const hidden = {
  display: 'none'
};

const active = {
  display: 'block'
};

// const toggleTrainingSeries = tabValue => {

//   return tabValue === 0 ? active : hidden;
// };

// const toggleTeamMembers = tabValue => {
//   const hidden = {
//     display: "none"
//   };

//   const active = {
//     display: "block"
//   };

//   return tabValue === 1 ? active : hidden;
// };
