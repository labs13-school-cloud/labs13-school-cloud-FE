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
  //   state = {
  //     open: false,
  //     isUpdating: false,
  //     post: {
  //       postName: "",
  //       postDetails: "",
  //       link: "",
  //       daysFromStart: 1
  //     }
  //   };

  componentDidMount() {
    this.getTrainingSeriesWithPosts(this.props.match.params.id);
  }

  getTrainingSeriesWithPosts = id => {
    this.props.getTrainingSeriesPosts(id);
  };

  //   handleOpen = () => {
  //     this.setState({
  //       open: true,
  //       post: {
  //         ...this.state.post,
  //         trainingSeriesID: this.props.singleTrainingSeries.trainingSeriesID
  //       }
  //     });
  //   };

  //   handleClose = () => {
  //     this.setState({ open: false });
  //   };

  //   handleChange = e => {
  //     e.preventDefault();
  //     this.setState({
  //       ...this.state,
  //       post: {
  //         ...this.state.post,
  //         [e.target.name]: e.target.value
  //       }
  //     });
  //   };

  //   addAPost = e => {
  //     e.preventDefault();
  //     console.log("post", this.state.post);
  //     this.props.createAPost(this.state.post);
  //     this.setState({
  //       ...this.state,
  //       open: false,
  //       post: {
  //         ...this.state.post,
  //         postName: "",
  //         postDetails: "",
  //         link: "",
  //         daysFromStart: 1
  //       }
  //     });
  //   };

  //   updateModal = e => {
  //     e.preventDefault();
  //     this.setState({
  //       open: true,
  //       isUpdating: true,
  //       post: {
  //         postName: "",
  //         postDetails: "",
  //         link: "",
  //         daysFromStart: 1,
  //         trainingSeriesID: this.props.singleTrainingSeries.trainingSeriesID
  //       }
  //     });
  //   };

  render() {
    return (
      <>
        <PostModal
          trainingSeries={this.props.singleTrainingSeries}
          createAPost={this.props.createAPost}
          editPost={this.props.editPost}
        />
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
