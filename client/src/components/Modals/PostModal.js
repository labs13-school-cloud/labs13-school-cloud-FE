// displays individual post modal
import React from "react";

//Prop Types
import PropTypes from "prop-types";

// Styles
import { withStyles } from "@material-ui/core/styles";
import { Modal, TextField, Button } from "@material-ui/core/";

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
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    "@media (max-width: 768px)": {
      width: "65%"
    }
  },
  container: {
    display: "flex",
    "flex-direction": "column",
    flexWrap: "wrap",
    "align-items": "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%"
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
    message: {
      message_name: "",
      message_details: "",
      link: "",
      days_from_start: 1,
      training_series_id: ""
    }
  };

  componentDidMount() {
    this.props.modalType === "edit" &&
      this.setState({
        message: {
          message_name: this.props.message.message_name,
          message_details: this.props.message.message_details,
          link: this.props.message.link,
          days_from_start: this.props.message.days_from_start,
          training_series_id: this.props.message.id
        }
      });
  }

  handleOpen = () => {
    if (this.props.modalType === "edit") {
      this.setState({
        open: true
      });
    } else {
      this.setState({
        open: true,
        message: {
          ...this.state.message,
          training_series_id: this.props.trainingSeries.id
        }
      });
    }
  };

  handleClose = () => {
    if (this.props.modalType !== "edit") {
      this.clearForm();
    } else {
      this.setState({
        message: {
          message_name: this.props.message.message_name,
          message_details: this.props.message.message_details,
          link: this.props.message.link,
          days_from_start: this.props.message.days_from_start,
          training_series_id: this.props.message.id
        }
      });
    }

    this.setState({
      open: false
    });
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      message: {
        ...this.state.message,
        [e.target.name]: e.target.value
      }
    });
  };

  clearForm = () => {
    this.setState({
      message: {
        ...this.state.message,
        message_name: "",
        message_details: "",
        link: "",
        days_from_start: 1,
        training_series_id: ""
      }
    });
  };

  handlePostSubmit = e => {
    e.preventDefault();
    if (this.props.modalType === "edit") {
      this.props.editPost(this.props.message.id, this.state.message);
    } else {
      this.props.createAPost(this.state.message);
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
              <TextField
                name="postName"
                label="Post name"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.message.message_name}
              />
              <TextField
                name="postDetails"
                label="Post Details"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.message.message_details}
              />
              <TextField
                name="link"
                label="Link"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.message.link}
              />
              <TextField
                name="daysFromStart"
                label="Days from Start"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.message.days_from_start}
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
