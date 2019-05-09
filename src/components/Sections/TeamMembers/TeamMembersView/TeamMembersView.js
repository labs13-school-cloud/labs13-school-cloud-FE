// component to contain all the components related to team members

import React, { Suspense } from "react";
import Fuse from "fuse.js";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Pagination from "material-ui-flat-pagination";
import { withStyles } from "@material-ui/core/styles";

import { MessageContainer, styles } from "./styles.js";

import {
  Paper,
  Typography,
  Fab,
  TextField,
  InputAdornment
} from "@material-ui/core/";

import { getTeamMembers, addTeamMember, deleteTeamMember } from "store/actions";

const TeamMembersList = React.lazy(() => import("../TeamMembersList"));

class TeamMembersView extends React.Component {
  state = {
    users: [],
    profile: [],
    teamMembers: [],
    offset: 0,
    limit: 5,
    searchInput: "",
    searchOpen: false
  };

  componentDidMount() {
    this.props.getTeamMembers(this.props.userId);
    this.setState({
      teamMembers: this.props.teamMembers
    });
  }
  openSearch = e => {
    e.preventDefault();
    this.setState({ searchOpen: !this.state.searchOpen });
  };
  handleClick(offset) {
    this.setState({ offset });
  }
  handleChange = e => {
    this.setState({ limit: parseInt(e.target.value, 10) });
  };
  deleteMember = (e, id) => {
    e.preventDefault();
    this.props.deleteTeamMember(id);
  };
  routeToCreateMemberPage = () => {
    this.props.disableSnackbar();
    this.props.history.push("/home/create-team-member");
  };
  searchedMembers = team => {
    // function to set fuse option and return a response
    var options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["first_name", "last_name", "job_descripton"]
    };

    const fuse = new Fuse(team, options);
    const res = fuse.search(this.state.searchInput);
    return res;
  };

  render() {
    const { classes } = this.props;

    let teamMembers;

    // checks if the search field is active and there are results from the fuse search
    if (
      this.state.searchInput.length &&
      this.searchedMembers(this.props.teamMembers).length
    ) {
      teamMembers = this.searchedMembers(this.props.teamMembers);
    } else {
      teamMembers = this.props.teamMembers;
    }

    let teamMembersDisplay;

    if (this.props.teamMembers.length === 0) {
      teamMembersDisplay = (
        <MessageContainer>
          <p>You do not have any team members.</p>
        </MessageContainer>
      );
    } else {
      teamMembersDisplay = (
        <Suspense fallback={<span />}>
          <TeamMembersList
            teamMembers={teamMembers}
            deleteTeamMember={this.deleteMember}
            limit={this.state.limit}
            offset={this.state.offset}
            userId={this.props.user_id}
          />
        </Suspense>
      );
    }

    return (
      <Paper data-tour="1" className={classes.root} elevation={2}>
        <div className={classes.columnHeader}>
          <Typography variant="h5">Team Members</Typography>
          <div className={classes.icons}>
            <Fab
              data-tour="2"
              size="small"
              aria-label="Add"
              className={classes.fab}
              onClick={e => this.openSearch(e)}
            >
              <i className="material-icons">search</i>
            </Fab>
            <Fab
              data-tour="3"
              size="small"
              aria-label="Add"
              className={classes.fab}
              onClick={this.routeToCreateMemberPage}
            >
              <i className="material-icons">add</i>
            </Fab>
          </div>
        </div>
        <div>
          {this.state.searchOpen && (
            <TextField
              id="standard-search"
              // label="Search Team Members"
              type="search"
              className={classes.textField}
              onChange={e => this.setState({ searchInput: e.target.value })}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i className="material-icons">search</i>
                  </InputAdornment>
                )
              }}
            />
          )}
        </div>
        {teamMembersDisplay}
        <div className={classes.footer}>
          <Pagination
            limit={this.state.limit}
            reduced={true}
            offset={this.state.offset}
            total={teamMembers.length}
            centerRipple={true}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.teamMembersReducer.status.isLoading,
    loadFailed: state.teamMembersReducer.status.loadFailed,
    isAdding: state.teamMembersReducer.status.isAdding,
    addSuccess: state.teamMembersReducer.status.addSuccess,
    addFailed: state.teamMembersReducer.status.addFailed,
    teamMembers: state.teamMembersReducer.teamMembers
  };
};

export default connect(
  mapStateToProps,
  { getTeamMembers, addTeamMember, deleteTeamMember }
)(withStyles(styles)(withRouter(TeamMembersView)));
