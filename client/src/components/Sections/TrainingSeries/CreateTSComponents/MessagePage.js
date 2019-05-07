import React from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Components

import {
  getTrainingSeriesMessages,
  createAMessage,
  editMessage,
  deleteMessage,
  getMessageById
} from "store/actions";

import {
  MainContainer,
  MessageContainer,
  ButtonContainer,
  styles
} from "./MessagePageStyles.js";

class MessagePage extends React.Component {
  state = {
    open: false,
    isUpdating: false,
    message: {
      message_name: "",
      message_details: "",
      link: "",
      days_from_start: "",
      training_series_id: "",
      id: ""
    }
  };

  componentDidMount() {
    if (this.props.location.state.message) {
      //changed back to to message to fix bug... can change in be later
      this.setState({
        ...this.state,
        message: this.props.location.state.message //changed back to to message to fix bug... can change in be later
      });
    }
  }

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.addSuccess !== this.props.addSuccess) {
  //       setTimeout(() => {
  //         const { teamMemberID } = this.props.teamMember && this.props.teamMember;
  //         this.props.history.push(`/home/team-member/${teamMemberID}`);
  //       }, 400);
  //     }
  //   }

  handleChange = name => e => {
    this.setState({
      ...this.state,
      message: {
        ...this.state.message,
        [name]: e.target.value
      }
    });
  };

  handleMessageSubmit = e => {
    e.preventDefault();

    this.props.editMessage(this.state.message.id, this.state.message);

    setTimeout(() => {
      this.props.history.push(
        `/home/training-series/${this.state.message.training_series_id}`
      );
    }, 1000);
  };

  render() {
    const { classes } = this.props;
    return (
      <MainContainer>
        <Typography variant="display1" align="center" gutterBottom>
          Edit Message
        </Typography>
        <form
          className={classes.form}
          id="form1"
          onSubmit={e => this.handleMessageSubmit(e)}
        >
          {/* <DeleteModal deleteType='inTeamMemberPage' id={this.props.urlId} /> */}

          <Paper className={classes.root}>
            <MessageContainer>
              <TextField
                id="standard-name"
                label="Message Title"
                className={classes.textField}
                value={this.state.message.message_name}
                onChange={this.handleChange("message_name")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Message Content"
                className={classes.textField}
                value={this.state.message.message_details}
                onChange={this.handleChange("message_details")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Link"
                className={classes.textField}
                value={this.state.message.link}
                onChange={this.handleChange("link")}
                margin="normal"
                required
              />
              <TextField
                id="outlined-number"
                label="Days from Start"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange("days_from_start")}
                type="number"
                value={this.state.message.days_from_start}
                step="1"
                inputProps={{ min: 1 }}
                required
              />
            </MessageContainer>
          </Paper>
          <ButtonContainer>
            <Button
              variant="outlined"
              className={classes.saveButton}
              type="submit"
              form="form1"
            >
              Save
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={e =>
                this.props.history.push(
                  `/home/training-series/${
                    this.state.message.training_series_id
                  }`
                )
              }
            >
              Cancel
            </Button>
          </ButtonContainer>
        </form>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    addSuccess: state.teamMembersReducer.status.addSuccess,
    teamMember: state.teamMembersReducer.teamMember
  };
};

export default connect(
  mapStateToProps,
  {
    getTrainingSeriesMessages,
    createAMessage,
    editMessage,
    deleteMessage,
    getMessageById
  }
)(withStyles(styles)(withRouter(MessagePage)));
