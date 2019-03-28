import React, { Component } from "react";

//Components
import TrainingSeriesList from "./TrainingSeriesList";
import TrainingSeriesModal from "../Modals/TrainingSeriesModal";

class TrainingSeriesSubView extends Component {
  render() {
    return (
      <>
        <TrainingSeriesModal
          getTrainingSeries={this.props.getTrainingSeries}
          userID={this.props.userID}
        />
        <TrainingSeriesList
          deleteTrainingSeries={this.props.deleteTrainingSeries}
          trainingSeries={this.props.trainingSeries}
          match={this.props.match}
        />
      </>
    );
  }
}

export default TrainingSeriesSubView;
