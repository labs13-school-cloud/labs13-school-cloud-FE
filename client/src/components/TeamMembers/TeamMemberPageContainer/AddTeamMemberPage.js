import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import NotificationWidget from "./SnackBarTeamMember";

//Components
import AddTeamMemberToTrainingSeriesModal from "../../Modals/addTeamMemberToTrainingSeriesModal";
import TrainingSeriesAssignments from "./TrainingSeriesAssigments";

import { addTeamMember } from "../../../store/actions";

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
    trainingSeries: []
  };

  componentDidMount() {
    // this.setState({
    //   teamMember: this.props.teamMember.teamMember,
    //   assignments: this.props.teamMember.assignments
    // });
  }

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
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    console.log("ADD MEMBER PAGE", this.props);
    // const trainingAssigments =
    //   this.props.teamMember.assignments &&
    //   this.props.teamMember.assignments.map(trainingSeries => {
    //     // return console.log("****", trainingSeries);
    //     return (
    //       <TrainingSeriesAssignments
    //         trainingSeries={trainingSeries}
    //         teamMemberId={this.props.urlId}
    //       />
    //     );
    //   });

    return (
      <MainContainer>
        <form className={classes.form}>
          <ButtonContainer>
            <NotificationWidget
              teamMember={this.state.teamMember}
              editTeamMember={this.props.editTeamMember}
              addTeamMember={this.addNewTeamMember}
              type="success"
              submitType="add"
            />
            {/* <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={e =>
                this.props.deleteTeamMember(e, this.state.teamMember)
              }
            >
              Delete
            </Button> */}
          </ButtonContainer>
          {/* <DeleteModal deleteType='inTeamMemberPage' id={this.props.urlId} /> */}
          <Paper className={classes.root}>
            <Typography>Team Member Info</Typography>
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="first name"
                className={classes.textField}
                value={this.state.teamMember.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="last name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="job description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange("jobDescription")}
                margin="normal"
              />
            </MemberInfoContainer>
          </Paper>
          <Paper className={classes.root}>
            <Typography>Contact Info</Typography>
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="email"
                className={classes.textField}
                value={this.state.teamMember.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="phone"
                className={classes.textField}
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange("phoneNumber")}
                margin="normal"
              />
            </MemberInfoContainer>
          </Paper>
          {/* <Paper className={classes.root}>
            <Typography>Training Series</Typography>
            <MemberInfoContainer>
              <div>
                <AddTeamMemberToTrainingSeriesModal
                  modalType={"assignMultiple"}
                  userId={this.props.userId}
                  urlId={this.props.urlId}
                  assignments={this.props.teamMember.assignments}
                />
              </div>
              <TrainingSeriesContainer>
                {trainingAssigments}
              </TrainingSeriesContainer>
            </MemberInfoContainer>
          </Paper> */}
        </form>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  margin: 0 auto;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TrainingSeriesContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

export default connect(
  null,
  { addTeamMember }
)(withStyles(styles)(TeamMemberPage));
