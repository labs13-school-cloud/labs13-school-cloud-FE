import React, { Component } from "react";
import { connect } from "react-redux";

import { getUser } from "store/actions/userActions";

// Volunteer Component
import VolunteerDashboard from "components/VolunteerComponents/Pages/Dashboard/";

const RolesRenderHOC = ComponentToRender => {
	class RolesRender extends Component {
		componentDidMount() {
			this.props.getUser();
		}

		render() {
			if (this.props.user === undefined) {
				return <h1>Loading</h1>;
			} else if (this.props.user.role === "admin") {
				return <ComponentToRender {...this.props} />;
			} else if (this.props.user.role === "volunteer") {
				return <VolunteerDashboard />;
			}
		}
    }
    
    const mapStateToProps = (state) => {
        return {
            user: state.userReducer.userProfile.user
        }
    }

	return connect(
		mapStateToProps,
		{ getUser },
	)(RolesRender);
};

export default RolesRenderHOC;
