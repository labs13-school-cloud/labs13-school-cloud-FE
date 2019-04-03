// displays training series card
import React from 'react';
import { Link } from 'react-router-dom';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SlideDownModal from '../Modals/SlideDownModal';
import TrainingSeriesModal from '../Modals/TrainingSeriesModal';
//Customized Styling
const styles = {
  card: {
    minWidth: 275,
    maxWidth: 325,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    display:'flex',
    justifyContent:'space-between'

  },
  title: {
    fontSize: 16,
  },
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
      </CardContent>
      <CardActions>
        <SlideDownModal deleteTrainingSeries={props.deleteTrainingSeries} data={props.data} userID={props.userID} />
      </CardActions>
    </Card>
  );
}

SeriesCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeriesCard);
