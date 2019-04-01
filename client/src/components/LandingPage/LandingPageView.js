// contains all components for landing page
import React from "react";

//Styling
import styled from "styled-components";
import Button from "@material-ui/core/Button";

class LandingPageView extends React.Component {
  render() {
    return (
      <>
        <LandingPageContainer>
          <LandingPageContentContainer>
            <h1>Training Bot</h1>
            <p>
              “Training Bot empowers team leaders with tools to assist with
              their team’s continual learning by sending automated Text
              messages/emails on a scheduled interval to team members”.
            </p>
            <LandingPageButtonContainer>
              <Button>Get Started</Button>
              <Button variant='outlined'>Learn More</Button>
            </LandingPageButtonContainer>
          </LandingPageContentContainer>
        </LandingPageContainer>
      </>
    );
  }
}
export default LandingPageView;

const LandingPageContainer = styled.div`
  margin: 0 auto;
  background-color: #f0f4f8;
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: #3dbd93;
    font-size: 42px;
  }
  p {
    color: #3dbd93;
  }
`;
const LandingPageContentContainer = styled.div`
  background-color: #FFFFFF
  height: 80%;
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 100px;
`;

const LandingPageButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  button:first-child {
    margin: 0 10px;
    background-color: #3dbd93;
    color: white;
  }
  button:nth-child(2) {
    border: 1px solid #3dbd93;
    &: hover {
      background-color: #3dbd93;
      color: white;
    }
  }
`;
