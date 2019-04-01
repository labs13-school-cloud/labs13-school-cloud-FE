import React from "react";
//Prop Types
import PropTypes from "prop-types";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//REDUX
import { connect } from "react-redux";
import { addTeamMemberToTrainingSeries } from "../../store/actions/teamMembersActions";

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

class UserModal extends React.Component {
  state = {
    open: false,
    trainingSeries_ID: "",
    startDate: ""
  };

  componentDidMount() {
    this.setState({ email: this.props.email, name: this.props.name });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isEditing) {
      this.setState({ email: this.props.email, name: this.props.name });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };
  //
  handleUserInformationSubmit = e => {
    e.preventDefault();
    const data = {
      trainingSeries_ID: this.state.trainingSeries_ID,
      startDate: this.state.startDate
    };
    this.setState(data);
    this.props.addTeamMemberToTrainingSeries(this.props.id, data);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>Edit</Button>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h6' id='modal-title'>
              Edit your Information
            </Typography>
            <form
              onSubmit={e => this.handleUserInformationSubmit(e)}
              className={classes.container}
              noValidate
              autoComplete='off'
            >
              <TextField
                id='standard-name'
                label='Email'
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin='normal'
              />
              <TextField
                id='standard-name'
                label='Name'
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleChange("name")}
                margin='normal'
              />
              <Button
                type='submit'
                variant='contained'
                className={classes.button}
              >
                Submit
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

UserModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isLoading: state.userReducer.isLoading
  };
};

const UserModalWrapped = withStyles(styles)(UserModal);

export default connect(
  mapStateToProps,
  {
    addTeamMemberToTrainingSeries
  }
)(UserModalWrapped);
