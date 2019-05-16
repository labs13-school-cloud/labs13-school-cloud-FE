// Form to create a new message for a training series
import React from "react";
import { connect } from "react-redux";
import moment from "moment";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";

// Redux
import { createAMessage, editMessage, deleteMessage } from "store/actions";

import {
  styles,
  MainContainer,
  MessageContainer,
  ButtonContainer
} from "./CreateMessageStyles.js";

class CreateMessage extends React.Component {
  state = {
    open: false,
    isUpdating: false,
    message: {
      subject: "",
      body: "",
      link: "",
      days_from_start: 1,
      training_series_id: "",
      for_manager: false,
      for_mentor: false,
      for_team_member: true
    }
  };

  componentDidMount() {
    if (this.props.location.state.training_series_id) {
      this.setState({
        ...this.state,
        message: {
          ...this.state.message,
          training_series_id: this.props.location.state.training_series_id
        }
      });
      delete this.props.location.state;
    }
  }

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
    this.props.createAMessage(
      this.state.message,
      this.state.message.training_series_id
    );
  };

  render() {
    const { classes } = this.props;
    const sendDay = moment()
      .add(3, "days")
      .format("MMM Do");
    return (
      <form
        className={classes.form}
        id="form1"
        onSubmit={e => this.handleMessageSubmit(e)}
      >
        <MainContainer>
          <Paper className={classes.root}>
            <Typography variant="title" gutterBottom>
              Create A New Message
            </Typography>
            <Divider />
            <MessageContainer>
              <TextField
                id="standard-name"
                label="Message Title"
                className={classes.textField}
                value={this.state.message.subject}
                onChange={this.handleChange("subject")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Message Content"
                className={classes.textField}
                value={this.state.message.body}
                onChange={this.handleChange("body")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Optional Link"
                className={classes.textField}
                value={this.state.message.link}
                onChange={this.handleChange("link")}
                margin="normal"
                helperText="must be a URI link or this message will not be submittable"
              />
              <TextField
                id="outlined-number"
                label="Days From Start"
                margin="normal"
                className={classes.textField}
                onChange={this.handleChange("days_from_start")}
                type="number"
                value={this.state.message.days_from_start}
                step="1"
                inputProps={{ min: 1 }}
                required
              />
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>
                    What is "Days From Start"?
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    This is the number of days after a training series starts
                    that a message will be sent. For example, if you assign a
                    team member to this training series with a start date of
                    today, and you set this message's "days from start" number
                    to 3, it will send out on {sendDay}.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </MessageContainer>
            Send To:{"  "}
            <Checkbox
              checked={this.state.message.for_team_member}
              value="checkedB"
              color="primary"
              onChange={e => {
                this.setState({
                  ...this.state,
                  message: {
                    ...this.state.message,
                    for_team_member: !this.state.message.for_team_member
                  }
                });
              }}
            />
            Team Member
            <Checkbox
              checked={this.state.message.for_manager}
              value="checkedB"
              color="primary"
              onChange={e => {
                this.setState({
                  ...this.state,
                  message: {
                    ...this.state.message,
                    for_manager: !this.state.message.for_manager
                  }
                });
              }}
            />
            Manager
            <Checkbox
              checked={this.state.message.for_mentor}
              value="checkedB"
              color="primary"
              onChange={e => {
                this.setState({
                  ...this.state,
                  message: {
                    ...this.state.message,
                    for_mentor: !this.state.message.for_mentor
                  }
                });
              }}
            />
            Mentor
            <ButtonContainer>
              <Button
                variant="outlined"
                className={classes.createButton}
                type="submit"
                form="form1"
              >
                Create
              </Button>
              <Button
                className={classes.button}
                onClick={e =>
                  this.props.history.push(
                    `/home/training-series/${
                      this.state.messages.training_series_id
                    }`
                  )
                }
              >
                Cancel
              </Button>
            </ButtonContainer>
          </Paper>
        </MainContainer>
      </form>
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
    createAMessage,
    editMessage,
    deleteMessage
  }
)(withStyles(styles)(CreateMessage));
