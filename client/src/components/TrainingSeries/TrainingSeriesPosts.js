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
        open: false,
        post: {
          postName: "",
          postDetails: "",
          link: "",
          daysFromStart: 1, 
        }
      };

  componentDidMount() {
    this.getTrainingSeriesWithPosts(this.props.match.params.id);
  }

  getTrainingSeriesWithPosts = id => {
    this.props.getTrainingSeriesPosts(id);
  };

  handleOpen = () => {
    this.setState({ 
      open: true,
      post: {
        ...this.state.post,
        trainingSeriesID: this.props.singleTrainingSeries.trainingSeriesID
      }
     });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    })
  }

  addAPost = e => {
    e.preventDefault();
    console.log("post", this.state.post)
    this.props.createAPost(this.state.post);
    this.setState({
      ...this.state,
      open: false,
      post: {
        ...this.state.post,
        postName: "",
        postDetails: "",
        link: "",
        daysFromStart: 1,
      }
    }, this.getTrainingSeriesWithPosts(this.props.match.params.id))
  };

  render() {
    // const series = this.props.trainingSeries.find(
    //   series => `${series.trainingSeriesID}` === this.props.match.params.id
    // );

    return (
      <>
        <PostModal
          trainingSeries={this.props.singleTrainingSeries}
          createAPost={this.props.createAPost}
          addAPost={this.addAPost}
          handleChange={this.handleChange}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
          open={this.state.open}
          post={this.state.post}
        />
        {this.props.isLoading && <p>Please wait...</p>}
        {!this.props.isLoading && (
          <>
            <p>{this.props.singleTrainingSeries.title}</p>
            <div>
              {this.props.posts.map(post => (
                <div key={post.postID}>
                  <p>{post.postName}</p>
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
  { getTrainingSeriesPosts, createAPost }
)(TrainingSeriesPosts);
