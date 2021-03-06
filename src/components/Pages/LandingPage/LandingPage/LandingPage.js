// contains all components for landing page
import React from "react";
import { scroller, animateScroll as scroll } from "react-scroll";
import CssBaseline from "@material-ui/core/CssBaseline";

//Styling
import {
  LandingPageContainer,
  FirstSection,
  MarketingContentContainer,
  MarketingSection,
  MarketingImage,
  MarketingContent,
  LandingPageContentContainer,
  FooterContainer,
  FooterItemsContainer,
  GetStartedButton,
  LogoImage,
  HeroSection,
  BlueBox,
  HeroCaption,
  LogoSection,
  OwlLogo,
  ButtonContainer
} from "./styles.js";
import Button from "@material-ui/core/Button";

//Icons & Images
import { ArrowUpward } from "@material-ui/icons";
import Logo from "img/cloud.png";
import Cloud from "img/fullCloud.png";
import Confirmation from "img/confirmation.svg"
import classTeam from "img/class.svg";
import teach from "img/teach.svg"


//Auth

import { lock } from "Auth/Auth";

class LandingPage extends React.Component {
  handleChange = (e) => {
    this.setState({
        ...this.state,
        [e.target.name]: e.target.value
    });
  };

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
            <HeroSection>

                  <BlueBox>
                    <HeroCaption>
                    Connecting qualified volunteers to mentor children in environments with high student to teacher ratios.
                    </HeroCaption>
                  </BlueBox>
                  <LogoSection>
                    <OwlLogo
                      src={Cloud}
                      alt="Owl with Grad Cap in a Cloud"
                    />
                    <ButtonContainer>
                      <Button color="primary">
                        <h1 onClick={() => lock.login()}>Sign In</h1>
                      </Button>

                      <h1
                        style={{ color: "rgb(76, 76, 76)" }}
                      >
                        OR
                      </h1>
                      
                      <Button 
                        color={"primary"}
                        onClick={() => this.scrollTo(500)}
                      >
                        <h1>Learn More</h1>
                      </Button>
                    </ButtonContainer>
                  </LogoSection>
                </HeroSection>
        <CssBaseline />
        <LandingPageContainer>

          {/* MARKETING CONTAINER / UNDRAW PHOTO SECTION */}
          <MarketingContentContainer name="MarketingContent">
            <MarketingSection>
              <MarketingImage>
                <img
                  src={classTeam}
                  alt="A drawing of an employee standing next to a folder"
                />
              </MarketingImage>
              <MarketingContent>
                <h3>Manage Your Volunteers. Stress Free.</h3>
                <p>
                  With School In The Clouds, we take the stress out of managing
                  mentors. Create a Training Series to make sure they have the skills first.
                </p>
              </MarketingContent>
            </MarketingSection>
            <MarketingSection>
              <MarketingImage>
                <img
                  src={Confirmation}
                  alt="A drawing of two employees with a check mark."
                />
              </MarketingImage>
              <MarketingContent>
                <h3>Choose Who Works With Your Students.</h3>
                <p>
                  Once a Training Series has been completed, you can approve a mentor and add them to a class.
                </p>
              </MarketingContent>
            </MarketingSection>
            <MarketingSection>
              <MarketingImage>
                <img
                  src={teach}
                  alt="A drawing of a professor and a board."
                />
              </MarketingImage>
              <MarketingContent>
                <h3>Personalized Help.</h3>
                <p>
                  Mentors contribute specialized skills in your classrooms! Soon your students will have extra and you'll have extra free time.
                </p>
              </MarketingContent>
            </MarketingSection>
          </MarketingContentContainer>
          <FirstSection
          style={{ boxShadow:"10px 10px 5px 0px rgba(0,0,0,0.75)", background: "fafafa" }}
          >
            <LandingPageContentContainer
              style={{ background: "fafafa" }}
            >
              <h1>Get Started For Free!</h1>
              <p>
                Let School In The Clouds take the stress out of managing your classrooms. Get started for FREE now!
              </p>
              <LogoImage src={Logo} alt="Owl with Grad Cap in a Cloud" />
              <GetStartedButton>
                <Button onClick={() => lock.login()}>Get Started</Button>
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
