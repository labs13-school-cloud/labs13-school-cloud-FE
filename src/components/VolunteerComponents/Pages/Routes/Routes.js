import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Profile from "components/Pages/Profile";
import SingleTrainingSeriesVolunteer from "components/VolunteerComponents/Pages/TrainingSeries/SinglePage/SingleTrainingSeries.js";
import SingleClassViewVolunteer from "components/VolunteerComponents/Pages/Classes/SinglePage/SinglePage.js";
import HelpModal from "components/UI/HelpModal/HelpModal.js";
import ContactModal from "components/UI/ContactModal/ContactModal.js";

import VolunteerDashboard from "components/VolunteerComponents/Pages/Dashboard/VolunteerDashboard.js";

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
      <Switch>
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
            <VolunteerDashboard
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
          exact
          path="/home/training-series/:id"
          render={renderProps => (
            <SingleTrainingSeriesVolunteer
              {...renderProps}
              history={props.history}
              user_id={props.user.id}
            />
          )}
        />
        <Route
          exact
          path="/home/classes/:id"
          render={renderProps => (
            <SingleClassViewVolunteer
              {...renderProps}
              history={props.history}
              user_id={props.user.id}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default Routes;
