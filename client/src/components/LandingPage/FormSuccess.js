import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { ArrowUpward } from "@material-ui/icons";

import Logo from "../../img/training-bot.png";
//Auth
import { login } from "../../Auth/Auth";

class FormSuccess extends React.Component {
    render() {
        return (
          <>
            <LandingPageContainer>
              {/* NAVIGATION */}
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
              <ContentContainer>
              <Typography variant="h3">Thank You</Typography>
              <p>Thank you for contacting us. Your message was submitted successfully. <Link to="/">Click here</Link> to return to the home page.</p>
              </ContentContainer>
              <FooterContainer>
                <FooterItemsContainer>
                  <Link to="/team">Team</Link>
                  <Link to="/pricing">Pricing</Link>
                </FooterItemsContainer>
                <ArrowUpward onClick={() => this.scrollToTop()} />
              </FooterContainer>
            </LandingPageContainer>
          </>
        );
      }
    }
    
    export default FormSuccess;
    
    const LandingPageContainer = styled.div`
      margin: 0 auto;
      width: 100%;
      max-width: 1280px;
      height: 100vh;
      background-color: white;
      box-sizing: border-box;
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
      box-sizing: border-box;
      img {
        width: 50px;
      }
      h2 {
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
    
    const ContentContainer = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 95%;
      height: 70%;
      margin: 40px auto;
      background-color: #fafafa;
      padding: 30px 20px;
      box-sizing: border-box;
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
    
    const FooterContainer = styled.div`
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 100px;
      position: sticky;
        top: 100%;
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