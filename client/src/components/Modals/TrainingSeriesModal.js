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
import { addTrainingSeries, editTrainingSeries } from "../../store/actions/";

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

class TrainingSeriesModal extends React.Component {
  state = {
    open: false,
    title: ""
  };

  componentDidMount() {
    this.props.modalType === "edit" &&
      this.setState({ title: this.props.title });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isEditing) {
      this.setState({ title: this.props.title });
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
  clearForm = () => {
    this.setState({ title: "" });
  };

  handleTrainingSeriesSubmit = e => {
    e.preventDefault();
    const data = { title: this.state.title, userID: this.props.userID };
    if (this.props.modalType === "edit") {
      this.setState({ title: this.props.title });
      this.props.editTrainingSeries(this.props.trainingSeriesID, data);
      this.props.handleClose();
    } else {
      this.props.addTrainingSeries(data);
      this.clearForm();
    }
    this.handleClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <div>
          {this.props.modalType === "edit" ? (
            <div onClick={this.handleOpen}>Edit Training Series</div>
          ) : (
            <Button onClick={this.handleOpen}>Add New Training Series</Button>
          )}
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              {this.props.modalType === "edit" ? "Edit " : "Create a new "}
              Training series
            </Typography>
            <form
              onSubmit={e => this.handleTrainingSeriesSubmit(e)}
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="standard-name"
                label="Title"
                className={classes.textField}
                value={this.state.title}
                onChange={this.handleChange("title")}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Submit
              </Button>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

TrainingSeriesModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    isLoading: state.trainingSeriesReducer.isLoading,
    isEditing: state.trainingSeriesReducer.isEditing
  };
};

const TrainingSeriesModalWrapped = withStyles(styles)(TrainingSeriesModal);

export default connect(
  mapStateToProps,
  {
    addTrainingSeries,
    editTrainingSeries
  }
)(TrainingSeriesModalWrapped);
