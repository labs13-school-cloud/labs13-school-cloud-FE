// displays training series card
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core/';

import SlideDownModal from '../Modals/SlideDownModal';

//Customized Styling
const styles = {
  listItem: {
    width: '100%',
    // marginTop: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E8E9EB',
    transition: 'background-color 0.3s',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'whitesmoke'
      // "box-shadow": "0px 6px 15px -4px rgba(0,0,0,0.84)"
    }
  },
  title: {
    fontSize: 16
  }
};

function SeriesCard(props) {
  //console.log("TRAINING SERIES LIST", props);

  const { classes } = props;
  const [postLength, setPostLength] = useState(0);
  const [assignedLength, setAssignedLength] = useState(0);

  async function getPostCount() {
    await axios
      .get(
        `${process.env.REACT_APP_API}/api/training-series/${
          props.trainingSeriesID
        }/posts`
      )
      .then(res => {
        setPostLength(res.data.posts.length);
      })
      .catch(err => {
        //console.log(err);
      });
  }
  async function getMemberCount() {
    await axios
      .get(
        `${process.env.REACT_APP_API}/api/training-series/${
          props.trainingSeriesID
        }/assignments`
      )
      .then(res => {
        //console.log('getMemberCount', res.data.assignments.length);
        setAssignedLength(res.data.assignments.length);
      })
      .catch(err => {
        //console.log(err);
      });
  }

  useEffect(() => {
    getPostCount();
    getMemberCount();
  });

  const routeToTrainingSeriesPage = e => {
    e.preventDefault();

    props.history.push(`home/training-series/${props.trainingSeriesID}`);
  };

  return (
    <ListItem component="li" className={classes.listItem}>
      <ListItemText
        primary={props.data.title}
        secondary={`Messages: ${postLength} | Assigned: ${assignedLength}`}
        onClick={e => routeToTrainingSeriesPage(e)}
      />

      <SlideDownModal
        deleteTrainingSeries={props.deleteTrainingSeries}
        data={props.data}
        userId={props.userId}
      />
    </ListItem>
  );
}

SeriesCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(SeriesCard));
