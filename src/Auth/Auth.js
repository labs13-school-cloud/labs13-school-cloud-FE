//Libraries
// ! DEPRECATED in favor of use of new AuthService with Auth0-lock
// import auth0 from "auth0-js";
import decode from "jwt-decode";
import { Auth0LockPasswordless } from "auth0-lock";

//Config variables
import { AUTH_CONFIG } from "./auth0-variables";

//Token Variables
const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

// ! DEPRECATED in favor of using Auth0-lock over Auth0.js
// const auth = new auth0.WebAuth({
// 	clientID: AUTH_CONFIG.clientId,
// 	domain: AUTH_CONFIG.domain,
// 	responseType: "token id_token",
// 	redirectUri: AUTH_CONFIG.callbackUrl,
// });

export class AuthService {
	auth0Options = {
		allowedConnections: ['email', 'facebook', 'linkedin', 'google-oauth2'],
		passwordlessMethod: "link",
		auth: {
			redirectUrl: AUTH_CONFIG.callbackUrl,
			responseType: "token id_token",
			params: {
				scope: "openid email profile",
			},
		},
	};

	lock = new Auth0LockPasswordless(
		AUTH_CONFIG.clientId,
		AUTH_CONFIG.domain,
		this.auth0Options,
	);

	constructor() {
		this.lock.on("authenticated", authResult => {
			localStorage.setItem("id_token", authResult.idToken);
			localStorage.setItem("access_token", authResult.accessToken);
		});
	}

	login() {
        // Display Auth-Lock widget
		this.lock.show();
    }
    
    logout() {
        clearIdToken();
        clearAccessToken();
        clearUserProfile(); 
        this.lock.logout();
    }

	getUserInfo(cb) {
        const accessToken = getAccessToken();
        // Takes access token to retrieve the users profile
		this.lock.getUserInfo(accessToken, (error, profile) => {
			if (error) {
				console.log("error", error);
			}
			if (profile) {
				let setProfileToString = JSON.stringify(profile);
				localStorage.setItem("Profile", setProfileToString);
            }
            cb(error, profile);
		});
	}
}

// Create new AuthService instance
export const lock = new AuthService();

//Logs user in
// ! DEPRECATED in favor of Auth0-lock
// export const login = () => {
// 	auth.authorize({
// 		responseType: "token id_token",
// 		redirectUri: AUTH_CONFIG.callbackUrl,
// 		scope: "openid email profile",
// 	});
// };

//Logs the user out and clears local storage
// ! DEPRECATED in favor of Auth0-lock
// export const logout = () => {
// 	clearIdToken();
// 	clearAccessToken();
// 	clearUserProfile();
// 	lock.logout();
// 	history.push("/");
// };

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
// ! DEPRECATED in favor of letting AuthService take care of setting id_token in local storage uncomment to revert to Auth0.js
// export const setIdToken = () => {
// 	let idToken = getParameterByName("id_token");
// 	localStorage.setItem(ID_TOKEN_KEY, idToken);
// };
//Clears id token
export const clearIdToken = () => localStorage.removeItem(ID_TOKEN_KEY);

//----ACCESS TOKEN FUNCTIONS----
//Gets access token
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
// Get and store access token into local storage
// ! DEPRECATED in favor of letting AuthService take care of setting access_token in localStorage uncomment to revert to Auth0.js
// export const setAccessToken = () => {
// 	let accessToken = getParameterByName("access_token");
// 	localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
// };
//Clears access token
export const clearAccessToken = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

export const isLoggedIn = () => {
	const idToken = getIdToken();
	return !!idToken && !isTokenExpired(idToken);
};

//gets the users profile
export const getUserProfile = cb => {
    lock.getUserInfo(cb);
    
    // ! DEPRECATED in favor of of AuthService taking care of getting and setting profile in localStorage uncomment to revert to Auth0.js
	// auth.client.userInfo(getAccessToken(), (err, profile) => {
	// 	console.log(profile);
	// 	if (profile) {
	// 		console.log("profile", profile);
	// 		let setProfileToString = JSON.stringify(profile);
	// 		localStorage.setItem("Profile", setProfileToString);
	// 	}
	// 	cb(err, profile);
	// });
};

const clearUserProfile = () => localStorage.removeItem("Profile");

//----HELPER FUNCTIONS----

//Help function that extracts the id token and access token
// ! DEPRECATED unneeded with new AuthService with Auth0-lock
// function getParameterByName(name) {
// 	let match = RegExp("[#&]" + name + "=([^&]*)").exec(window.location.hash);
// 	return match && decodeURIComponent(match[1].replace(/\+/g, " "));
// }

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
