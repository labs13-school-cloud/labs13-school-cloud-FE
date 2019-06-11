import React, { Component } from "react";
import axios from "axios";

// Volunteer Component
import Test from 'components/HOC/test.js';

const RolesRenderHOC = (ComponentToRender) => {

	class RolesRender extends Component {
		constructor() {
			super();
			this.state = {
				user: null,
			};
		}

		componentDidMount() {
            const profile = JSON.parse(localStorage.getItem("Profile"));
            
			axios
				.get(`${process.env.REACT_APP_API}/api/users/${profile.email}`)
				.then(res => {
                    this.setState({ user: res.data.user });
                });
		}

		render() {
			if (this.state.user === null) {
                return <h1>Loading</h1>
            }  else if (this.state.user.role === 'admin') {
                return <ComponentToRender {...this.props}/>
            }  else {
                return <Test />
            }
		}
	}

	return RolesRender;
};

export default RolesRenderHOC;
