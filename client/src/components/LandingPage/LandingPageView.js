// contains all components for landing page
import React from "react";
import { Link } from "react-router-dom";
import { scroller, animateScroll as scroll } from "react-scroll";
//Styling
import styled from "styled-components";
import Button from "@material-ui/core/Button";
//Icons & Images
import FaceIcon from "@material-ui/icons/Face";
import { ArrowUpward } from "@material-ui/icons";
import Logo from "../../img/training-bot.png";

import undrawCoworker from "../../img/undraw_co-workers_ujs6.svg";
import undrawNotify from "../../img/undraw_notify_88a4.svg";
import undrawTask from "../../img/undraw_personal_text_vkd8.svg";
//Auth
import { login } from "../../Auth/Auth";

class LandingPageView extends React.Component {
  scrollTo() {
    scroller.scrollTo("MarketingContent", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart"
    });
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  render() {
    return (
      <>
        <LandingPageContainer>
          {/* NAVIGATION */}
          <NavbarContainer>
            <img src={Logo} alt="A cute, personable robot" />
            <NavbarItemsContainer>
              <NavbarItem to="/team">Team</NavbarItem>
              <NavbarItem to="/pricing">Pricing</NavbarItem>
              <h2 onClick={login}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>
          {/* JUMBOTRON STYLED SECTION */}
          <FirstSection>
            <LandingPageContentContainer>
              <h1>Training Bot</h1>
              <p>
                "Empowers team leaders with tools to assist with their team’s
                continual learning by sending automated Text messages/emails on
                a scheduled interval to team members”.
              </p>
              <LandingPageButtonContainer>
                <Button onClick={login}>Get Started</Button>
                <Button variant="outlined" onClick={() => this.scrollTo(500)}>
                  Learn More
                </Button>
              </LandingPageButtonContainer>
            </LandingPageContentContainer>
            <VideoContainer>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/CQ85sUNBK7w"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Marketing Video"
              />
            </VideoContainer>
          </FirstSection>
          {/* MARKETING CONTAINER / UNDRAW PHOTO SECTION */}
          <MarketingContentContainer name="MarketingContent">
            <MarketingSection>
              <MarketingImage>
                <img
                  src={undrawCoworker}
                  alt="A drawing of an employee standing next to a folder"
                />
              </MarketingImage>
              <MarketingContent>
                <h3>Manage Your team. Stress Free.</h3>
                <p>
                  With Training Bot, we take the stress out of managing your
                  employees recurring training modules.
                </p>
              </MarketingContent>
            </MarketingSection>
            <MarketingSection>
              <MarketingImage>
                <img
                  src={undrawNotify}
                  alt="A drawing of an employee with a explanation mark."
                />
              </MarketingImage>
              <MarketingContent>
                <h3>Keep Your Engagement High.</h3>
                <p>
                  Your employees will no longer forget if they have a task to
                  accomplish. Training Bot handles that for you.
                </p>
              </MarketingContent>
            </MarketingSection>
            <MarketingSection>
              <MarketingImage>
                <img
                  src={undrawTask}
                  alt="A drawing of an employee moving text messages."
                />
              </MarketingImage>
              <MarketingContent>
                <h3>Notifications, Your Way.</h3>
                <p>
                  Send text messages or email notifications to your employees.
                  Modern communication for the mordern workplace.
                </p>
              </MarketingContent>
            </MarketingSection>
          </MarketingContentContainer>
          {/* TESTIMONY SECTION
          <TrainingBotTestimonyContainer>
            <TestimonyContainer>
              <TestimonyPerson>
                <FaceIcon /> <h4>Random Cat 1</h4>
              </TestimonyPerson>
              <p>
                "Pork sirloin burgdoggen venison strip steak beef brisket kevin
                tenderloin"
              </p>
            </TestimonyContainer>
            <TestimonyContainer>
              <TestimonyPerson>
                <FaceIcon />
                <h4>Random Tabby cat</h4>
              </TestimonyPerson>
              <p>
                "Pork sirloin burgdoggen venison strip steak beef brisket kevin
                tenderloin"
              </p>
            </TestimonyContainer>
          </TrainingBotTestimonyContainer>
          {/* STORY SECTION 
          <TrainingBotStoryContainer>
            <h3>The Training Bot Story</h3>
            <StorySection>
              <StoryContent>
                Pork chop prosciutto beef ribs cow, fatback flank t-bone sirloin
                strip steak cupim pork belly. Boudin shank hamburger, bacon
                kielbasa pork chop meatloaf short ribs. Pork sirloin burgdoggen
                venison strip steak beef brisket kevin tenderloin. Chicken
                buffalo frankfurter porchetta, rump short ribs andouille.
                Meatloaf short loin rump, beef porchetta filet mignon leberkas.
              </StoryContent>
              <StoryContent>
                Pork chop prosciutto beef ribs cow, fatback flank t-bone sirloin
                strip steak cupim pork belly. Boudin shank hamburger, bacon
                kielbasa pork chop meatloaf short ribs. Pork sirloin burgdoggen
                venison strip steak beef brisket kevin tenderloin. Chicken
                buffalo frankfurter porchetta, rump short ribs andouille.
                Meatloaf short loin rump, beef porchetta filet mignon leberkas.
              </StoryContent>
            </StorySection>
          </TrainingBotStoryContainer>
          {/* GET STARTED CONTAINER
          <GetStartedContainer>
            <IconBox>
              <img src={Logo} alt="This robot loves showing up" />
            </IconBox>
            <GetStartedBox>
              <h4>Use Training Bot for FREE</h4>
              <Button>Try Now</Button>
            </GetStartedBox>
          </GetStartedContainer> */}
          <FirstSection>
            <LandingPageContentContainer>
              <h1>Get Started For Free!</h1>
              <p>
                Let Training Bot take the stress out of managing your team's
                reminders. Get started for FREE now!
              </p>
              <LogoImage src={Logo} alt="A cute, personable robot" />
              <GetStartedButton>
                <Button onClick={login}>Get Started</Button>
              </GetStartedButton>
            </LandingPageContentContainer>
          </FirstSection>
          <FooterContainer>
            <FooterItemsContainer>
              <a href="/team">Team</a>
              <a href="/pricing">Pricing</a>
            </FooterItemsContainer>
            <ArrowUpward onClick={() => this.scrollToTop()} />
          </FooterContainer>
        </LandingPageContainer>
      </>
    );
  }
}
export default LandingPageView;

const LandingPageContainer = styled.div`
  margin: 0 auto;

  width: 100%;
  max-width: 1280px;
  background-color: white;
  @media (max-width: 700px) {
    padding: 0;
  }
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

  @media (max-width: 700px) {
    padding: 0 5px;
  }

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
    padding: 4px 10px;
    border-radius: 7%;
    &:hover {
      background-color: #451476;
      color: white;
    }

    @media (max-width: 700px) {
      width: 75px;
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

const FirstSection = styled.div`
  background-color: #fafafa;
  width: 95%;
  margin: 40px auto 20px;
  padding: 75px 10px;
  display: flex;
  border-radius: 5px;
  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
  }
  p {
    text-align: center;
  }
`;

const MarketingContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 100px;
  padding: 0px 30px;
`;

const MarketingSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  img {
    width: 100%;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;

const MarketingImage = styled.div`
  width: 40%;
  @media (max-width: 700px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const MarketingContent = styled.div`
  width: 50%;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    width: 100%;
    font-size: 32px;
    color: #451476;
    margin-bottom: 0;
    text-align: left;
  }
  p {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`;

const LandingPageContentContainer = styled.div`
  width: 50%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  h1 {
    margin-top: 0;
    color: #451476;
    font-size: 42px;
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0;
    text-align: center;
    p {
      padding: 0 50px;
    }
  }
`;

const LandingPageButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  button:first-child {
    margin: 0 10px;
    background-color: #451476;
    color: white;
    padding: 0 16px;
  }
  button:nth-child(2) {
    border: 1px solid #451476;
    color: #451476;

    &:hover {
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

const TrainingBotStoryContainer = styled.div`
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

const StorySection = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin: 0 auto;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;
const StoryContent = styled.p`
  padding: 0 10px;
`;

const TrainingBotTestimonyContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 83%;
  margin: 0 auto;
`;

const TestimonyContainer = styled.div`
  display: flex;
  padding: 5px;
  flex-direction: column;
  margin: 0 20px;
  h4 {
    margin: 0;
    color: #451476;
  }
`;

const TestimonyPerson = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: #2699fb;
    margin-right: 5px;
  }
`;

const GetStartedContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    width: 70%;
  }
`;
const IconBox = styled.div`
  background-color: #7fc4fd;
  width: 25%;

  img {
    width: 100%;
    position: relative;
    left: -50%;
  }
`;
const GetStartedBox = styled.div`
  background-color: #fafafa;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h4 {
    color: #451476;
    font-size: 24px;
  }
  button {
    margin: 0 10px;
    background-color: #7fc4fd;
    color: white;
    width: 100px;

    &:hover {
      background-color: #451476;
      color: white;
    }
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

const GetStartedButton = styled.div`
  button {
    margin: 10px 10px 0;
    background-color: #451476;
    color: white;
    &:hover {
      margin: 0 15px;
      background-color: #451476;
      color: white;
    }
  }
`;

const LogoImage = styled.img`
  width: 50px;
`;
