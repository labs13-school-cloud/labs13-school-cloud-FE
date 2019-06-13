import React from "react";
import { Router, Route } from "react-router-dom";

import Profile from "components/Pages/Profile";
import CreateTrainingSeries from "components/Pages/TrainingSeries/Add/CreateTrainingSeries";
import EditTrainingSeries from "components/Pages/TrainingSeries/Edit/";
import SingleTrainingSeries from "components/VolunteerComponents/Pages/TrainingSeries/SinglePage/";
import CreateMessage from "components/Pages/TrainingSeries/Add/CreateMessage";
import MessagePage from "components/Pages/TrainingSeries/Add/MessagePage";
import HelpModal from "components/UI/HelpModal/HelpModal.js";
import ContactModal from "components/UI/ContactModal/ContactModal.js";

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
      <Route
        exact
        path="/home/contact"
        render={renderProps => (
          <ContactModal
            {...renderProps}
            history={props.history}
            userId={props.user.id}
          />
        )}
      />
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
        path="/home/create-training-series"
        render={renderProps => (
          <CreateTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/training-series/:id/edit"
        render={renderProps => (
          <EditTrainingSeries {...renderProps} user_id={props.user.id} />
        )}
      />
      <Route
        path="/home/training-series/:id"
        render={renderProps => (
          <SingleTrainingSeries
            {...renderProps}
            props={props}
            history={props.history}
          />
        )}
      />
      <Route
        path="/home/create-message"
        render={renderProps => <CreateMessage {...renderProps} />}
      />
      <Route path="/home/message/:id" component={MessagePage} />
    </Router>
  );
}

export default Routes;