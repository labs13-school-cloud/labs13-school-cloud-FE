// component to contain all the components related to training series
import React, { Component } from "react";

//REDUX
import { connect } from "react-redux";
import { getTrainingSeries } from "../../store/actions/";

//Components
import TrainingSeriesList from "./TrainingSeriesList";
import TrainingSeriesModal from "../Modals/TrainingSeriesModal";

class TrainingSeriesView extends Component {
  componentDidMount() {
    this.getTrainingSeries();
  }

  componentDidUpdate() {
    if (this.props.isDoneAdding) {
      this.getTrainingSeries();
    }
  }

  getTrainingSeries = () => {
    this.props.getTrainingSeries(this.props.userId);
  };

  render() {
    return (
      <div>
        <>
          <TrainingSeriesModal
            getTrainingSeries={this.props.getTrainingSeries}
            userID={this.props.userId}
          />
          <TrainingSeriesList trainingSeries={this.props.trainingSeries} />
        </>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    isLoading: state.trainingSeriesReducer.isLoading,
    isDoneAdding: state.trainingSeriesReducer.isDoneAdding
  };
};

export default connect(
  mapStateToProps,
  {
    getTrainingSeries
  }
)(TrainingSeriesView);
