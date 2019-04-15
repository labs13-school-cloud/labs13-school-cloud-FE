import React, {Component} from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";

//Styling
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

//Logo
import Logo from "../../img/training-bot.png";

//AUTH
import {login, logout} from "../../Auth/Auth";

class AppBar extends Component {
  render() {
    return (
      <NavigationContainer>
        <NavigationTop />
        <NavItemsContainer>
          {this.props.history.location.pathname === "/" ? (
            <>
              <NavigationLogo src={Logo}>Link</NavigationLogo>
              <NavLinkItems>
                <Link to="/home">Dashboard</Link>
                <Link to="/pricing">Pricing</Link>
              </NavLinkItems>
              <p onClick={() => login()}>Login</p>
            </>
          ) : (
            <>
              <Link to="/home">
                <NavigationLogo src={Logo} />
              </Link>
              <RightItemsContainer>
                <Link to="/home/profile">
                  {" "}
                  <Avatar
                    data-tour="6"
                    src={JSON.parse(localStorage.getItem("Profile")).picture}
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

const NavigationContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NavigationTop = styled.div`
  background-color: #3dbd93;
  width: 100%;
  padding: 8px 0;
`;
const NavItemsContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
  padding: 0px 40px;
  width: 100%;
  /* @media only screen and (max-width: 600px) {
		padding: 0 10px;
	} */
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #690cb0;
    &: hover {
      cursor: pointer;
    }
  }
`;
const NavLinkItems = styled.div`
  display: flex;
`;
const NavigationLogo = styled.img`
  height: 35px;
`;
const RightItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const LogoutStyling = styled.a`
  padding-bottom: 10px;
`;
