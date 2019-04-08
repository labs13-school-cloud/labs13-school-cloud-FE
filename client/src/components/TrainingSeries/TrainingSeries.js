// displays training series card
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import {
  // Card,
  // CardContent,
  // Typography,
  // List,
  // ListItemSecondaryAction,
  ListItem,
  ListItemText
} from '@material-ui/core/';

import SlideDownModal from '../Modals/SlideDownModal';

//Customized Styling
const styles = {
  listItem: {
    width: '100%',
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E8E9EB'
  },
  title: {
    fontSize: 16
  }
};

function SeriesCard(props) {
  const { classes } = props;
  const [postLength, setPostLength] = useState(0);

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
        console.log(err);
      });
  }

  useEffect(() => {
    getPostCount();
  });

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={props.data.title}
        secondary={`Messages: ${postLength}`}
      />

      <SlideDownModal
        deleteTrainingSeries={props.deleteTrainingSeries}
        data={props.data}
        userID={props.userID}
      />
    </ListItem>
  );
}

SeriesCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SeriesCard);
