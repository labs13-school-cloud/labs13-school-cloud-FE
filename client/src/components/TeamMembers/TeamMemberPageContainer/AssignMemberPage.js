import React from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";

//Styles
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { MenuItem, Paper } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";

//REDUX
import { connect } from "react-redux";
import { addTeamMemberToTrainingSeries } from "../../../store/actions/";

const styles = theme => ({
  paper: {
    width: "100%",
    margin: "20px auto",
    boxSizing: 'border-box',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: '20px 30px',
    outline: "none",
  },
  heading: {
    textAlign: "center"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  memberList: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    margin: "0 auto"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  datePicker: {
    display: "flex",
    justifyContent: "center",
    margin: "30px auto"
  },
  button: {
    alignSelf: "center"
  }
});

class AssignMemberPage extends React.Component {
  state = {
    open: false,
    trainingSeriesID: "",
    startDate: "",
    value: ""
  };

  componentDidMount() {
    let d = new Date();
    let formattedDate = d.toISOString();
    this.setState({
      trainingSeriesID: this.props.trainingSeriesID,
      startDate: formattedDate
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isEditing) {
      this.setState({ email: this.props.email, name: this.props.name });
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = date => {
    let d = date;
    this.setState({
      startDate: d.toISOString()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      startDate: this.state.startDate,
      trainingSeriesID: this.state.trainingSeriesID,
      assignments: [this.props.location.state.urlId]
    };
    this.props.addTeamMemberToTrainingSeries(data);
  };

  routeBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  }

  renderTrainingSeriesInDropDown = () => {
    //Map Through the current assignments for the team member, returns an array of ID's
    let assignments = this.props.location.state.assignments.map(
      assignment => assignment.trainingSeries_ID
    );
    //Filters the trainingSeries based on assignments
    let filteredSeries = this.props.location.state.trainingSeries.filter(
      series => {
        return !assignments.includes(series.trainingSeriesID);
      }
    );

    return filteredSeries.map(series => {
      return (
        <MenuItem
          name="trainingSeriesID"
          label={`${series.title}`}
          value={series.trainingSeriesID}
        >
          {series.title}
        </MenuItem>
      );
    });
  };
  render() {
    const { classes } = this.props;
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
              selected={this.state.startDate}
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
                value={this.state.trainingSeriesID}
                onChange={this.handleChange}
                name="trainingSeriesID"
              >
                {this.props.location.state.assignments &&
                  this.renderTrainingSeriesInDropDown()}
              </Select>
            </FormControl>
            <ButtonContainer>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
              >
                Assign
              </Button>
              <Button onClick={this.routeBack} className={classes.button} variant="primary">
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
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    isLoading: state.userReducer.isLoading,
    teamMembers: state.teamMembersReducer.teamMembers
  };
};

export default connect(
  mapStateToProps,
  { addTeamMemberToTrainingSeries }
)(withStyles(styles)(AssignMemberPage));

const AssignMemberContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  width: 100%;
  @media (max-width:768px) {
    width: 95%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 25px;
  justify-content: center;
`;
