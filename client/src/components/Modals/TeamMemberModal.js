import React from "react";

import { connect } from "react-redux";

//Prop Types
import PropTypes from "prop-types";

import { editTeamMember } from "../../store/actions";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
    outline: "none"
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

class TeamMemberModal extends React.Component {
  state = {
    open: false,
    teamMember: {
      firstName: "",
      lastName: "",
      jobDescription: "",
      email: "",
      phoneNumber: "",
      user_ID: ""
    }
  };

  componentDidMount() {
    this.props.modalType === "edit" &&
      this.setState({ teamMember: this.props.teamMember });
  }

  componentDidUpdate(prevProps) {
    // populates form with selected users information
    if (prevProps.isEditing) {
      this.props.teamMember &&
        this.setState({ teamMember: this.props.teamMember, open: false });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({
      open: false,
      teamMember: {
        firstName: "",
        lastName: "",
        jobDescription: "",
        email: "",
        phoneNumber: ""
      }
    });
  };

  handleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.modalType === "edit") {
      console.log("Edit Fired");
      this.props.editTeamMember(this.props.teamMemberId, this.state.teamMember);
    } else {
      const newMember = {
        ...this.state.teamMember,
        user_ID: this.props.userId
      };

      this.props.addTeamMember(newMember);

      this.handleClose();
    }
  };

  render() {
    const { classes } = this.props;

    console.log("MODAL PROPS", this.props);
    return (
      <div>
        <Button onClick={this.handleOpen}>
          {this.props.modalType === "edit" ? "Edit" : "Add new team member"}
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title" align="center">
              {this.props.modalType === "edit"
                ? "Edit Team Member Info"
                : "Add a new team member"}
            </Typography>
            <form
              onSubmit={e => this.handleSubmit(e)}
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-name"
                label="first name"
                className={classes.textField}
                value={this.state.teamMember.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="last name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="job description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange("jobDescription")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="email"
                className={classes.textField}
                value={this.state.teamMember.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="phone"
                className={classes.textField}
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange("phoneNumber")}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
                {this.props.modalType === "edit" ? "Save Update" : "Save"}
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

TeamMemberModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isEditing: state.teamMembersReducer.status.isEditing,
    editSuccess: state.teamMembersReducer.status.editSuccess
  };
};

// We need an intermediary variable for handling the recursive nesting.
const TeamMemberModalWrapped = withStyles(styles)(TeamMemberModal);

export default connect(
  mapStateToProps,
  { editTeamMember }
)(TeamMemberModalWrapped);
