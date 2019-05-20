// parent component for app once logged in
import React, { useState, useEffect } from "react";

import { DashboardContainer } from "./styles.js";

import ProgressCircle from "components/UI/Progress/ProgressCircle";
import AppBar from "components/Navigation/AppBar/AppBar";
import ReturnToDashboardButton from "components/Navigation/ReturnToDashboard";
import Snackbar from "components/UI/Snackbar/Snackbar";
import DashboardTour from "components/UI/Tour/Tour";

import authenticate from "components/Misc/authenticate/authenticate";

import { connect } from "react-redux";
import { getUser } from "store/actions/userActions";

import DashboardRoutes from "../Routes";

function Loader(props) {
  const [displaySnackbar, setDisplaySnackbar] = useState(false);
  const [isTourOpen, setIsTourOpen] = useState(true);
  const { getUser, newUser, location } = props;
  const { state } = location;

  useEffect(() => {
    // componentDidMount (CDM) --> getUser should never be different
    getUser();
  }, [getUser]);

  useEffect(() => {
    // componentDidUpdate (CDU) --> update when props.newUser changes
    setIsTourOpen(newUser);
  }, [newUser]);

  useEffect(() => {
    // componentDidUpdate (CDU) --> update when props.location.state changes
    if (state && state.success) {
      setDisplaySnackbar(true);
    }
  }, [state]);

  return (
    <>
      {props.doneLoading ? (
        <>
          {displaySnackbar && (
            <Snackbar
              message="Your team members have been successfully added."
              type="success"
            />
          )}
          <AppBar />
          {props.location.pathname !== "/home" && (
            <ReturnToDashboardButton history={props.history} />
          )}
          <DashboardContainer>
            <DashboardRoutes
              {...props}
              user={props.userProfile.user}
              setDisplaySnackbar={setDisplaySnackbar}
              history={props.history}
              setIsTourOpen={setIsTourOpen}
            />
            <DashboardTour
              isTourOpen={isTourOpen}
              closeTour={() => setIsTourOpen(false)}
              newUser={props.newUser}
            />
          </DashboardContainer>
        </>
      ) : (
        <ProgressCircle />
      )}
    </>
  );
}

const mapStateToProps = state => ({
  userProfile: state.userReducer.userProfile,
  doneLoading: state.userReducer.doneLoading,
  newUser: state.userReducer.newUser
});

export default connect(
  mapStateToProps,
  { getUser }
)(authenticate(Loader));
