import React from "react";
import { connect } from "react-redux";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

// Team Member Actions
import { editTeamMember, getTrainingSeries } from "../../store/actions";

//Components
import AddToTrainingSeriesModal from "../Modals/addToTrainingSeriesModal";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "60%",
    margin: "20px auto"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "90%"
  },
  fab: {
    margin: theme.spacing.unit
  }
});

class TeamMemberPage extends React.Component {
  componentDidMount() {
    //When mounts, get Training series
    this.props.getTrainingSeries();
  }

  render() {
    const { classes } = this.props;

    console.log("MEMBER PAGE PROPS", this.props);
    return (
      <MainContainer>
        <form>
          <Paper className={classes.root}>
            <Typography>Team Member Info</Typography>
            <MemberInfoContainer>
              <TextField
                id='standard-name'
                label='first name'
                className={classes.textField}
                //   value={this.state.teamMember.firstName}
                //   onChange={this.handleChange("firstName")}
                margin='normal'
              />
              <TextField
                id='standard-name'
                label='last name'
                className={classes.textField}
                //   value={this.state.teamMember.lastName}
                //   onChange={this.handleChange("lastName")}
                margin='normal'
              />
              <TextField
                id='standard-name'
                label='job description'
                className={classes.textField}
                //   value={this.state.teamMember.jobDescription}
                //   onChange={this.handleChange("jobDescription")}
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
                // value={this.state.teamMember.email}
                // onChange={this.handleChange("email")}
                margin='normal'
              />
              <TextField
                id='standard-name'
                label='phone'
                className={classes.textField}
                // value={this.state.teamMember.phoneNumber}
                // onChange={this.handleChange("phoneNumber")}
                margin='normal'
              />
              <TextField
                id='date'
                label='start date'
                type='date'
                // defaultValue="2017-05-24"
                className={classes.textField}
                // onChange={this.handleDate("startDate")}
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
    trainingSeries: state.trainingSeriesReducer.trainingSeries
  };
};

export default connect(
  mapStateToProps,
  {
    getTrainingSeries
  }
)(withStyles(styles)(TeamMemberPage));
