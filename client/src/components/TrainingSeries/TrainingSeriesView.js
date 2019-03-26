// component to contain all the components related to training series
import React, { Component } from "react";

//Components
import TrainingSeriesList from "./TrainingSeriesList";

class TrainingSeriesView extends Component {
  render() {
    return (
      <div>
        <TrainingSeriesList userData={this.props.userData} />
      </div>
    );
  }
}

export default TrainingSeriesView;
