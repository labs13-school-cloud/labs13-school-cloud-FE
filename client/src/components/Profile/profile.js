import React, { useState, useEffect } from "react";

//Styling
import Button from "@material-ui/core/Button";
//Authentication
import { getUserProfile, logout } from "../../Auth/Auth";

class Profile extends React.Component {
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
    getUserProfile();
  }
  render() {
    return (
      <div className='container'>
        <Button variant='contained' color='secondary' onClick={() => logout()}>
          Log Out
        </Button>
        {/* <div className="profile-area">
          <h1>{uProfile.name}</h1>
          <div>
            <img src={uProfile.picture} alt="profile" />
            <div>
              <h3>{uProfile.nickname}</h3>
            </div>
            <pre>{JSON.stringify(uProfile, null, 2)}</pre>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Profile;
