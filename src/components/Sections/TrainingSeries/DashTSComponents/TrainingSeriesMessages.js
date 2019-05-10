// displays all messages of a training series
import React from "react";

import { Link } from "react-router-dom";
import Fuse from "fuse.js";
import axios from "axios";

// Components
import DeleteModal from "components/UI/Modals/deleteModal";
import TrainingSeriesAssignment from "./TrainingSeriesAssignment";

// Redux
import { connect } from "react-redux";
import {
  getTrainingSeriesMessages,
  getTeamMembers,
  createAMessage,
  editMessage,
  deleteMessage,
  //getMembersAssigned,
  editTrainingSeries
} from "store/actions";

import { withStyles } from "@material-ui/core/styles";

// Styling
import {
  Paper,
  TextField,
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  InputAdornment,
  Divider
} from "@material-ui/core/";

import {
  styles,
  PageContainer,
  HeaderContainer,
  HolderText,
  ListItemContainer,
  ListStyles,
  ListButtonContainer,
  TrainingSeriesTitle
} from "./TrainingSeriesMessagesStyles.js";

class TrainingSeriesMessages extends React.Component {
  state = {
    active: false,
    displaySnackbar: false,
    editingTitle: false,
    searchInput: "",
    searchOpen: false,
    singleTrainingSeries: this.props.trainingSeries.filter(
      series => series.id === parseInt(this.props.match.params.id)
    )[0]
  };

  componentDidMount() {
    this.props.getTrainingSeriesMessages(this.props.match.params.id);
    this.props.getTeamMembers(this.props.userId);

    if (this.props.location.state) {
      this.setState({
        displaySnackbar: this.props.location.state.success
      });
    }
    this.resetHistory();
    setTimeout(() => {
      console.log(this.props.messages);
    }, 2000);
  }

  openSearch = e => {
    e.preventDefault();
    this.setState({ searchOpen: !this.state.searchOpen });
  };

  deleteMessage = (e, id) => {
    e.preventDefault();
    this.props.deleteMessage(id);
  };

  routeToMessagePage = () => {
    this.props.history.push({
      pathname: "/home/create-message",
      state: {
        training_series_id: this.state.singleTrainingSeries.id
      }
    });
  };

  routeToeditMessagePage = (e, message) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/home/message/${message.id}`,
      state: {
        message
      }
    });
  };

  routeToAssigning = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/home/assign-members/${this.state.singleTrainingSeries.id}`
    });
  };

  resetHistory = () => {
    this.props.history.replace({
      state: null
    });
  };

  beginTitleEdit = e => {
    this.setState({ editingTitle: true });
  };

  handleChange = title => {
    const { singleTrainingSeries } = this.state;
    singleTrainingSeries.title = title;
    this.setState({ singleTrainingSeries });
  };

  updateTitle = async e => {
    e.preventDefault();
    const { title, id } = this.state.singleTrainingSeries;
    await this.props.editTrainingSeries(id, { title });
    await this.getTrainingSeriesWithMessages(this.props.match.params.id);
    this.setState({ editingTitle: false });
  };

  searchedMessages = messages => {
    var options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["subject", "body", "link"]
    };

    const fuse = new Fuse(messages, options);
    const res = fuse.search(this.state.searchInput);
    return res;
  };

  render() {
    const { classes } = this.props;

    let titleEdit;
    if (this.state.editingTitle) {
      titleEdit = (
        <form onSubmit={e => this.updateTitle(e)} autoComplete="off">
          <TrainingSeriesTitle>
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={this.state.singleTrainingSeries.title}
              onChange={e => this.handleChange(e.target.value)}
              margin="normal"
            />
            <div>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </TrainingSeriesTitle>
        </form>
      );
    } else {
      titleEdit = (
        <TrainingSeriesTitle>
          <Typography variant="headline">
            {`${this.state.singleTrainingSeries.title} \u00A0`}
          </Typography>
          <i
            style={{ fontSize: 25 }}
            className={`material-icons ${classes.icons}`}
            onClick={e => this.beginTitleEdit(e)}
          >
            edit
          </i>
        </TrainingSeriesTitle>
      );
    }

    let assignedMembersStatus;

    //first filter all notifications brought in from Redux state for only ones linked to this series
    const filteredNotifs = this.props.notifications.filter(
      n => n.training_series_id === parseInt(this.props.match.params.id)
    );

    //push each unique team member id from remaining notifications, length of this is # of assigned members
    let assignedMemberIds = [];
    filteredNotifs.forEach(
      n =>
        !assignedMemberIds.includes(n.team_member_id) &&
        assignedMemberIds.push(n.team_member_id)
    );
    //make list of team members found in the assignedMemberIds array
    let assignedMembers = this.props.teamMembers.filter(t =>
      assignedMemberIds.includes(t.id)
    );

    if (this.props.teamMembers.length > 0 && assignedMembers.length === 0) {
      assignedMembersStatus = (
        <>
          <HeaderContainer>
            <Typography variant="title" className={classes.assignedTitle}>
              Assigned Team Members
            </Typography>
            <Button
              className={classes.assignButton}
              variant="outlined"
              onClick={this.routeToAssigning}
            >
              Assign Members
            </Button>
          </HeaderContainer>
          <Typography variant="subheading" className={classes.messageTextTop}>
            This training series currently does not have any team members
            assigned to it.
          </Typography>
          <Typography variant="subheading" className={classes.messageText}>
            Click the button above to create assignments.
          </Typography>
        </>
      );
    } else if (this.props.teamMembers.length > 0) {
      assignedMembersStatus = (
        <>
          <HeaderContainer>
            <Typography variant="title" className={classes.assignedTitle}>
              Assigned Team Members
            </Typography>
            <Button
              className={classes.assignButton}
              variant="outlined"
              onClick={this.routeToAssigning}
            >
              Assign Members
            </Button>
          </HeaderContainer>
          {assignedMembers.map(member => (
            <>
              <TrainingSeriesAssignment member={member} />
              <Divider />
            </>
          ))}
        </>
      );
    } else {
      assignedMembersStatus = (
        <>
          <HeaderContainer>
            <Typography variant="title">Assigned Team Members</Typography>
            <Button
              className={classes.assignButton}
              variant="outlined"
              disabled
            >
              Assign Members
            </Button>
          </HeaderContainer>
          <HolderText>
            <p>You don't have any team members to assign.</p>
            <p>
              <Link to="/home/create-team-member">Click here</Link> to add a
              member to your account.
            </p>
          </HolderText>
        </>
      );
    }
    const searchOn = this.state.searchInput.length > 0;
    let messages;
    //console.log(this.props); // checks if the search field is active and there are results from the fuse search
    if (searchOn && this.searchedMessages(this.props.messages).length > 0) {
      messages = this.searchedMessages(this.props.messages);
    } else {
      messages = this.props.messages;
    }
    /* sort messages by days from start */
    const sortedMessages = messages.sort((a, b) =>
      a.days_from_start > b.days_from_start
        ? 1
        : b.days_from_start > a.days_from_start
        ? -1
        : 0
    );
    return (
      <>
        <PageContainer>
          {/* <Paper className={classes.paperTitle}>{titleEdit}</Paper> */}
          <Paper className={classes.paper}>
            <>{titleEdit}</>
            <Divider variant="fullWidth" className={classes.divider} />
            <HeaderContainer>
              <Typography variant="title">Messages</Typography>
              <div>
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={e => this.routeToMessagePage(e)}
                >
                  New Message
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  onClick={e => this.openSearch(e)}
                >
                  Search
                </Button>
              </div>
            </HeaderContainer>
            {/* Search Input */}
            {this.state.searchOpen && (
              <TextField
                id="standard-search"
                type="search"
                className={classes.textField}
                onChange={e => this.setState({ searchInput: e.target.value })}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <i class="material-icons">search</i>
                    </InputAdornment>
                  )
                }}
              />
            )}
            {this.props.messages.length === 0 ? (
              <HolderText>
                <p>You do not have any messages.</p>
              </HolderText>
            ) : (
              <ListStyles className={classes.listStyle}>
                {sortedMessages.map(message => (
                  <ListItemContainer key={message.id}>
                    <ListItem key={message.id} className={classes.listItem}>
                      <ListItemText
                        primary={message.subject}
                        secondary={message.body}
                        className={classes.listItemText}
                        onClick={e => this.routeToeditMessagePage(e, message)}
                      />
                      <ListItemSecondaryAction
                        className={classes.secondaryAction}
                      >
                        <div>
                          <p>{message.days_from_start} days</p>
                        </div>
                        <ListButtonContainer>
                          <i
                            className={`material-icons ${classes.icons}`}
                            onClick={e =>
                              this.routeToEditMessagePage(e, message)
                            }
                          >
                            edit
                          </i>
                          <DeleteModal
                            className={`material-icons ${classes.icons}`}
                            deleteType="message"
                            id={message.id}
                          />
                        </ListButtonContainer>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </ListItemContainer>
                ))}
              </ListStyles>
            )}
          </Paper>
          <Paper className={classes.paper}>{assignedMembersStatus}</Paper>
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.messagesReducer.isLoading,
  //singleTrainingSeries: state.trainingSeriesReducer.trainingSeries.filter(
  //   series => series.id === this.props.match.params.id
  // ),
  notifications: state.notificationsReducer.notifications,
  messages: state.trainingSeriesReducer.messages,
  assignments: state.trainingSeriesReducer.assignments,
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  teamMembers: state.teamMembersReducer.teamMembers
});
TrainingSeriesMessages.propTypes = {};
export default connect(
  mapStateToProps,
  {
    getTrainingSeriesMessages,
    getTeamMembers,
    createAMessage,
    editMessage,
    deleteMessage,
    //getMembersAssigned,
    editTrainingSeries
  }
)(withStyles(styles)(TrainingSeriesMessages));
