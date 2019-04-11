import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import { Paper, List, Typography, TextField, Button, Divider } from '@material-ui/core/';
import NotificationWidget from './SnackBarTeamMember';
//Components
import TrainingSeriesAssignments from './TrainingSeriesAssigments';
import DeleteModal from '../../Modals/deleteModal';

//Redux
import { connect } from 'react-redux';
import { getTrainingSeries } from '../../../store/actions';

const styles = theme => ({
  // these styles fixes the off-centering
  paper: {
    width: "90%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px 30px",
    outline: "none",
    margin: '20px auto',
    '@media (max-width: 480px)': {
      width: '94%',
      padding: 0,
      margin: "0 auto"
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  messageText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  divider: {
    margin: "15px 0"
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
        assignments: this.props.teamMember.assignments,
        trainingSeries: this.props.trainingSeries
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

    if (this.props.trainingSeries.length) {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Assigned Training Series</Typography>
            <Button variant="outlined" onClick={this.routeToAssigning}>
              Assign to Training Series
            </Button>
          </div>
          <List>{trainingAssigments}</List>
        </>
      );
    } else {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Training Series</Typography>
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
          <Paper className={classes.paper}>
            <Typography variant="title">{`Team Member Info`}</Typography>
            <Divider variant="fullWidth" className={classes.divider} />

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
          <Paper className={classes.paper}>{disabledTrainingSeries}</Paper>

        </form>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  margin: 0 auto;
  width: 60%;
  border: 1px solid red;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 20px auto;
  /* @media (max-width: 480px) {
		flex-direction: column;
		width: 90%;
	} */
`;

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
