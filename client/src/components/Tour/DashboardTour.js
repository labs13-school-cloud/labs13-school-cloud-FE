import React, {Component} from "react";
import Tour from "reactour";
import Progress from "../Progress/ProgressCircle";
import styled from "styled-components";

class DashboardTour extends Component {
  render() {
    return (
      <>
        {this.props.isTourOpen && (
          <Tour
            accentColor="#451477"
            steps={this.state.dashboardSteps}
            isOpen={this.props.isTourOpen}
            onRequestClose={this.props.closeTour}
          />
        )}
      </>
    );
  }
  state = {
    tourToDisplay: "Dashboard",
    dashboardSteps: [
      {
        content:
          "Welcome to Training Bot! Our little bot helper will get you through getting started!",
      },
      {
        selector: '[data-tour="1"]',
        content: "This is where you will see all of your team members.",
        stepInteraction: false,
        position: "top",
      },
      {
        selector: '[data-tour="2"]',
        content:
          "Once you have some team members, you can search through them by clicking this button.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="3"]',
        content: "Here you can create a new team member.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="4"]',
        content:
          "This is your Training Series. Your training series will be where the content getting sent to your team members will be stored.",
      },
      {
        selector: '[data-tour="5"]',
        content:
          "This is your notification window. Once you've assigned members to your training series, you will see all outgoing messages here.",
      },
      {
        selector: '[data-tour="6"]',
        content:
          "Your account information and current membership plan can be viewed by clicking your profile icon here.",
      },
      {
        content: (
          <Container>
            <p>
              We're super glad to have you apart of Training Bot. Please reach
              out to us if you have any questions or concerns.
            </p>
            <ImageContainer>
              <Progress />
            </ImageContainer>
          </Container>
        ),
      },
    ],
  };
}
export default DashboardTour;

const Container = styled.div``;

const ImageContainer = styled.div`
  margin-top: 65px;
  display: flex;
  justify-content: center;
  img {
    width: 50px;
  }
`;

// LEGACY CODE
// action: node => {
//   if (!node) {
//     this.changeTour("AddTrainingSeries");
//   }
// },
// addTrainingSeriesSteps: [
//   {
//     selector: '[data-tour="5"]',
//     content: "Enter your title and click submit",
//     stepInteraction: true,
//     disableKeyboardNavigation: false,
//   },
// ],
