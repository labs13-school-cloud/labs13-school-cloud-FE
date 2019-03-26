import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';

// Routing
// import { Route } from 'react-router-dom';

//Styling
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

//Components
// import { LandingPageView } from './components/LandingPage';
// import { TeamMembersView } from './components/TeamMembers';
// import { Dashboard } from './components/Dashboard';

class App extends Component {
	goTo(route) {
		this.props.history.replace(`/${route}`);
	}

	login() {
		this.props.auth.login();
	}

	logout() {
		this.props.auth.logout();
	}

	renewToken() {
		const { renewSession } = this.props.auth;
		renewSession();
	}

	componentDidMount() {
		const { renewSession } = this.props.auth;

		if (localStorage.getItem('isLoggedIn') === 'true') {
			renewSession();
		}
	}

	render() {
		console.log(this.props.auth);
		const { isAuthenticated } = this.props.auth;

		return (
			<>
				<StripeProvider apiKey="pk_test_L76yOnUDjq2cNP8heEH9MkpA00Ktyd3MYn">
					<CssBaseline />
					<Button
						onClick={() => this.props.auth.login()}
						color="primary"
						variant="contained">
						Register
					</Button>
					{!isAuthenticated() && (
						<Button
							bsStyle="primary"
							className="btn-margin"
							onClick={this.login.bind(this)}>
							Log In
						</Button>
					)}
					{isAuthenticated() && (
						<Button
							bsStyle="primary"
							className="btn-margin"
							onClick={this.logout.bind(this)}>
							Log Out
						</Button>
					)}
				</StripeProvider>
			</>
		);
	}
}

export default App;
