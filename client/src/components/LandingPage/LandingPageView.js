// contains all components for landing page
import React from "react";

//Styling
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Logo from "../../img/training-bot.png";

import { login } from "../../Auth/Auth";

class LandingPageView extends React.Component {
  render() {
    return (
      <>
        <LandingPageContainer>
          <NavbarContainer>
            <img src={Logo} alt='A cute, personable robot' />
            <NavbarItemsContainer>
              <h3>Team</h3>
              <h3>Pricing</h3>
              <h3>Blog</h3>
              <h2 onClick={login}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>
          <FirstSection>
            <LandingPageContentContainer>
              <h1>Training Bot</h1>
              <p>
                “Training Bot empowers team leaders with tools to assist with
                their team’s continual learning by sending automated Text
                messages/emails on a scheduled interval to team members”.
              </p>
              <LandingPageButtonContainer>
                <Button onClick={login}>Get Started</Button>
                <Button variant='outlined'>Learn More</Button>
              </LandingPageButtonContainer>
            </LandingPageContentContainer>
            <VideoContainer>
              <iframe
                width='100%'
                height='400'
                src='https://www.youtube.com/embed/CQ85sUNBK7w'
                frameborder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowfullscreen
              />
            </VideoContainer>
          </FirstSection>
        </LandingPageContainer>
      </>
    );
  }
}
export default LandingPageView;

const LandingPageContainer = styled.div`
  margin: 0 auto;

  width: 100%;
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
  h3 {
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

const FirstSection = styled.div`
  background-color: #ffffff;
  width: 95%;
  margin: 20px auto;
  padding: 50px 10px;
  display: flex;
`;

const LandingPageContentContainer = styled.div`
  width: 50%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
  h1 {
    color: #451476;
    font-size: 42px;
  }
  p {
    color: #2699fb;
  }
`;

const LandingPageButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  button:first-child {
    margin: 0 10px;
    background-color: #451476;
    color: white;
  }
  button:nth-child(2) {
    border: 1px solid #451476;
    color: #451476;
    &: hover {
      background-color: #451476;
      color: white;
    }
  }
`;

const VideoContainer = styled.div`
  width: 50%;
  @media (max-width: 1000px) {
    display: none;
  }
`;
