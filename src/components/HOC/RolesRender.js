import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser } from "store/actions/userActions";

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
        // Will return Admin Dashboard
        return <ComponentToRender {...this.props} volunteerRole={"admin"} />;
      } else if (this.props.user.role === "volunteer") {
        // Will return Volunteer Dashboard
        return (
          <ComponentToRender {...this.props} volunteerRole={"volunteer"} />
        );
      }
    }
  }

  const mapStateToProps = state => ({
    // This will grab the user profile
    user: state.userReducer.userProfile.user
  });

  return connect(
    mapStateToProps,
    { getUser }
  )(RolesRender);
};

export default RolesRenderHOC;
