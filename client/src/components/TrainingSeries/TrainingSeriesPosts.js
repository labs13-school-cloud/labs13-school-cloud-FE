// displays all posts of a training series
import React from "react";

// Components
import PostModal from "../Modals/PostModal";

// Redux
import { connect } from "react-redux";
import { getTrainingSeriesPosts, createAPost } from "../../store/actions";

//PropTypes
import PropTypes from "prop-types";

// Styling
import Button from "@material-ui/core/Button";

class TrainingSeriesPosts extends React.Component {
  state = {
    series: this.props.trainingSeries.find(
      series => `${series.trainingSeriesID}` === this.props.match.params.id
    )
  };

  componentDidMount() {
    this.getTrainingSeriesWithPosts(this.props.match.params.id);
  }

  getTrainingSeriesWithPosts = id => {
    this.props.getTrainingSeriesPosts(id);
  };
  render() {
    // const series = this.props.trainingSeries.find(
    //   series => `${series.trainingSeriesID}` === this.props.match.params.id
    // );

    return (
      <>
        <PostModal trainingSeries={this.props.singleTrainingSeries} createAPost={this.props.createAPost} />
        {this.props.isLoading && <p>Please wait...</p>}
        {!this.props.isLoading && 
        <p>{this.props.singleTrainingSeries.title}</p>}
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.postsReducer.isLoading,
  singleTrainingSeries: state.postsReducer.singleTrainingSeries,
  posts: state.postsReducer.posts
});

TrainingSeriesPosts.propTypes = {};

export default connect(
  mapStateToProps,
  { getTrainingSeriesPosts, createAPost }
)(TrainingSeriesPosts);
