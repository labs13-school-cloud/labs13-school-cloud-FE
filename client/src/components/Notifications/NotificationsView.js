import React, { Component } from 'react';

//Components
import NotificationsList from './NotificationsList';

//Styling
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core/';
import Pagination from 'material-ui-flat-pagination';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//State Management
import { connect } from 'react-redux';
import {
  getTextNotifications,
  getEmailNotifications
} from '../../store/actions/notificationsActions';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '65%',
    '@media (max-width: 768px)': {
      width: '80%'
    }
  },
  columnHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icons: {
    display: 'flex',
    alignItems: 'center'
  },
  fab: { margin: 5 },
  footer: { display: 'flex', justifyContent: 'space-between' },
  pagination: { width: '90%' }
});

class NotificationsView extends Component {
  state = {
    offset: 0,
    limit: 10,
    filterType: 'all'
  };

  componentDidMount() {
    this.props.getTextNotifications(this.props.userId);
    this.props.getEmailNotifications(this.props.userId);
  }

  handleClick(offset) {
    this.setState({ offset });
  }
  handleChange = e => {
    this.setState({ limit: parseInt(e.target.value, 10) });
  };
  handleFilter = e => {
    this.setState({ filterType: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const allNotifications = [
      ...this.props.textNotifications,
      ...this.props.emailNotifications
    ];

    const notificationCount = allNotifications.length;

    const filteredNotifications = allNotifications.filter(notification => {
      // check if first key included email or text
      if (notification.hasOwnProperty(this.state.filterType)) {
        return notification;
      } else if (this.state.filterType === 'all') {
        return notification;
      }
    });

    filteredNotifications.sort((a, b) =>
      a.sendDate > b.sendDate ? 1 : b.sendDate > a.sendDate ? -1 : 0
    );

    return (
      <Paper className={classes.root} elevation={2}>
        <div className={classes.columnHeader}>
          <Typography variant="h5">{`${notificationCount} Pending Notifications`}</Typography>
          <FormControl className={classes.formControl}>
            <Select
              native
              value={this.state.filterType}
              onChange={e => this.handleFilter(e)}
              inputProps={{
                id: 'pagination-selector'
              }}
            >
              <option value={'all'}>All</option>
              <option value={'phoneNumber'}>Text</option>
              <option value={'email'}>Email</option>
            </Select>
          </FormControl>
        </div>
        <NotificationsList
          notifications={filteredNotifications}
          offset={this.state.offset}
          match={this.props.match}
          userID={this.props.userID}
          limit={this.state.limit}
        />
        <div className={classes.footer}>
          <Pagination
            limit={this.state.limit}
            offset={this.state.offset}
            total={filteredNotifications.length}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    textNotifications: state.notificationsReducer.textNotifications,
    emailNotifications: state.notificationsReducer.emailNotifications,
    isLoading: state.notificationsReducer.isLoading
  };
};

export default connect(
  mapStateToProps,
  {
    getTextNotifications,
    getEmailNotifications
  }
)(withStyles(styles)(NotificationsView));
