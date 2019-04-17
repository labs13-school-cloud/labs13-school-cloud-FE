import React from "react";
import styled from "styled-components";
import { ArrowUpward } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import Logo from "../../img/training-bot.png";
import Alex from "../../img/tb-aking.jpeg";
import Brandon from "../../img/tb-blent.jpeg";
import LeighAnn from "../../img/tb-lfriedel.jpeg";
import Mike from "../../img/tb-mlanders.jpeg";
import Nate from "../../img/tb-nboyette.jpeg";
//Auth
import { login } from "../../Auth/Auth";

const styles = theme => ({
  root: {
    width: "75%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    margin: "0 auto",
    fontSize: "1rem"
  },
  table: {
    minWidth: 400
  }
});

const Team = props => {
    const { classes } = props;
  return (
    <LandingPageContainer>
      <NavbarContainer>
        <Link to="/">
          <img src={Logo} alt="A cute, personable robot" />
        </Link>
        <NavbarItemsContainer>
          <NavbarItem to="/team">Team</NavbarItem>
          <NavbarItem to="/pricing">Pricing</NavbarItem>
          <h2 onClick={login}>Sign In</h2>
        </NavbarItemsContainer>
      </NavbarContainer>
      <TeamContainer>
<h3>The Team</h3>
<TeamInfoContainer>
<img src={Alex} alt="Alex King" />
<img src={Brandon} alt="Brandon Lent" />
<img src={LeighAnn} alt="Leigh-Ann Friedel" />
<img src={Mike} alt="Mike Landers" />
<img src={Nate} alt="Nate Boyette" />
</TeamInfoContainer>
      </TeamContainer>
      <FooterContainer>
        <FooterItemsContainer>
          <Link to="/team">Team</Link>
          <Link to="/pricing">Pricing</Link>
        </FooterItemsContainer>
        <ArrowUpward onClick={() => window.scrollTo(0, 0)} />
      </FooterContainer>
    </LandingPageContainer>
  );
};

export default withStyles(styles)(Team);

const LandingPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  background-color: white;
`;

const NavbarContainer = styled.nav`
  height: 75px;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f4f8;
  padding: 0 25px;
  img {
    width: 50px;
  }
  h2,
  a {
    margin-left: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  h2 {
    color: #451476;
    border: 1px solid #451476;
    background-color: white;
    padding: 8px;
    border-radius: 7%;
    &:hover {
      background-color: #451476;
      color: white;
    }
  }
  h3 {
    color: #451476;
  }
`;
const NavbarItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const NavbarItem = styled(Link)`
  margin-left: 30px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;

const TeamContainer = styled.div`
display: flex;
  justify-content: center;
  flex-direction: column;
  width: 85%;
  margin: 40px auto;
  background-color: #fafafa;
  padding: 30px 20px;
  h3 {
    color: #451476;
    font-size: 32px;
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const TeamInfoContainer = styled.div`
display: flex;
flex-wrap: wrap;

img {
    max-width: 200px;
    width: 100%;
    max-height: 200px;
    height: 100%;
    border-radius: 5px;
}
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 100px;
  svg {
    margin: 0 auto;
    font-size: 30px;
    cursor: pointer;
  }
`;

const FooterItemsContainer = styled.div`
  background-color: #451476;
  display: flex;
  color: white;
  justify-content: center;
  width: 90%;
  a {
    font-size: 16px;
    font-weight: 500;
    padding: 16px 20px;
    cursor: pointer;
    text-decoration: none;
  }

  a:visited {
    color: white;
  }
`;
