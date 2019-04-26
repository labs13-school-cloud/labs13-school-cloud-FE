// HOC for client-side authorization, protecting routes that require authentication
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../../img/training-bot.svg";
import "../Progress/loading.css";
import Button from "@material-ui/core/Button";

//Styling
import {
  LoginContainer,
  LoginContent,
  NavbarContainer,
  NavbarItemsContainer,
  NavbarItem,
  LogoImage,
  StyledButton,
  StyledLink,
  ButtonContainer
} from "./styles.js";
import Logo from "../../../img/training-bot.png";

//Authentication
import { login } from "../../../Auth/Auth";

//axios defaults and interceptors.
axios.defaults.baseURL = `${process.env.REACT_APP_API}`;
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("id_token");
    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticate extends Component {
    render() {
      const token = localStorage.getItem("id_token");

      const notLoggedIn = (
        <>
          {/* NAVIGATION */}
          <NavbarContainer>
            <Link to="/">
              <img src={Logo} alt="A cute, personable robot" />
            </Link>
            <NavbarItemsContainer>
              <NavbarItem>Team</NavbarItem>
              <NavbarItem to="/pricing">Pricing</NavbarItem>
              <NavbarItem>Blog</NavbarItem>
              <h2 onClick={login}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>

          <LoginContainer>
            <LoginContent>
              <LogoImage src={logo} alt="loading" className="ld ld-bounce" />
              <p>Please login to view this page or return Home.</p>
              <ButtonContainer>
                <StyledButton variant="contained" onClick={e => login()}>
                  Login
                </StyledButton>
                <StyledLink to="/">
                  <StyledButton variant="outlined">Home</StyledButton>
                </StyledLink>
              </ButtonContainer>
            </LoginContent>
          </LoginContainer>
        </>
      );
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
