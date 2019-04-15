import React, { Component } from "react";
import Tour from "reactour";

export default class GuidedTour extends Component {
  render() {
    return (
      <Tour
        steps={steps}
        isOpen={this.props.isTourOpen}
        onRequestClose={this.props.closeTour}
      />
    );
  }
}

//Tour steps
const steps = [
  {
    content:
      "Welcome to Training Bot! Our little bot helper will get you through getting started!"
  },
  {
    selector: '[data-tour="1"]',
    content: "This is where you will see all of your team members.",
    stepInteraction: false
  },
  {
    selector: '[data-tour="2"]',
    content:
      "This is your Training Series. Your training series will be where the content getting sent to your team members will be stored.",
    stepInteraction: false
  },
  {
    selector: '[data-tour="3"]',
    content: "This is where your notifications will show up. ",
    stepInteraction: false
  },
  {
    selector: '[data-tour="4"]',
    content: ({ goTo }) => (
      <>
        <div>
          "I'll now walk you through getting started. Let's create our first
          Training Series"
        </div>
      </>
    )
  },
  {
    selector: '[data-tour="5"]',
    content:
      "Enter a title, such as 'New Employee Onboarding' and press 'create'"
  },
  {
    selector: '[data-tour="6"]',
    content:
      "I'll now walk you through getting started. Let's create our first Training Series"
  }
];
