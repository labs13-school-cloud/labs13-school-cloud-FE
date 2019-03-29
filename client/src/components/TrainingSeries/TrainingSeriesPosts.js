// displays all posts of a training series
import React from "react";

// Components
import PostModal from "../Modals/PostModal";

// Redux
import { connect } from "react-redux";
import {
  getTrainingSeriesPosts,
  createAPost,
  editPost
} from "../../store/actions";

//PropTypes
import PropTypes from "prop-types";

// Styling
import Button from "@material-ui/core/Button";

class TrainingSeriesPosts extends React.Component {

  componentDidMount() {
    this.getTrainingSeriesWithPosts(this.props.match.params.id);
  }

  getTrainingSeriesWithPosts = id => {
    this.props.getTrainingSeriesPosts(id);
  };

  render() {
    return (
      <>
        <PostModal
          trainingSeries={this.props.singleTrainingSeries}
          createAPost={this.props.createAPost}
          editPost={this.props.editPost}
        />
        {/* Gives app time to fetch data */}
        {this.props.isLoading && <p>Please wait...</p>}
        {!this.props.isLoading && (
          <>
            <h1>{this.props.singleTrainingSeries.title}</h1>
            <div>
              {this.props.posts.map(post => (
                <div key={post.postID}>
                  <h1>{post.postName}</h1>
                  <p>{post.postDetails}</p>
                  <p>{post.daysFromStart} days</p>
                  <PostModal
                    post={post}
                    createAPost={this.props.createAPost}
                    editPost={this.props.editPost}
                    modalType="edit"
                  />
                </div>
              ))}
            </div>
          </>
        )}
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
  { getTrainingSeriesPosts, createAPost, editPost }
)(TrainingSeriesPosts);
