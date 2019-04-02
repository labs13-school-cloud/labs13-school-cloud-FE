import React from "react";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//Components
import AddToTrainingSeriesModal from "../../Modals/addToTrainingSeriesModal";
import DeleteModal from "../../Modals/deleteModal";

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
    this.setState({
      teamMember: this.props.teamMember.teamMember,
      assignments: this.props.teamMember.assignments
    });
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
    const { classes } = this.props;
    return (
      <MainContainer>
        <form className={classes.form}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={e => this.props.editTeamMember(e, this.state.teamMember)}
          >
            Save
          </Button>
          <DeleteModal deleteType='teamMember' id={this.props.urlId} />
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
            </MemberInfoContainer>
          </Paper>
          <Paper className={classes.root}>
            <Typography>Training Series</Typography>
            <MemberInfoContainer>
              <AddToTrainingSeriesModal userId={this.props.userId} />
            </MemberInfoContainer>
          </Paper>
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

export default withStyles(styles)(TeamMemberPage);
