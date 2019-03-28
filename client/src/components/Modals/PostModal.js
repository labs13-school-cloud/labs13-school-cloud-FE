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
    width: theme.spacing.unit * 25,
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
    open: false
  };

  componentDidMount() {

  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  createAPost = e => {
    e.preventDefault();
    // logic here
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Button onClick={this.handleOpen}>Create a new post</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <p>Post Modal!</p>
            <Button onClick={this.handleClose}>Cancel</Button>
          </div>
        </Modal>
      </>
    );
  }
}

PostModal.propTypes = {};

const PostModalWrapped = withStyles(styles)(PostModal);

export default PostModalWrapped;
