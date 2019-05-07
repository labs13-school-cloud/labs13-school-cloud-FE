import React from "react";
import { Router, Route } from "react-router-dom";

import Profile from "components/Containers/Profile";
import TeamMemberPageView from "components/Sections/TeamMembers/TeamMemberPageContainer/TeamMemberPageView";
import AddTrainingSeriesView from "components/Sections/TrainingSeries/AddMembersToTrainingSeries/AddMembersView.js";
import CreateTrainingSeries from "components/Sections/TrainingSeries/CreateTSComponents/CreateTrainingSeries";
import TrainingSeriesPosts from "components/Sections/TrainingSeries/DashTSComponents/TrainingSeriesPosts";
import AddTeamMemberPage from "components/Sections/TeamMembers/TeamMemberPageContainer/AddTeamMemberPage";
import CreatePost from "components/Sections/TrainingSeries/CreateTSComponents/CreatePost";
import PostPage from "components/Sections/TrainingSeries/CreateTSComponents/PostPage";
import AssignMemberPage from "components/Sections/TeamMembers/TeamMemberPageContainer/AssignMemberPage";

import Dashboard from "../Dashboard";

function Routes(props) {
  const { setDisplaySnackbar, history, setIsTourOpen } = props;
  const disableSnackbar = () => {
    setDisplaySnackbar(false);
  };

  const activateTutorial = () => {
    props.history.push("/home");
    setIsTourOpen(true);
  };
  return (
    <Router history={history}>
      <Route
        exact
        path="/home"
        render={renderProps => (
          <Dashboard
            {...renderProps}
            disableSnackbar={disableSnackbar}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
      <Route
        path="/home/profile"
        render={renderProps => (
          <Profile
            {...renderProps}
            activateTutorial={activateTutorial}
            disableSnackbar={disableSnackbar}
          />
        )}
      />
      <Route
        path="/home/team-member/:id"
        render={renderProps => (
          <TeamMemberPageView {...renderProps} userId={props.user.id} />
        )}
      />
      <Route
        path="/home/create-team-member/"
        render={renderProps => (
          <AddTeamMemberPage {...renderProps} userId={props.user.id} />
        )}
      />
      <Route
        path="/home/create-training-series"
        render={renderProps => (
          <CreateTrainingSeries {...renderProps} userId={props.user.id} />
        )}
      />
      <Route
        path="/home/training-series/:id"
        render={renderProps => (
          <TrainingSeriesPosts {...renderProps} userId={props.user.id} />
        )}
      />
      <Route
        path="/home/create-post"
        render={renderProps => <CreatePost {...renderProps} />}
      />
      <Route
        path="/home/assign-members/:id"
        render={renderProps => (
          <AddTrainingSeriesView {...renderProps} userId={props.user.id} />
        )}
      />
      <Route
        path="/home/assign-series/:id"
        render={renderProps => (
          <AssignMemberPage {...renderProps} userId={props.user.id} />
        )}
      />
      <Route path="/home/post/:id" component={PostPage} />
    </Router>
  );
}

export default Routes;
