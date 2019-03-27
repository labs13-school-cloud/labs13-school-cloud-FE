// component to contain all the components related to training series
import React, { Component } from "react";

//Components
import TrainingSeriesList from "./TrainingSeriesList";
import TrainingSeriesModal from "../Modals/TrainingSeriesModal";

//Axios
import axios from "axios";

class TrainingSeriesView extends Component {
  state = {
    data: null,
    isUpdated: false
  };

  componentDidMount() {
    this.setState({ data: this.props.userData });
  }

  getAllTrainingSeries = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}/api/users/${
          this.state.data.user.userID
        }/training-series`
      )
      .then(res => {
        this.setState({
          data: {
            ...this.state.data,
            trainingSeries: res.data.userTrainingSeries
          }
        });
      })
      .catch(err => console.log(err));
  };

  // updateTrainingSeries = trainingSeries => {
  //   this.setState({ data: { ...trainingSeries } });
  // };

  // updateStatus = () =>
  //   this.setState(prevProps => ({ isUpdated: !prevProps.isUpdated }));

  render() {
    return (
      <div>
        {this.state.data && (
          <>
            <TrainingSeriesModal
              getAllTrainingSeries={this.getAllTrainingSeries}
              userID={this.state.data.user.userID}
            />
            <TrainingSeriesList trainingSeriesData={this.state.data} />
          </>
        )}
      </div>
    );
  }
}

export default TrainingSeriesView;
