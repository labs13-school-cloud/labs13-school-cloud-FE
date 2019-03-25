// contains all components for landing page
import React from 'react';

//Routing
import {Link} from 'react-router-dom';

//Styling
import Button from '@material-ui/core/Button';

class LandingPageView extends React.Component {
  render() {
    const {isAuthenticated} = this.props.auth;
    return (
      <>
        <Button
          onClick={() => this.props.auth.login()}
          color="primary"
          variant="contained"
        >
          Register
        </Button>
        {!isAuthenticated() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={this.login.bind(this)}
          >
            Log In
          </Button>
        )}
        {isAuthenticated() && (
          <Button
            bsStyle="primary"
            className="btn-margin"
            onClick={this.logout.bind(this)}
          >
            Log Out
          </Button>
        )}
      </>
    );
  }
}

export default LandingPageView;
