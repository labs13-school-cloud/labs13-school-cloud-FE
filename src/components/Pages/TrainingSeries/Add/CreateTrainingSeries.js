import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addTrainingSeries } from "store/actions/trainingSeriesActions";
import ProgressCircle from "components/UI/Progress/ProgressCircle";

import { withStyles } from "@material-ui/core/styles";
import { Typography, Button, TextField, Divider } from "@material-ui/core/";
import { styles, MainContainer } from "./CreateTrainingSeriesStyles.js";

import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

class CreateTrainingSeries extends React.Component {
  state = {
    title: "",
    isRouting: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleTrainingSeriesSubmit = e => {
    e.preventDefault();
    const data = { title: this.state.title, user_id: this.props.user_id };
    this.props.addTrainingSeries(data);

    this.setState({ isRouting: true });

    setTimeout(() => {
      this.props.history.push(
        `/home/training-series/${this.props.trainingSeriesID}`
      );
    }, 1000);
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/home");
  };

  render() {
    const { classes } = this.props;
    return this.state.isRouting ? (
      <ProgressCircle />
    ) : (
      <MainContainer style={{ position: "relative" }}>
        <InfoPopup
          top={"15px"}
          left={"50px"}
          popOverText={
            <p>
              This is step one of creating a training series! Simply pick a
              name, then youll be forwarded to a page to start creating messages
              and adding team members.
            </p>
          }
        />
        <div className={classes.paper}>
          <Typography variant="h6" id="modal-title">
            Create A New Training Series
          </Typography>
          <Divider className={classes.divider} />
          <form
            onSubmit={e => this.handleTrainingSeriesSubmit(e)}
            className={classes.container}
            autoComplete="off"
          >
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.title}
              onChange={this.handleChange("title")}
              margin="normal"
              required
            />
            <div>
              <Button
                type="submit"
                variant="outlined"
                className={classes.createButton}
              >
                Create
              </Button>
              <Button
                className={classes.button}
                onClick={e => this.handleCancel(e)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </MainContainer>
    );
  }
}

CreateTrainingSeries.propTypes = {
  classes: PropTypes.object.isRequired
};

const CreateTrainingSeriesWrapped = withStyles(styles)(CreateTrainingSeries);

const mapStateToProps = state => {
  return {
    isAdding: state.trainingSeriesReducer.isAdding,
    addSuccess: state.trainingSeriesReducer.addSuccess,
    trainingSeriesID: state.trainingSeriesReducer.trainingSeriesID
  };
};

export default connect(
  mapStateToProps,
  { addTrainingSeries }
)(CreateTrainingSeriesWrapped);
