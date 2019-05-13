import React from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";

import TrainingBotGIF from "img/trainingBot.gif";

import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem, Paper } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

import {
  styles,
  AssignMemberContainer,
  ButtonContainer,
  LoadingImage
} from "./styles.js";

class Assign extends React.Component {
  state = {
    open: false,
    training_series_id: "",
    start_date: "",
    isRouting: false
  };

  componentDidMount() {
    console.log("CDM");
    let d = new Date();
    let formattedDate = d.toISOString();
    this.setState({
      training_series_id: this.props.training_series_id,
      start_date: formattedDate
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isEditing &&
      this.state.start_date !== this.prevState.start_date
    ) {
      console.log("CDU");
      this.setState({ email: this.props.email, name: this.props.name });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    let d = date;
    this.setState({
      start_date: d.toISOString()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // const data = {
    //   start_date: this.state.start_date,
    //   training_series_id: this.state.training_series_id,
    //   assignments: [this.props.location.state.urlId]
    // };
    //this.props.addTeamMemberToTrainingSeries(data);
    this.setState({
      isRouting: true
    });
  };

  routeBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  renderTrainingSeriesInDropDown = () => {
    //Map Through the current assignments for the team member, returns an array of ID's
    let assignments = this.props.location.state.assignments.map(
      assignment => assignment.trainingSeries_ID
    );
    //Filters the trainingSeries based on assignments
    let filteredSeries = this.props.location.state.trainingSeries.filter(
      series => {
        return !assignments.includes(series.id);
      }
    );

    return filteredSeries.map(series => {
      return (
        <MenuItem
          name="trainingSeriesID"
          label={`${series.title}`}
          value={series.training_series_id}
        >
          {series.title}
        </MenuItem>
      );
    });
  };
  render() {
    const { classes } = this.props;
    console.log("TEST");
    return (
      <AssignMemberContainer>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.heading}>
            Assign Training Series
          </Typography>
          <div className={classes.datePicker}>
            <DatePicker
              inline
              minDate={new Date()}
              selected={this.state.start_date}
              onChange={this.handleDateChange}
            />
          </div>
          <form
            variant="body1"
            id="modal-title"
            className={classes.memberList}
            onSubmit={e => this.handleSubmit(e)}
          >
            <FormControl className={""}>
              <InputLabel htmlFor="trainingSeriesID">
                Training Series
              </InputLabel>
              <Select
                value={this.state.training_series_id}
                onChange={this.handleChange}
                name="trainingSeriesID"
              >
                {this.props.location.state.assignments &&
                  this.renderTrainingSeriesInDropDown()}
              </Select>
            </FormControl>
            <ButtonContainer>
              <Button
                disabled={
                  this.state.isRouting === true ||
                  this.state.training_series_id === undefined
                    ? "true"
                    : null
                }
                className={classes.assignButton}
                variant="contained"
                type="submit"
              >
                {this.state.isRouting ? (
                  <LoadingImage src={TrainingBotGIF} alt="Loading Icon" />
                ) : (
                  "Assign"
                )}
              </Button>
              <Button
                onClick={this.routeBack}
                className={classes.button}
                variant="primary"
              >
                Cancel
              </Button>
            </ButtonContainer>
          </form>
        </Paper>
      </AssignMemberContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    //trainingSeries: state.trainingSeriesReducer.trainingSeries,
    isLoading: state.userReducer.isLoading
    // teamMembers: state.teamMembersReducer.teamMembers
  };
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(Assign));
