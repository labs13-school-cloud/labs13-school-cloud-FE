import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

//Styling
import {
  NavigationContainer,
  NavigationTop,
  NavItemsContainer,
  NavLinkItems,
  NavigationLogo,
  RightItemsContainer,
  LogoutStyling
} from "./styles.js";
import Avatar from "@material-ui/core/Avatar";

//Logo
import Logo from "img/training-bot.png";

//AUTH
import { login, logout } from "Auth/Auth";

class AppBar extends Component {
  render() {
    return (
      <NavigationContainer>
        <NavigationTop />
        <NavItemsContainer>
          {this.props.history.location.pathname === "/" ? (
            <>
              <NavigationLogo alt="A cute, personable robot" src={Logo}>
                Link
              </NavigationLogo>
              <NavLinkItems>
                <Link to="/home">Dashboard</Link>
                <Link to="/pricing">Pricing</Link>
              </NavLinkItems>
              <p onClick={() => login()}>Login</p>
            </>
          ) : (
            <>
              <Link to="/home">
                <NavigationLogo alt="A cute, personable robot" src={Logo} />
              </Link>
              <RightItemsContainer>
                <Link to="/home/profile">
                  {" "}
                  <Avatar
                    data-tour="6"
                    src={JSON.parse(localStorage.getItem("Profile")).picture}
                    alt={JSON.parse(localStorage.getItem("Profile")).name}
                  />
                </Link>
                <LogoutStyling onClick={() => logout()}>Logout</LogoutStyling>
              </RightItemsContainer>
            </>
          )}
        </NavItemsContainer>
      </NavigationContainer>
    );
  }
}

export default withRouter(AppBar);
