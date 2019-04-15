import React, { Component } from "react";
import Tour from "reactour";

export default class GuidedTour extends Component {
  state = {
    steps: [
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
        content: ({ goTo, inDOM }) => (
          <div>
            <button onClick={() => goTo(5)}>Go to next step</button>
            "I'll now walk you through getting started. Let's create our first
            Training Series"
          </div>
        ),

        action: node => console.log(node)
      },
      {
        selector: `[data-tour="5"]`,
        content:
          "Enter a title, such as 'New Employee Onboarding' and press 'create'"
      },
      {
        selector: '[data-tour="6"]',
        content:
          "I'll now walk you through getting started. Let's create our first Training Series"
      }
    ]
  };
  render() {
    console.log(this.props);
    return (
      <Tour
        steps={this.state.steps}
        isOpen={this.props.isTourOpen}
        onRequestClose={this.props.closeTour}
        // customHelper={MyCustomHelper}
      />
    );
  }
}

// function MyCustomHelper(goToStep) {

// }
