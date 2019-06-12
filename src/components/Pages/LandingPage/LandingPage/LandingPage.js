// contains all components for landing page
import React from "react";
import { scroller, animateScroll as scroll } from "react-scroll";
import CssBaseline from "@material-ui/core/CssBaseline";

//Styling
import {
  LandingPageContainer,
  NavbarContainer,
  NavbarItemsContainer,
  NavbarItem,
  FirstSection,
  MarketingContentContainer,
  MarketingSection,
  MarketingImage,
  MarketingContent,
  LandingPageContentContainer,
  LandingPageButtonContainer,
  FooterContainer,
  FooterItemsContainer,
  GetStartedButton,
  LogoImage
} from "./styles.js";
import Button from "@material-ui/core/Button";

//Icons & Images
import { ArrowUpward } from "@material-ui/icons";
import Logo from "img/training-bot.png";
import undrawCoworker from "img/undraw_co-workers_ujs6.svg";
import undrawNotify from "img/undraw_notify_88a4.svg";
import undrawTask from "img/undraw_personal_text_vkd8.svg";

//Auth
import { login } from "Auth/Auth";

class LandingPage extends React.Component {
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
        <CssBaseline />
        <LandingPageContainer>
          {/* NAVIGATION */}
          <NavbarContainer>
            <img src={Logo} alt="A cute, personable robot" />
            <NavbarItemsContainer>
              <NavbarItem href="/team">Team</NavbarItem>
              <NavbarItem href="/pricing">Pricing</NavbarItem>
              <h2 onClick={login}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>
          {/* JUMBOTRON STYLED SECTION */}
          <FirstSection>
            <LandingPageContentContainer>
              <h1>Training Bot</h1>
              <p>
                Training bot is a message scheduler that bridges the gap between
                your training materials and employees. Automatically deliver
                resources to team members on your schedule with just a few
                clicks.
              </p>
              <LandingPageButtonContainer>
                <Button onClick={login}>Get Started</Button>
                <Button variant="outlined" onClick={() => this.scrollTo(500)}>
                  Learn More
                </Button>
              </LandingPageButtonContainer>
            </LandingPageContentContainer>
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
                  employees{"'"} recurring training modules.
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
export default LandingPage;
