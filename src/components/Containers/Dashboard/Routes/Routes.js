import React from "react";
import { Router, Route } from "react-router-dom";

import Profile from "components/Containers/Profile";
import EditTeamMember from "components/Sections/TeamMembers/Edit/";
import CreateTrainingSeries from "components/Sections/TrainingSeries/Add/CreateTrainingSeries";
import EditTrainingSeries from "components/Sections/TrainingSeries/Edit/";
import AddTeamMember from "components/Sections/TeamMembers/Add/";
import CreateMessage from "components/Sections/TrainingSeries/Add/CreateMessage";
import MessagePage from "components/Sections/TrainingSeries/Add/MessagePage";
import HelpModal from "components/UI/HelpModal/HelpModal.js";

import AddMemberToTrainingSeries from "components/Sections/TrainingSeries/Add/AddMemberToTrainingSeries.js";

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
        path="/home/help"
        render={renderProps => (
          <HelpModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
      {/*
        <Router history={history}>
      <Route
        exact
        path="/home/contact"
        render={renderProps => (
          <ContactModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
          */}
      <Route
        exact
        path="/home"
        render={renderProps => (
          <Dashboard
            {...renderProps}
            disableSnackbar={disableSnackbar}
            history={props.history}
            user_id={props.user.id}
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
          <EditTeamMember {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/create-team-member/"
        render={renderProps => (
          <AddTeamMember {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/create-training-series"
        render={renderProps => (
          <CreateTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/training-series/:id"
        render={renderProps => (
          <EditTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/create-message"
        render={renderProps => <CreateMessage {...renderProps} />}
      />

      <Route
        path="/home/assign-members/:id"
        render={renderProps => (
          <AddMemberToTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route path="/home/message/:id" component={MessagePage} />
    </Router>
  );
}

export default Routes;
