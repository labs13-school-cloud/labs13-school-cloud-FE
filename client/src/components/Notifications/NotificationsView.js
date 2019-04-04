import React, { Component } from 'react';

//Components
import NotificationsList from './NotificationsList';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Fab } from '@material-ui/core/';
import Pagination from 'material-ui-flat-pagination';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: '55%'
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
    notifications: [{ test: 'working' }],
    offset: 0,
    limit: 5
  };

  componentDidMount() {
    // this.getNotifications();
  }

  handleClick(offset) {
    this.setState({ offset });
  }
  handleChange = e => {
    this.setState({ limit: parseInt(e.target.value, 10) });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root} elevation={2}>
        <div className={classes.columnHeader}>
          <Typography variant="h5">Upcoming Notifications</Typography>
        </div>
        <NotificationsList
          notifications={this.state.notifications}
          offset={this.state.offset}
          match={this.props.match}
          userID={this.props.userID}
          limit={this.state.limit}
        />
        <div className={classes.footer}>
          <Pagination
            limit={this.state.limit}
            offset={this.state.offset}
            total={this.state.notifications.length}
            onClick={(e, offset) => this.handleClick(offset)}
          />

          {this.props.notifications.length < 5 ? (
            ''
          ) : (
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="pagination-selector">View</InputLabel>
              <Select
                native
                value={this.state.limit}
                onChange={e => this.handleChange(e)}
                inputProps={{
                  id: 'pagination-selector'
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </Select>
            </FormControl>
          )}
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(NotificationsView);
