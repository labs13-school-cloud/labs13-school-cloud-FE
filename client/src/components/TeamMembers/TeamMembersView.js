// component to contain all the components related to team members

import React from "react";
import styled from "styled-components";
import Fuse from "fuse.js";

//Components
import TeamMembersList from "./TeamMembersList";
import Pagination from "material-ui-flat-pagination";

import {connect} from "react-redux";
import {withRouter} from "react-router";

import {withStyles} from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Fab,
  TextField,
  InputAdornment,
} from "@material-ui/core/";

import {
  getTeamMembers,
  addTeamMember,
  deleteTeamMember,
} from "../../store/actions";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    width: "100%",
    minHeight: "533px",
    boxSizing: "border-box",
    height: "100%",
    margin: 5,

    "@media (max-width:768px)": {
      width: "92%",
      marginBottom: 10,
      maxWidth: "none",
      height: "533px",
    },
  },
  textField: {
    width: "100%",
  },

  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    display: "flex",
    alignItems: "center",
  },
  fab: {
    margin: 5,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
    },
  },
  formControl: {
    margin: theme.spacing.unit,
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%",
  },
  // pagination: { width: '90%' },
});

class TeamMembersView extends React.Component {
  state = {
    users: [],
    profile: [],
    teamMembers: [],
    offset: 0,
    limit: 5,
    searchInput: "",
    searchOpen: false,
  };

  componentDidMount() {
    this.props.getTeamMembers(this.props.userId);
    this.setState({
      teamMembers: this.props.teamMembers,
    });
  }
  openSearch = e => {
    e.preventDefault();
    this.setState({searchOpen: !this.state.searchOpen});
  };
  handleClick(offset) {
    this.setState({offset});
  }
  handleChange = e => {
    this.setState({limit: parseInt(e.target.value, 10)});
  };

  deleteMember = (e, id) => {
    e.preventDefault();
    this.props.deleteTeamMember(id);
  };

  routeToCreateMemberPage = () => {
    this.props.toggleFreakinSnackBar();
    this.props.history.push("/home/create-team-member");
  };

  // function to set fuse option and return a response
  searchedMembers = team => {
    var options = {
      shouldSort: true,
      threshold: 0.3,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 3,
      keys: ["firstName", "lastName", "jobDescripton"],
    };

    const fuse = new Fuse(team, options);
    const res = fuse.search(this.state.searchInput);
    return res;
  };

  render() {
    const {classes} = this.props;

    // boolean for if the search input is active
    const searchOn = this.state.searchInput.length > 0;

    let teamMembers;

    // checks if the search field is active and there are results from the fuse search
    if (searchOn && this.searchedMembers(this.props.teamMembers).length > 0) {
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
        <TeamMembersList
          teamMembers={teamMembers}
          deleteTeamMember={this.deleteMember}
          limit={this.state.limit}
          offset={this.state.offset}
          userId={this.props.userId}
        />
      );
    }

    return (
      <Paper data-tour="1" className={classes.root} elevation={2}>
        <div className={classes.columnHeader}>
          <Typography variant="h5">Team Members</Typography>
          <div className={classes.icons}>
            <Fab
              size="small"
              aria-label="Add"
              className={classes.fab}
              onClick={e => this.openSearch(e)}
            >
              <i data-tour="2" className="material-icons">
                search
              </i>
            </Fab>
            <Fab
              size="small"
              aria-label="Add"
              className={classes.fab}
              onClick={this.routeToCreateMemberPage}
            >
              <i data-tour="3" className="material-icons">
                add
              </i>
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
              onChange={e => this.setState({searchInput: e.target.value})}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <i class="material-icons">search</i>
                  </InputAdornment>
                ),
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
    teamMembers: state.teamMembersReducer.teamMembers,
  };
};

export default connect(
  mapStateToProps,
  {getTeamMembers, addTeamMember, deleteTeamMember}
)(withStyles(styles)(withRouter(TeamMembersView)));

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightgray;
  height: 100%;
  text-align: center;
`;
