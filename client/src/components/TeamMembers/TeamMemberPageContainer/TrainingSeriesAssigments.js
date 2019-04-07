import React from 'react';

import { connect } from 'react-redux';
import { deleteTeamMemberFromTrainingSeries } from '../../../store/actions';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from "@material-ui/core/CardActions";
import CardContent from '@material-ui/core/CardContent';
// import Button from "@material-ui/core/Button";
// import DeleteIcon from "@material-ui/icons/Delete";
// import Fab from "@material-ui/core/Fab";
// import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';

import DeleteModal from '../../Modals/deleteModal';

const moment = require('moment');

const styles = theme => ({
  card: {
    // minWidth: 275,
    width: 275,
    margin: '10px 5px',
    display: 'flex',
    'justify-content': 'space-between',
    padding: '5px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing.unit
  }
});

const TrainingSeriesAssignments = props => {
  const { classes } = props;

  const { teamMemberId } = props;
  const { trainingSeries_ID } = props.trainingSeries;

  const startDate = moment(props.trainingSeries.startDate)
    .add(1, 'days')
    .format('MMMM Do, YYYY ');

  const handleDelete = e => {
    e.preventDefault();

    props.deleteTeamMemberFromTrainingSeries(teamMemberId, trainingSeries_ID);
  };

  console.log('***ASSIGNMENTS***', teamMemberId, trainingSeries_ID);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>Title: {props.trainingSeries.title}</Typography>
        <Typography>Start Date: {startDate} </Typography>
      </CardContent>

      <DeleteModal
        teamMemberId={teamMemberId}
        trainingSeries_Id={trainingSeries_ID}
        deleteType="removeMemberFromTS"
      />
    </Card>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { deleteTeamMemberFromTrainingSeries }
)(withStyles(styles)(TrainingSeriesAssignments));
