// displays training series card
import React from 'react';

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

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={props.notification.title}
        secondary="Date: pending"
      />
    </ListItem>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
