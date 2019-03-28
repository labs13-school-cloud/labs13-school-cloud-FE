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
  // state = {
  //   open: false,
  //   post: {
  //     postName: "",
  //     postDetails: "",
  //     link: "",
  //     daysFromStart: 1, 
  //   }
  // };

  componentDidMount() {

  }

  // handleOpen = () => {
  //   this.setState({ 
  //     open: true,
  //     post: {
  //       ...this.state.post,
  //       trainingSeriesID: this.props.trainingSeries.trainingSeriesID
  //     }
  //    });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  // handleChange = e => {
  //   e.preventDefault();
  //   this.setState({
  //     ...this.state,
  //     post: {
  //       ...this.state.post,
  //       [e.target.name]: e.target.value
  //     }
  //   })
  // }

  // createAPost = e => {
  //   e.preventDefault();
  //   console.log("post", this.state.post)
  //   this.props.createAPost(this.state.post);
  //   this.setState({
  //     ...this.state,
  //     open: false,
  //     post: {
  //       ...this.state.post,
  //       postName: "",
  //       postDetails: "",
  //       link: "",
  //       daysFromStart: 1,
  //     }
  //   })
  // };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Button onClick={this.props.handleOpen}>Create a new post</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <p>Post Modal!</p>
            <form onSubmit={e => this.props.addAPost(e)}>
              <input type="text" name="postName" onChange={this.props.handleChange} value={this.props.post.postName} />
              <input type="textarea" name="postDetails" onChange={this.props.handleChange} value={this.props.post.postDetails} />
              <input type="text" name="link" onChange={this.props.handleChange} value={this.props.post.link} />
              <input type="number" name="daysFromStart" onChange={this.props.handleChange} value={this.props.post.daysFromStart} step="1" min="1" />
              <Button type="submit">Add Post</Button>
            </form>
            <Button type="button" onClick={this.props.handleClose}>Cancel</Button>
          </div>
        </Modal>
      </>
    );
  }
}

PostModal.propTypes = {};

const PostModalWrapped = withStyles(styles)(PostModal);

export default PostModalWrapped;
