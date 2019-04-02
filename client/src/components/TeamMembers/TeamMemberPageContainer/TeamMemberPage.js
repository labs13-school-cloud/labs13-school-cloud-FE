import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

// Team Member Actions
import {
  editTeamMember,
  getTrainingSeries,
  getTeamMemberByID
} from "../../../store/actions";

//Components
import AddToTrainingSeriesModal from "../../Modals/addToTrainingSeriesModal";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "80%",
    margin: "20px auto"
  },
  form: {
    width: "90%",
    margin: "0 auto"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit
  }
});

class TeamMemberPage extends React.Component {
  state = {
    teamMember: {
      firstName: "",
      lastName: "",
      jobDescription: "",
      email: "",
      phoneNumber: "",
      user_ID: "",
      TeamMemberCol: "",
      teamMemberID: ""
    },
    assignments: [],
    trainingSeries: []
  };

  componentDidMount() {
    // this.props.getTrainingSeries();
    this.props.getTeamMemberByID(this.props.match.params.id);
    if (this.props.loadSuccess)
      this.setState({ teamMember: this.props.teamMember });
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.loadSuccess) {
      // this.setState({ teamMember: this.props.teamMember });
      console.log(this.props.teamMember);
    }
  }

  getTeamMember = () => {
    this.props.getTeamMemberByID(this.props.match.params.id);

    // if (this.props.loadSuccess) {
    //   const { teamMember, assignments } = this.props.teamMember;
    //   console.log("TEAM MEMBER", this.props.teamMember);
    // }
  };

  handleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.value
      }
    });
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    console.log("REDUX TEAM MEMBER", this.props.teamMember.teamMember);

    // console.log("LOCAL STATE", this.state);

    // console.log("TEST", this.props.teamMember);

    return (
      <MainContainer>
        {this.props.loadSuccess && (
          <form className={classes.form}>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
            >
              Save
            </Button>
            <Paper className={classes.root}>
              <Typography>Team Member Info</Typography>
              <MemberInfoContainer>
                <TextField
                  id='standard-name'
                  label='first name'
                  className={classes.textField}
                  value={this.state.teamMember.firstName}
                  onChange={this.handleChange("firstName")}
                  margin='normal'
                />
                <TextField
                  id='standard-name'
                  label='last name'
                  className={classes.textField}
                  value={this.state.teamMember.lastName}
                  onChange={this.handleChange("lastName")}
                  margin='normal'
                />
                <TextField
                  id='standard-name'
                  label='job description'
                  className={classes.textField}
                  value={this.state.teamMember.jobDescription}
                  onChange={this.handleChange("jobDescription")}
                  margin='normal'
                />
              </MemberInfoContainer>
            </Paper>
            <Paper className={classes.root}>
              <Typography>Contact Info</Typography>
              <MemberInfoContainer>
                <TextField
                  id='standard-name'
                  label='email'
                  className={classes.textField}
                  value={this.state.teamMember.email}
                  onChange={this.handleChange("email")}
                  margin='normal'
                />
                <TextField
                  id='standard-name'
                  label='phone'
                  className={classes.textField}
                  value={this.state.teamMember.phoneNumber}
                  onChange={this.handleChange("phoneNumber")}
                  margin='normal'
                />

                <TextField
                  id='date'
                  label='start date'
                  type='date'
                  // defaultValue="2017-05-24"
                  className={classes.textField}
                  onChange={this.handleDate("startDate")}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </MemberInfoContainer>
            </Paper>
            <Paper className={classes.root}>
              <Typography>Training Series</Typography>
              <MemberInfoContainer>
                <AddToTrainingSeriesModal userId={this.props.userId} />
              </MemberInfoContainer>
            </Paper>
          </form>
        )}
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  margin: 100px auto 0;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const mapStateToProps = state => {
  return {
    isEditing: state.teamMembersReducer.status.isEditing,
    isLoading: state.teamMembersReducer.status.isLoading,
    loadSuccess: state.teamMembersReducer.status.loadSuccess,
    loadFailed: state.teamMembersReducer.status.loadFailed,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    teamMember: state.teamMembersReducer.teamMember
  };
};

export default connect(
  mapStateToProps,
  {
    getTrainingSeries,
    getTeamMemberByID,
    editTeamMember
  }
)(withStyles(styles)(TeamMemberPage));
