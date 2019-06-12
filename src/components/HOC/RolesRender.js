import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser } from "store/actions/userActions";

// Volunteer Component
import VolunteerDashboard from "components/VolunteerComponents/Pages/Dashboard/";

const RolesRenderHOC = ComponentToRender => {
	class RolesRender extends Component {
		constructor(props) {
			super(props);
			this.state = {
				profile: null,
			};
		}

		componentDidMount() {
            // ! This still doesn't work for brand new auth users
            // ! If auth through Auth0 once and not logged out then will work 
            // ! Fixed now but might because of timing of async calls being finished perfectly
            // ! Still might need to change keep comment here just in case
			this.props.getUser();

            const profile = JSON.parse(localStorage.getItem("Profile"));

            this.setState({ profile: profile })
		}

		render() {
			if (this.state.profile === null) {
				return <h1>Loading</h1>;
			} else if (this.state.profile.role === "admin") {
				return <ComponentToRender {...this.props} />;
			} else {
				return <VolunteerDashboard />;
			}
		}
	}

	return connect(
		null,
		{ getUser },
	)(RolesRender);
};

export default RolesRenderHOC;
