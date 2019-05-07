// component to contain all the components related to training series
import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getTrainingSeries, deleteTrainingSeries } from "store/actions/";

//Components
// import TrainingSeriesSubView from './TrainingSeriesSubView';

const TrainingSeriesSubView = React.lazy(() =>
  import("./TrainingSeriesSubView")
);

// <Suspense fallback={<div>Loading...</div>}></Suspense>

class TrainingSeriesView extends Component {
  componentDidMount() {
    this.getTrainingSeries();
  }

  getTrainingSeries = () => {
    this.props.getTrainingSeries(this.props.userId);
  };

  deleteTrainingSeries = id => {
    this.props.deleteTrainingSeries(id);
  };

  render() {
    return (
      <>
        <Route
          exact
          path={`${this.props.match.path}`}
          render={props => (
            <Suspense fallback={<span />}>
              <TrainingSeriesSubView
                {...props}
                getMembersAssigned={this.props.getMembersAssigned}
                trainingSeries={this.props.trainingSeries}
                deleteTrainingSeries={this.deleteTrainingSeries}
                getTrainingSeries={this.props.getTrainingSeries}
                disableSnackbar={this.props.disableSnackbar}
                userId={this.props.userId}
              />
            </Suspense>
          )}
        />
      </>
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
    getTrainingSeries,
    deleteTrainingSeries
  }
)(TrainingSeriesView);
