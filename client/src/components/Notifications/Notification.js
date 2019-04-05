import React from 'react';
import moment from 'moment';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core/';

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

function Notification(props) {
  const { classes } = props;
  const { firstName, lastName, sendDate, postName } = props.notification;

  return (
    <ListItem className={classes.listItem}>
      <ListItemText primary={postName} secondary={`${firstName} ${lastName}`} />
      <p>{moment(sendDate).format('MMMM Do')}</p>
    </ListItem>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
