// component to contain all the components related to team members
import React from "react";
import axios from "axios";

class TeamMembersView extends React.Component {
  state = {
    users: [],
    profile: []
  };

  componentDidMount() {
    console.log(this.props);
    axios
      .get("https://labs11-trainingbot.herokuapp.com/api/users")
      .then(res => {
        console.log(res.data.users);
        this.setState({
          users: res.data.users
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <>
        <p>Team Members View</p>
        {/* {this.state.users.map(user => (
          <div key={user.userID}>
            <p>User ID: {user.userID}</p>
            <p>Account Type ID: {user.accountTypeID}</p>
          </div>
        ))} */}
      </>
    );
  }
}

export default TeamMembersView;
