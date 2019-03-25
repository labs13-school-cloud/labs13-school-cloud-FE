// HOC for client-side authorization, protecting routes that require authentication

import React, { Component } from "react";

import { login } from "../../Auth/Auth";

export default function(Component) {
  return class Authenticate extends Component {
    render() {
      const token = localStorage.getItem("id_token");

      const notLoggedIn = (
        <div>
          Please Login to see the users
          <button onClick={e => login()}>Login</button>
        </div>
      );
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
