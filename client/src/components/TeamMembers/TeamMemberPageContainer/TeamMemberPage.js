import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, Typography, TextField, Button } from '@material-ui/core/';
import NotificationWidget from './SnackBarTeamMember';
//Components
import AddTeamMemberToTrainingSeriesModal from '../../Modals/addTeamMemberToTrainingSeriesModal';
import TrainingSeriesAssignments from './TrainingSeriesAssigments';
import DeleteModal from '../../Modals/deleteModal';

//Redux
import { connect } from 'react-redux';
import { getTrainingSeries } from '../../../store/actions';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '94%',
    margin: '20px auto',
    '@media (max-width: 480px)': {
      width: '94%'
    }
  },
  form: {
    width: '90%',
    margin: '0 auto'
  },
  info: {
    'margin-right': '50px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%'
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    'margin-left': theme.spacing.unit
  },
  trainingSeriesHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  messageText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  }
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
      TeamMemberCol: '',
      teamMemberID: ''
    },
    assignments: [],
    trainingSeries: [] //Leigh-Ann: this may not be needed?
  };

  componentDidMount() {
    this.props.getTrainingSeries(this.props.userId);
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

  routeToAssigning = e => {
    e.preventDefault();
    this.props.history.push({
      pathname: `/home/assign-series/${this.state.teamMember.teamMemberID}`,
      state: {
        userId: this.props.userId,
        urlId: this.props.urlId,
        assignments: this.props.teamMember.assignments
      }
    });
  };

  render() {
    const { classes } = this.props;

    const trainingAssigments =
      this.props.teamMember.assignments &&
      this.props.teamMember.assignments.map(trainingSeries => {
        return (
          <TrainingSeriesAssignments
            trainingSeries={trainingSeries}
            teamMemberId={this.props.urlId}
          />
        );
      });

    let disabledTrainingSeries;
    let disabledBool;

    if (this.props.trainingSeries.length) {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant={'h5'}>Training Series</Typography>
            <Button variant="outlined" onClick={this.routeToAssigning}>
              Assign to Training Series
            </Button>
            {/* <AddTeamMemberToTrainingSeriesModal
              modalType={"assignMultiple"}
              userId={this.props.userId}
              urlId={this.props.urlId}
              assignments={this.props.teamMember.assignments}
            /> */}
          </div>
          <List>{trainingAssigments}</List>
        </>
      );
    } else {
      disabledBool = true;
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant={'h5'}>Training Series</Typography>
            <Button variant="outlined" disabled>
              Assign to Training Series
            </Button>
          </div>
          <Typography variant="subheading" className={classes.messageText}>
            You don't have any training series to assign.
          </Typography>
          <Typography variant="subheading" className={classes.messageText}>
            <Link to="/home/create-training-series">Click here</Link> to create
            your first training series.
          </Typography>
        </>
      );
    }

    return (
      <MainContainer>
        <form className={classes.form}>
          {/* <DeleteModal deleteType='inTeamMemberPage' id={this.props.urlId} /> */}
          <Paper className={classes.root}>
            <Typography variant={'h5'}>{`Team Member Info`}</Typography>
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="first name"
                className={classes.textField}
                value={this.state.teamMember.firstName}
                onChange={this.handleChange('firstName')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="last name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange('lastName')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="job description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange('jobDescription')}
                margin="normal"
              />
            </MemberInfoContainer>
          </Paper>
          <Paper className={classes.root}>
            <Typography variant={'h5'}>Contact Info</Typography>
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="email"
                className={classes.textField}
                value={this.state.teamMember.email}
                onChange={this.handleChange('email')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="phone"
                className={classes.textField}
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange('phoneNumber')}
                margin="normal"
              />
            </MemberInfoContainer>
          </Paper>
          <Paper className={classes.root}>{disabledTrainingSeries}</Paper>
          <ButtonContainer>
            <NotificationWidget
              teamMember={this.state.teamMember}
              editTeamMember={this.props.editTeamMember}
              type="success"
              submitType="edit"
            />
            <DeleteModal
              deleteType="inTeamMemberPage"
              teamMemberId={this.state.teamMember.teamMemberID}
              userId={this.props.userId}
              displayType="button"
            />
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
  margin: 0 auto;
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

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries
});

export default connect(
  mapStateToProps,
  { getTrainingSeries }
)(withStyles(styles)(TeamMemberPage));
