import React from "react";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TrainingBotGIF from "../../../img/trainingBot.gif";

//State Management
import { addTeamMember } from "../../../store/actions";
import { connect } from "react-redux";

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
      user_ID: ""
    },
    assignments: [],
    trainingSeries: [],
    isRouting: false
  };

  handleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.value
      }
    });
  };

  addNewTeamMember = e => {
    e.preventDefault();
    const newMember = {
      ...this.state.teamMember,
      user_ID: this.props.userId
    };
    this.props.addTeamMember(newMember);
    this.setState({ isRouting: true });
    setTimeout(() => {
      this.props.history.push({
        pathname: `/home/team-member/${this.props.teamMember.teamMemberID}`,
        state: {
          success: true
        }
      });
    }, 1000);
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/home");
  };

  render() {
    const { classes } = this.props;

    return (
      <MainContainer>
        <Typography variant="display1" align="center" gutterBottom>
          Add A New Team Member
        </Typography>
        <form className={classes.form} onSubmit={e => this.addNewTeamMember(e)}>
          <Paper className={classes.root}>
            <Typography>Team Member Info</Typography>
            <MemberInfoContainer>
              <TextField
                autoFocus="true"
                id="standard-name"
                label="First Name"
                className={classes.textField}
                value={this.state.teamMember.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Job Description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange("jobDescription")}
                margin="normal"
                required
              />
            </MemberInfoContainer>
          </Paper>
          <Paper className={classes.root}>
            <Typography>Contact Info</Typography>
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="Email"
                className={classes.textField}
                value={this.state.teamMember.email}
                onChange={this.handleChange("email")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Phone Number"
                className={classes.textField}
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange("phoneNumber")}
                margin="normal"
                required
              />
            </MemberInfoContainer>
          </Paper>
          <ButtonContainer>
            <Button
              disabled={this.state.isRouting === true ? "true" : null}
              variant="primary"
              className={classes.button}
              type="submit"
            >
              {this.state.isRouting ? (
                <LoadingImage src={TrainingBotGIF} alt="Loading Icon" />
              ) : (
                "Submit"
              )}
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={e => this.handleCancel(e)}
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
  { addTeamMember }
)(withStyles(styles)(TeamMemberPage));

const MainContainer = styled.div`
  margin: 0 auto;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const LoadingImage = styled.img`
  width: 32px;
  height: auto;
  overflow: hidden;
  cursor: not-allowed;
  pointer-events: none;
  position: relative;
  padding: 0;
  margin: 0;
`;
