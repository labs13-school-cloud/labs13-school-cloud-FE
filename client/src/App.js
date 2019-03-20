import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LandingPageView } from './components/LandingPage';
import { TeamMembersView } from './components/TeamMembers';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Route exact path="/" component={LandingPageView} />
        {/* Note from Leigh-Ann: This component will need to be restructured with proper routes, displaying training-series is a placeholder */}
        <Route path="/training-series" component={TeamMembersView} />
      </>
    );
  }
}

export default App;
