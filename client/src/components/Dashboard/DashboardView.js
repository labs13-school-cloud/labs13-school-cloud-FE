// parent component for app once logged in
import React from 'react';
import {Router, Route} from 'react-router-dom';

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
import AddTrainingSeriesView from '../TrainingSeries/AddMembersToTrainingSeries/AddMembersView.js';
import CreateTrainingSeries from '../TrainingSeries/CreateTrainingSeries';
import ReturnToDashboardButton from '../Navigation/ReturnToDashboard';

//Auth
import {getUserProfile} from '../../Auth/Auth';
import Authenticate from '../authenticate/authenticate';

//State Management
import {connect} from 'react-redux';
import {getUser} from '../../store/actions/userActions';
import TrainingSeriesPosts from '../TrainingSeries/TrainingSeriesPosts';
import AddTeamMemberPage from '../TeamMembers/TeamMemberPageContainer/AddTeamMemberPage';
import CreatePost from '../TrainingSeries/CreatePost';
import PostPage from '../TrainingSeries/PostPage';
import NotificationsView from '../Notifications/NotificationsView';

class Dashboard extends React.Component {
  state = {
    tabValue: 0,
  };

  componentDidMount() {
    getUserProfile(() => {
      this.props.getUser();
    });
  }

  renderDashboard = () => {
    if (this.props.userProfile === undefined) {
      return <ProgressCircle />;
    } else {
      const user = this.props.userProfile || this.props.userProfile.newUser;
      return (
        <>
          <TripleColumn>
            <SmallColumns>
              <TeamMembersView userId={user.userID} />
              <TrainingSeriesView
                userId={user.userID}
                match={this.props.match}
              />
            </SmallColumns>
            <NotificationsView userId={user.userID} />
          </TripleColumn>
        </>
      );
    }
  };

  render() {
    return (
      <>
        {this.props.doneLoading && this.props.userProfile !== undefined ? (
          <>
            <AppBar />
            {this.props.location.pathname !== '/home' && (
              <ReturnToDashboardButton />
            )}
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
                  path="/home/create-team-member/"
                  render={props => (
                    <AddTeamMemberPage
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/create-training-series"
                  render={props => (
                    <CreateTrainingSeries
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/training-series/:id"
                  render={props => (
                    <TrainingSeriesPosts
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route
                  path="/home/create-post"
                  render={props => <CreatePost {...props} />}
                />
                <Route
                  path="/home/assign-members/:id"
                  render={props => (
                    <AddTrainingSeriesView
                      {...props}
                      userId={this.props.userProfile.user.userID}
                    />
                  )}
                />
                <Route path="/home/post/:id" component={PostPage} />
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
			tabValue: value,
		});
	};

}

const mapStateToProps = state => {
  return {
    userProfile: state.userReducer.userProfile,
    doneLoading: state.userReducer.doneLoading,
  };
};

export default connect(
  mapStateToProps,
  {
    getUser,
  }
)(Authenticate(Dashboard));

//Styled Components
const TripleColumn = styled.div`
  max-width: 1400px;
	display: flex;
	justify-content: space-between;
	margin: 10px auto;
	height: 580px;
	@media (max-width: 1400px) {
		flex-wrap: wrap;
		max-width: 1000px;
		padding: 10px;
	}
	@media (max-width: 768px) {
		max-width: 768px;
		height: 100%;
		flex-direction: column;
		padding: 10px;
		/* margin: 0 auto 5px; */
	}
`;
const SmallColumns = styled.div`
	display: flex;
	width: 800px;
	@media (max-width: 1400px) {
		width: 100%;
		margin-bottom: 50px;
	}
	@media (max-width: 768px) {
		flex-direction: column;
		/* margin: 0 auto 5px; */
		margin-bottom: 5px;
}

`;
const DashboardContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
    padding: 10px;
  }
`;
