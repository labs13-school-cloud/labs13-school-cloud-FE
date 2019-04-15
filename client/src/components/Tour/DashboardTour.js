import React, {Component} from "react";
import Tour from "reactour";

export default class DashboardTour extends Component {
  changeTour = tourName => {
    this.setState({tourToDisplay: tourName});
  };

  render() {
    return (
      <>
        {this.state.tourToDisplay === "Dashboard" && (
          <Tour
            accentColor="#451477"
            steps={this.state.dashboardSteps}
            isOpen={this.props.isTourOpen}
            onRequestClose={this.props.closeTour}
          />
        )}
        {this.state.tourToDisplay === "AddTrainingSeries" && (
          <Tour
            accentColor="#451477"
            steps={this.state.addTrainingSeriesSteps}
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
      },
      {
        selector: '[data-tour="2"]',
        content:
          "This is your Training Series. Your training series will be where the content getting sent to your team members will be stored.",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="3"]',
        content: "This is where your notifications will show up. ",
        stepInteraction: false,
      },
      {
        selector: '[data-tour="4"]',
        content:
          "I'll now walk you through getting started. Let's create our first Training Series",
        action: node => {
          if (!node) {
            this.changeTour("AddTrainingSeries");
          }
        },
      },
    ],
    addTrainingSeriesSteps: [
      {
        selector: '[data-tour="5"]',
        content: "Enter your title and click submit",
        stepInteraction: true,
      },
    ],
  };
}
