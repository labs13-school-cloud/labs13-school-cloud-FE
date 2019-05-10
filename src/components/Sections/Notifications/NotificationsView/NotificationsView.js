import React, { Component, Suspense } from "react";

//Components
// import NotificationsList from './NotificationsList';

//Styling
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//State Management
import { connect } from "react-redux";
import { getNotifications } from "store/actions";

const NotificationsList = React.lazy(() => import("../NotificationsList"));

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    width: "50%",
    boxSizing: "border-box",
    minHeight: "533px",
    height: "100%",
    margin: 5,
    "@media (max-width: 1400px)": {
      width: "100%",
      height: "533px"
    },
    "@media (max-width: 1000px)": {
      width: "100%"
    },

    "@media (max-width: 768px)": {
      width: "92%",
      height: "100%"
    }
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  icons: {
    display: "flex",
    alignItems: "center"
  },
  fab: { margin: 5 },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  },
  pagination: { width: "90%" },
  selection: { margin: "0 10px" }
});

class Notifications extends Component {
  state = {
    offset: 0,
    limit: 5,
    filterType: "all",
    filterSent: "pending"
  };

  componentDidMount() {
    this.props.getNotifications();
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
  handleFilterSent = e => {
    this.setState({ filterSent: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const allNotifications = this.props.notifications;

    allNotifications.sort((a, b) =>
      a.send_date > b.send_date ? 1 : b.send_date > a.send_date ? -1 : 0
    );

    const serviceFiltered =
      this.state.filterType === "all"
        ? allNotifications
        : allNotifications.filter(n => n.name === this.state.filterType);

    const filteredReturn =
      this.state.filterSent === "pending"
        ? serviceFiltered.filter(n => !n.is_sent)
        : serviceFiltered.filter(n => n.is_sent);

    const notificationCount = filteredReturn.length;

    return (
      <Paper data-tour="5" className={classes.root} elevation={2}>
        <div className={classes.columnHeader}>
          <Typography variant="h5">
            {this.state.filterSent === "pending"
              ? `${notificationCount} Pending Messages`
              : "Sent Messages"}
          </Typography>
          <div>
            <FormControl className={classes.formControl}>
              <Select
                native
                className={classes.selection}
                value={this.state.filterType}
                onChange={e => this.handleFilter(e)}
                inputProps={{
                  id: "kind-selector",
                  label: "Filter Selector"
                }}
              >
                <option value={"all"}>All</option>
                <option value={"twilio"}>Text</option>
                <option value={"sendgrid"}>Email</option>
                <option value={"slack"}>Slack</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                native
                className={classes.selection}
                value={this.state.filterSent}
                onChange={e => this.handleFilterSent(e)}
                inputProps={{
                  id: "status-selector",
                  label: "Filter Selector"
                }}
              >
                <option value={"pending"}>Pending</option>
                <option value={"sent"}>Sent</option>
              </Select>
            </FormControl>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <NotificationsList
            notifications={filteredReturn}
            notificationCount={notificationCount}
            filterSent={this.state.filterSent}
            offset={this.state.offset}
            match={this.props.match}
            userID={this.props.userID}
            limit={this.state.limit}
          />
        </Suspense>
        <div className={classes.footer}>
          <Pagination
            limit={this.state.limit}
            offset={this.state.offset}
            total={filteredReturn.length}
            centerRipple={true}
            onClick={(e, offset) => this.handleClick(offset)}
          />
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notificationsReducer.notifications,
    isLoading: state.notificationsReducer.isLoading
  };
};

export default connect(
  mapStateToProps,
  {
    getNotifications
  }
)(withStyles(styles)(Notifications));
