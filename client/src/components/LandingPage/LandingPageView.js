// contains all components for landing page
import React from 'react';
import { Link } from 'react-router-dom';
import { scroller, animateScroll as scroll } from 'react-scroll';

//Styling
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

//Icons & Images
import { ArrowUpward } from '@material-ui/icons';
import Logo from '../../img/training-bot.png';
import undrawCoworker from '../../img/undraw_co-workers_ujs6.svg';
import undrawNotify from '../../img/undraw_notify_88a4.svg';
import undrawTask from '../../img/undraw_personal_text_vkd8.svg';

//Auth
import { login } from '../../Auth/Auth';

class LandingPageView extends React.Component {
  scrollTo() {
    scroller.scrollTo('MarketingContent', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
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
                Training Bot empowers team leaders with tools to assist with
                their team’s continual learning by sending automated text
                messages and emails on scheduled intervals.
              </p>
              <LandingPageButtonContainer>
                <Button onClick={login}>Get Started</Button>
                <Button variant="outlined" onClick={() => this.scrollTo(500)}>
                  Learn More
                </Button>
              </LandingPageButtonContainer>
            </LandingPageContentContainer>
            {/* <VideoContainer>
              <iframe
                width="100%"
                height="400"
                src="https://www.youtube.com/embed/CQ85sUNBK7w"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Marketing Video"
              />
            </VideoContainer> */}
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
                <h3>Manage Your Team. Stress Free.</h3>
                <p>
                  With Training Bot, we take the stress out of managing your
                  employees' recurring training modules.
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
                  Modern communication for the modern workplace.
                </p>
              </MarketingContent>
            </MarketingSection>
          </MarketingContentContainer>
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
  color: #441476;
  &:visited {
    color: #441476;
  }
`;

const FirstSection = styled.div`
  background-color: #fafafa;
  width: 95%;
  margin: 40px auto 20px;
  padding: 75px 10px;
  display: flex;
  border-radius: 5px;
  h3 {
    width: 100%;
  }
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
    color: white;
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
      /* margin: 0 15px; */
      background-color: #451476;
      color: white;
    }
  }
`;

const LogoImage = styled.img`
  width: 50px;
`;
