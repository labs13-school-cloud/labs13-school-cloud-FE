import React, { useState, useEffect } from "react";

//Styling
import Button from "@material-ui/core/Button";
//Authentication
import { logout, isLoggedIn, login } from "../../Auth/Auth";

class Profile extends React.Component {
  state = {
    userProfile: []
  };
  // const [uProfile, setUProfile] = useState({});

  // const handleLogout = e => {
  //   e.preventDefault();
  //   localStorage.removeItem('isLoggedIn');
  //   props.history.push('/');
  // };

  // useEffect(() => {
  //   const {userProfile, getProfile} = props.auth;

  //   if (!userProfile) {
  //     getProfile((err, profile) => {
  //       setUProfile(profile);
  //     });
  //   } else {
  //     setUProfile(userProfile);
  //   }
  // });

  componentDidMount() {
    this.setProfileToState();
  }

  setProfileToState = () => {
    //Checks if the user is logged in before setting profile
    if (isLoggedIn()) {
      const user = JSON.parse(localStorage.getItem("Profile"));
      this.setState({ userProfile: user });
    }
  };
  render() {
    return (
      <div className='container'>
        {isLoggedIn() ? (
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
        ) : (
          <h1>
            You are not logged in!{" "}
            <button onClick={() => login()}>Login Here!</button>
          </h1>
        )}
      </div>
    );
  }
}

export default Profile;
