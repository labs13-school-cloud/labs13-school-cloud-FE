//Libraries
import auth0 from "auth0-js";
import decode from "jwt-decode";

//Config variables
import { AUTH_CONFIG } from "./auth0-variables";

//History
import history from "../history";

//Token Variables
const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

const auth = new auth0.WebAuth({
  clientID: AUTH_CONFIG.clientId,
  domain: AUTH_CONFIG.domain
});

//Logs user in
export const login = () => {
  auth.authorize({
    responseType: "token id_token",
    redirectUri: AUTH_CONFIG.callbackUrl,
    scope: "openid email profile"
  });
};

//Logs the user out and clears local storage
export const logout = () => {
  clearIdToken();
  clearAccessToken();
  clearUserProfile();
  history.push("/");
};

//use this function on components that require authentication.
export const requiresAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ pathname: "/" });
  }
};

//----ID TOKEN FUNCTIONS----
//Gets id token
export const getIdToken = () => localStorage.getItem(ID_TOKEN_KEY);
//Sets the id token
export const setIdToken = () => {
  let idToken = getParameterByName("id_token");
  localStorage.setItem(ID_TOKEN_KEY, idToken);
};
//Clears id token
export const clearIdToken = () => localStorage.removeItem(ID_TOKEN_KEY);

//----ACCESS TOKEN FUNCTIONS----
//Gets access token
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
//Get and store access token into local storage
export const setAccessToken = () => {
  let accessToken = getParameterByName("access_token");
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};
//Clears access token
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const isLoggedIn = () => {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
};

//gets the users profile
export const getUserProfile = cb => {
  auth.client.userInfo(getAccessToken(), (err, profile) => {
    if (profile) {
      let setProfileToString = JSON.stringify(profile);
      localStorage.setItem("Profile", setProfileToString);
    }
    cb(err, profile);
  });
};

const clearUserProfile = () => localStorage.removeItem("Profile");

//----HELPER FUNCTIONS----

//Help function that extracts the id token and access token
function getParameterByName(name) {
  let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, " "));
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

// export default class Auth {
//   accessToken;
//   idToken;
//   expiresAt;
//   userProfile;
//   tokenRenewalTimeout;

//   auth0 = new auth0.WebAuth({
//     domain: AUTH_CONFIG.domain,
//     clientID: AUTH_CONFIG.clientId,
//     redirectUri: AUTH_CONFIG.callbackUrl,
//     responseType: "token id_token",
//     scope: "openid email profile"
//   });

//   constructor() {
//     this.scheduleRenewal();
//   }

//   login = () => {
//     this.auth0.authorize();
//   };

//   handleAuthentication = () => {
//     this.auth0.parseHash((err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//       } else if (err) {
//         history.replace("/home");
//         console.log(err);
//         alert(`Error: ${err.error}. Check the console for further details.`);
//       }
//     });
//   };

//   getAccessToken = () => {
//     return this.accessToken;
//   };

//   getIdToken = () => {
//     return this.idToken;
//   };

//   setSession = authResult => {
//     // Set isLoggedIn flag in localStorage
//     localStorage.setItem("isLoggedIn", "true");

//     // Set the time that the access token will expire at
//     let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
//     this.accessToken = authResult.accessToken;
//     this.idToken = authResult.idToken;
//     this.expiresAt = expiresAt;

//     // schedule a token renewal
//     this.scheduleRenewal();

//     // navigate to the home route
//     history.replace("/home");
//   };

//   renewSession = () => {
//     this.auth0.checkSession({}, (err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         this.setSession(authResult);
//       } else if (err) {
//         this.logout();
//         console.log(err);
//         alert(
//           `Could not get a new token (${err.error}: ${err.error_description}).`
//         );
//       }
//     });
//   };

//   getProfile = cb => {
//     this.auth0.client.userInfo(this.accessToken, (err, profile) => {
//       if (profile) {
//         this.userProfile = profile;
//         console.log(this.userProfile);
//       }
//       cb(err, profile);
//     });
//   };

//   logout = () => {
//     // Remove tokens and expiry time
//     this.accessToken = null;
//     this.idToken = null;
//     this.expiresAt = 0;

//     // Remove user profile
//     this.userProfile = null;

//     // Clear token renewal
//     clearTimeout(this.tokenRenewalTimeout);

//     // Remove isLoggedIn flag from localStorage
//     localStorage.removeItem("isLoggedIn");

//     // navigate to the home route
//     history.replace("/home");
//   };

//   isAuthenticated = () => {
//     // Check whether the current time is past the
//     // access token's expiry time
//     let expiresAt = this.expiresAt;
//     return new Date().getTime() < expiresAt;
//   };

//   scheduleRenewal() {
//     let expiresAt = this.expiresAt;
//     const timeout = expiresAt - Date.now();
//     if (timeout > 0) {
//       this.tokenRenewalTimeout = setTimeout(() => {
//         this.renewSession();
//       }, timeout);
//     }
//   }

//   getExpiryDate = () => {
//     return JSON.stringify(new Date(this.expiresAt));
//   };
// }
