import React, { useState, useEffect } from "react";

//Styling
import Button from "@material-ui/core/Button";
//Authentication
import { logout, isLoggedIn, login } from "../../Auth/Auth";
import Authentication from "../authenticate/authenticate";

class Profile extends React.Component {
  state = {
    userProfile: []
  };

  componentDidMount() {
    //Gets the user profile and assigns it to state
    const user = JSON.parse(localStorage.getItem("Profile"));
    this.setState({ userProfile: user });
  }

  render() {
    return (
      <div className='container'>
        <>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => logout()}
          >
            Log Out
          </Button>
          <div className='profile-area'>
            <h1>{this.state.userProfile.email}</h1>
            <div>
              <img src={this.state.userProfile.picture} alt='profile' />
              <div>
                <h3>{this.state.userProfile.nickname}</h3>
              </div>
              <pre>{JSON.stringify(this.state.userProfile, null, 2)}</pre>
            </div>
          </div>
        </>
      </div>
    );
  }
}

export default Authentication(Profile);
