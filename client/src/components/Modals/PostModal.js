// displays individual post modal
import React from "react";

//Prop Types
import PropTypes from "prop-types";

// Styles
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 175,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  }
});

class PostModal extends React.Component {
  state = {
    open: false,
    isUpdating: false,
    post: {
      postName: "",
      postDetails: "",
      link: "",
      daysFromStart: 1,
      trainingSeriesID: ""
    }
  };

  componentDidMount() {
    this.props.modalType === "edit" &&
      this.setState({
        post: {
          postName: this.props.post.postName,
          postDetails: this.props.post.postDetails,
          link: this.props.post.link,
          daysFromStart: this.props.post.daysFromStart,
          trainingSeriesID: this.props.post.trainingSeriesID
        }
      });
  }

  handleOpen = () => {
    this.setState({
      open: true
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
    });
  };

  clearForm = () => {
    this.setState({
      post: {
        ...this.state.post,
        postName: "",
        postDetails: "",
        link: "",
        daysFromStart: 1,
        trainingSeriesID: ""
      }
    });
  };

  handlePostSubmit = e => {
    e.preventDefault();
    if (this.props.modalType === "edit") {
      this.props.editPost(this.props.post.postID, this.state.post)
    } else {
      this.props.createAPost(this.state.post);
      this.clearForm();
    }
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Button onClick={this.handleOpen}>
          {this.props.modalType === "edit" ? "Edit " : "Create New "} post{" "}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <p>{this.props.modalType === "edit" ? "Edit Post" : "Add Post"}</p>
            <form onSubmit={e => this.handlePostSubmit(e)}>
              <input
                type="text"
                name="postName"
                onChange={this.handleChange}
                value={this.state.post.postName}
              />
              <input
                type="textarea"
                name="postDetails"
                onChange={this.handleChange}
                value={this.state.post.postDetails}
              />
              <input
                type="text"
                name="link"
                onChange={this.handleChange}
                value={this.state.post.link}
              />
              <input
                type="number"
                name="daysFromStart"
                onChange={this.handleChange}
                value={this.state.post.daysFromStart}
                step="1"
                min="1"
              />
              <Button type="submit">Submit</Button>
            </form>
            <Button type="button" onClick={this.handleClose}>
              Cancel
            </Button>
          </div>
        </Modal>
      </>
    );
  }
}

PostModal.propTypes = {};

const PostModalWrapped = withStyles(styles)(PostModal);

export default PostModalWrapped;
