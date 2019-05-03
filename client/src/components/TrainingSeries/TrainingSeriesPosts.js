// displays all posts of a training series
import React from "react";

import { Link } from "react-router-dom";
import Fuse from "fuse.js";

// Components
import DeleteModal from "../Modals/deleteModal";
import TrainingSeriesAssignment from "./TrainingSeriesAssignment";

import styled from "styled-components";

// Redux
import { connect } from "react-redux";
import {
  getTrainingSeriesMessages,
  getTeamMembers,
  createAMessage,
  editMessage,
  deleteMessage,
  getMembersAssigned,
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

import AddMemberSnackbar from "./AddMembersToTrainingSeries/AddMemberSnackbar";

const styles = theme => ({
  paper: {
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      width: "89%",
      // padding: 0,
      margin: "5px auto"
    },

    "@media (max-width: 480px)": {
      width: "80%",
      // padding: 0,
      margin: "5px auto"
    }
  },
  paperTitle: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "16px 32px",
    outline: "none",
    display: "flex",
    margin: "5px auto",
    alignItems: "baseline",
    "@media (max-width: 480px)": {
      width: "89%",
      padding: 0,
      margin: "0 auto"
    }
  },
  secondaryAction: {
    display: "flex",
    flexDirection: "row",
    "align-items": "center"
  },
  listStyle: {
    margin: 0
  },
  listItem: {
    width: "79%",
    height: 80,
    marginBottom: 10,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    wrap: "flex-wrap"
  },
  icons: {
    display: "block",
    width: 20,
    marginBottom: 10,
    color: "gray",
    cursor: "pointer",
    "&:hover": { color: "#2699FB" }
  },
  hidden: {
    display: "none"
  },
  button: {
    // margin: 5,
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "@media (max-width: 768px)": {
      margin: "10px 5px"
    }
  },
  assignButton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "@media (max-width: 768px)": {
      margin: "10px 5px"
    },

    "&:disabled": {
      background: "white"
    }
  },
  list: {
    listStyleType: "none"
  },
  messageText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "lightgray"
  },
  messageTextTop: {
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "lightgray"
  },
  divider: {
    margin: "15px 0"
  },
  textField: {
    width: "60%"
  }
});
class TrainingSeriesPosts extends React.Component {
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
    this.getTrainingSeriesWithMessages(this.props.match.params.id);
    this.props.getTeamMembers(this.props.userId);
    this.props.getMembersAssigned(this.props.match.params.id);
    if (this.props.location.state) {
      this.setState({
        displaySnackbar: this.props.location.state.success
      });
    }
    this.resetHistory();
  }
  openSearch = e => {
    e.preventDefault();
    this.setState({ searchOpen: !this.state.searchOpen });
  };
  getTrainingSeriesWithMessages = id => {
    this.props.getTrainingSeriesMessages(id);
  };

  deleteMessage = (e, id) => {
    e.preventDefault();
    this.props.deleteMessage(id);
  };

  routeToPostPage = () => {
    this.props.history.push({
      pathname: "/home/create-post",
      state: {
        training_series_id: this.state.singleTrainingSeries.id
      }
    });
  };

  routeToeditMessagePage = (e, post) => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/home/post/${post.id}`,
      state: {
        post
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
    this.setState({
      editingTitle: true,
      title: this.state.singleTrainingSeries.title
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  updateTitle = async e => {
    e.preventDefault();
    const data = { title: this.state.title };
    await this.props.editTrainingSeries(
      this.state.singleTrainingSeries.id,
      data
    );
    await this.getTrainingSeriesWithMessages(this.props.match.params.id);
    this.setState({
      ...this.state,
      editingTitle: false
    });
  };

  searchedPosts = posts => {
    var options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["message_name", "message_details", "link"]
    };

    const fuse = new Fuse(posts, options);
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
              value={this.state.title}
              onChange={this.handleChange("title")}
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
    if (
      this.props.teamMembers.length > 0 &&
      this.props.assignments.length === 0
    ) {
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
          {this.props.assignments.map(member => (
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

    let posts;

    //console.log(this.props); // checks if the search field is active and there are results from the fuse search
    if (searchOn && this.searchedPosts(this.props.posts).length > 0) {
      posts = this.searchedPosts(this.props.posts);
    } else {
      posts = this.props.posts;
    }

    /* sort posts by days from start */
    const sortedPosts = posts.sort((a, b) =>
      a.days_from_start > b.days_from_start
        ? 1
        : b.days_from_start > a.days_from_start
        ? -1
        : 0
    );

    return (
      <>
        {this.state.displaySnackbar && (
          <>
            <AddMemberSnackbar
              message="Your team members have been successfully assigned."
              type="success"
            />
          </>
        )}
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
                  onClick={e => this.routeToPostPage(e)}
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
            {this.props.posts.length === 0 ? (
              <HolderText>
                <p>You do not have any messages.</p>
              </HolderText>
            ) : (
              <ListStyles className={classes.listStyle}>
                {sortedPosts.map(post => (
                  <ListItemContainer key={post.id}>
                    <ListItem key={post.id} className={classes.listItem}>
                      <ListItemText
                        primary={post.message_name}
                        secondary={post.message_details}
                        className={classes.listItemText}
                        onClick={e => this.routeToeditMessagePage(e, post)}
                      />
                      <ListItemSecondaryAction
                        className={classes.secondaryAction}
                      >
                        <div>
                          <p>{post.days_from_start} days</p>
                        </div>
                        <ListButtonContainer>
                          <i
                            className={`material-icons ${classes.icons}`}
                            onClick={e => this.routeToEditMessagePage(e, post)}
                          >
                            edit
                          </i>
                          <DeleteModal
                            className={`material-icons ${classes.icons}`}
                            deleteType="post"
                            id={post.id}
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

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;

    padding: 10px 0;
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }
`;

const HolderText = styled.div`
  margin: 50px 0;
  p {
    color: lightgray;
    text-align: center;
  }
`;

const ListItemContainer = styled.div`
  transition: background-color 0.3s;
  &:hover {
    width: 100%;
    cursor: pointer;
    background-color: whitesmoke;
  }
`;

const ListStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 100%;
  margin: 20px auto;
  list-style: none;
`;

const ListButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 40px;
  padding-right: 5px;
`;

const TrainingSeriesTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const mapStateToProps = state => ({
  isLoading: state.messagesReducer.isLoading,
  posts: state.messagesReducer.messages,
  assignments: state.trainingSeriesReducer.assignments,
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  teamMembers: state.teamMembersReducer.teamMembers
});

TrainingSeriesPosts.propTypes = {};

export default connect(
  mapStateToProps,
  {
    getTrainingSeriesMessages,
    getTeamMembers,
    createAMessage,
    editMessage,
    deleteMessage,
    getMembersAssigned,
    editTrainingSeries
  }
)(withStyles(styles)(TrainingSeriesPosts));
