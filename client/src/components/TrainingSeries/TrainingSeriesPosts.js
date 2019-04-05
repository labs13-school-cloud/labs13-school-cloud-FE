// displays all posts of a training series
import React from "react";

// Components
import PostModal from "../Modals/PostModal";
import PostOptionsModal from "../Modals/PostOptionsModal";

// Redux
import { connect } from "react-redux";
import {
  getTrainingSeriesPosts,
  createAPost,
  editPost,
  deletePost
} from "../../store/actions";
import { withStyles } from "@material-ui/core/styles";

// Styling
import {
  Paper,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@material-ui/core/";

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 100,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  secondaryAction: {
    dispaly: "flex",
    flexDirection: "row"
  }
});
class TrainingSeriesPosts extends React.Component {
  componentDidMount() {
    this.getTrainingSeriesWithPosts(this.props.match.params.id);
  }

  getTrainingSeriesWithPosts = id => {
    this.props.getTrainingSeriesPosts(id);
  };

  deletePost = (e, id) => {
    e.preventDefault();
    console.log(id);
    this.props.deletePost(id);
  };

  render() {
    const { classes } = this.props;
    console.log("POSTS", this.props);
    return (
      <>
        {/* Gives app time to fetch data */}
        {this.props.isLoading && <p>Please wait...</p>}
        {!this.props.isLoading && (
          <Paper className={classes.paper}>
            <h1>{this.props.singleTrainingSeries.title}</h1>
            <PostModal
              trainingSeries={this.props.singleTrainingSeries}
              createAPost={this.props.createAPost}
              editPost={this.props.editPost}
            />
            <div>
              {this.props.posts.map(post => (
                <ListItem key={post.postID} className={classes.secondaryAction}>
                  <ListItemText
                    primary={post.postName}
                    secondary={post.postDetails}
                  />
                  <ListItemSecondaryAction className={classes.secondaryAction}>
                    {/* <IconButton aria-label="Delete"> */}
                    <p>{post.daysFromStart} days</p>
                    <PostOptionsModal
                      editPost={this.props.editPost}
                      deletePost={this.props.deletePost}
                      singleTrainingSeries={this.props.singleTrainingSeries}
                      post={post}
                    />
                    {/* </IconButton> */}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </div>
          </Paper>
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
  { getTrainingSeriesPosts, createAPost, editPost, deletePost }
)(withStyles(styles)(TrainingSeriesPosts));
