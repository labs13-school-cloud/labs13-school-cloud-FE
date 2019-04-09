import React from "react";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import { Paper, List, Typography, TextField, Button } from "@material-ui/core/";
import NotificationWidget from "./SnackBarTeamMember";
//Components
import AddTeamMemberToTrainingSeriesModal from "../../Modals/addTeamMemberToTrainingSeriesModal";
import TrainingSeriesAssignments from "./TrainingSeriesAssigments";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "94%",
    margin: "20px auto",
    "@media (max-width: 480px)": {
      width: "94%"
    }
  },
  // form: {
  // 	width: '90%',
  // 	margin: '0 auto'
  // },
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
  },
  trainingSeriesHeader: {
    display: "flex",
    justifyContent: "space-between"
  }
  // form: {
  // 	'@media (max-width: 480px)': {
  // 		flexDirection: 'column',
  // 		width: '95%'
  // 	}
  // }
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
    if (Object.keys(this.props.teamMember).length !== 0) {
      this.setState({
        teamMember: this.props.teamMember.teamMember,
        assignments: this.props.teamMember.assignments
      });
    }
  }

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
    console.log(this.props);
    const { classes } = this.props;

    const trainingAssigments =
      this.props.teamMember.assignments &&
      this.props.teamMember.assignments.map(trainingSeries => {
        // return console.log("****", trainingSeries);
        return (
          <TrainingSeriesAssignments
            trainingSeries={trainingSeries}
            teamMemberId={this.props.urlId}
          />
        );
      });

    return (
      <MainContainer>
        <form className={classes.form}>
          <ButtonContainer>
            <NotificationWidget
              teamMember={this.state.teamMember}
              editTeamMember={this.props.editTeamMember}
              type='success'
              submitType='edit'
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              onClick={e =>
                this.props.deleteTeamMember(e, this.state.teamMember)
              }
            >
              Delete
            </Button>
          </ButtonContainer>
          {/* <DeleteModal deleteType='inTeamMemberPage' id={this.props.urlId} /> */}
          <Paper className={classes.root}>
            <Typography variant={"h5"}>{`Team Member Info`}</Typography>
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
            <Typography variant={"h5"}>Contact Info</Typography>
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
            </MemberInfoContainer>
          </Paper>
          <Paper className={classes.root}>
            <div className={classes.trainingSeriesHeader}>
              <Typography variant={"h5"}>Training Series</Typography>
              <AddTeamMemberToTrainingSeriesModal
                modalType={"assignMultiple"}
                userId={this.props.userId}
                urlId={this.props.urlId}
                assignments={this.props.teamMember.assignments}
              />
            </div>
            <List>
              {/* <MemberInfoContainer> */}
              {/* <TrainingSeriesContainer> */}
              {trainingAssigments}
              {/* </TrainingSeriesContainer> */}
              {/* </MemberInfoContainer> */}
            </List>
          </Paper>
        </form>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div``;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  /* @media (max-width: 480px) {
		flex-direction: column;
		width: 90%;
	} */
`;

// const TrainingSeriesContainer = styled.div`
// 	display: flex;
// 	width: 90%;
// 	justify-content: space-evenly; */
// 	flex-wrap: wrap;
// `;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

export default withStyles(styles)(TeamMemberPage);
