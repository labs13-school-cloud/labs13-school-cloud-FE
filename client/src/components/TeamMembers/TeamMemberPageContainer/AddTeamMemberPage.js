import React from 'react';
import {connect} from 'react-redux';

import styled from 'styled-components';

// Material UI
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NotificationWidget from './SnackBarTeamMember';

import {addTeamMember} from '../../../store/actions';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '80%',
    margin: '20px auto',
  },
  form: {
    width: '90%',
    margin: '0 auto',
  },
  info: {
    'margin-right': '50px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  button: {
    'margin-left': theme.spacing.unit,
  },
});

class TeamMemberPage extends React.Component {
  state = {
    teamMember: {
      firstName: '',
      lastName: '',
      jobDescription: '',
      email: '',
      phoneNumber: '',
      user_ID: '',
    },
    assignments: [],
    trainingSeries: [],
  };

  componentDidUpdate(prevProps) {
    if (prevProps.addSuccess !== this.props.addSuccess) {
      setTimeout(() => {
        const {teamMemberID} = this.props.teamMember && this.props.teamMember;
        this.props.history.push(`/home/team-member/${teamMemberID}`);
      }, 400);
    }
  }

  handleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.value,
      },
    });
  };

  addNewTeamMember = e => {
    e.preventDefault();
    const newMember = {
      ...this.state.teamMember,
      user_ID: this.props.userId,
    };

    this.props.addTeamMember(newMember);
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

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
                onChange={this.handleChange('firstName')}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange('lastName')}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Job Description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange('jobDescription')}
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
                onChange={this.handleChange('email')}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Phone Number"
                className={classes.textField}
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange('phoneNumber')}
                margin="normal"
                required
              />
            </MemberInfoContainer>
          </Paper>
          <ButtonContainer>
            {/* <NotificationWidget
              teamMember={this.state.teamMember}
              editTeamMember={this.props.editTeamMember}
              addTeamMember={this.addNewTeamMember}
              type="success"
              submitType="add"
            /> */}
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              type="submit"
            >
              Cancel
            </Button>
          </ButtonContainer>
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

// const TrainingSeriesContainer = styled.div`
//   display: flex;
//   width: 90%;
//   justify-content: space-evenly;
//   flex-wrap: wrap;
// `;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const mapStateToProps = state => {
  return {
    addSuccess: state.teamMembersReducer.status.addSuccess,
    teamMember: state.teamMembersReducer.teamMember,
  };
};

export default connect(
  mapStateToProps,
  {addTeamMember}
)(withStyles(styles)(TeamMemberPage));
