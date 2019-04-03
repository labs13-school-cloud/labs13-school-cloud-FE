// displays training series card
import React from 'react';
import { Link } from 'react-router-dom';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import SlideDownModal from '../Modals/SlideDownModal';

//Customized Styling
const styles = {
  card: {
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16
  }
};

function SeriesCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          variant="h5"
          component="h3"
          gutterBottom
        >
          {props.data.title}
        </Typography>
        <Typography variant="caption">Posts: 10 | Assigned: 5</Typography>
      </CardContent>
      <SlideDownModal
        deleteTrainingSeries={props.deleteTrainingSeries}
        data={props.data}
        userID={props.userID}
      />
    </Card>
  );
}

SeriesCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SeriesCard);
