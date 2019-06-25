import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser } from "store/actions/userActions";

// Volunteer Component
import VolunteerDashboard from "components/VolunteerComponents/Pages/Dashboard/VolunteerOverview/Overview";

const RolesRenderHOC = ComponentToRender => {
  class RolesRender extends Component {
    componentDidMount() {
      // Fires the action creator to set user info
      this.props.getUser();
    }

    render() {
      if (this.props.user === undefined) {
        return <h1>Loading</h1>;
      } else if (this.props.user.role === "admin") {
        return <ComponentToRender {...this.props} role={"admin"} />;
      } else if (this.props.user.role === "volunteer") {
        return <ComponentToRender {...this.props} role={"volunteer"} />;
      }
    }
  }

  const mapStateToProps = state => {
    return {
      // This will grab the user profile
      user: state.userReducer.userProfile.user
    };
  };

  return connect(
    mapStateToProps,
    { getUser }
  )(RolesRender);
};

export default RolesRenderHOC;
