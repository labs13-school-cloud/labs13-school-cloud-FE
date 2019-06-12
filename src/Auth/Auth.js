//Libraries
import auth0 from "auth0-js";
import decode from "jwt-decode";

//Config variables
import { AUTH_CONFIG } from "./auth0-variables";

//History
import history from "history.js";

//Token Variables
const ID_TOKEN_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";

const auth = new auth0.WebAuth({
	clientID: AUTH_CONFIG.clientId,
	domain: AUTH_CONFIG.domain,
});

//Logs user in
export const login = () => {
	auth.authorize({
		responseType: "token id_token",
		redirectUri: AUTH_CONFIG.callbackUrl,
		scope: "openid email profile",
	});
};

//Logs the user out and clears local storage
export const logout = () => {
	clearIdToken();
	clearAccessToken();
	clearUserProfile();
	auth.logout();
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
