// HOC for client-side authorization, protecting routes that require authentication

import React, { Component } from 'react';
import axios from 'axios';

//axios defaults and interceptors.
axios.defaults.baseURL = 'http://localhost:8000';
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem('jwt');
    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticate extends Component {
    render() {
      const token = localStorage.getItem('jwt');
      const notLoggedIn = <div>Please Login to see the users</div>;
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}