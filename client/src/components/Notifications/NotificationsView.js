import React, { Component } from "react";
import moment from "moment";

//Components
import NotificationsList from "./NotificationsList";

//Styling
import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

//State Management
import { connect } from "react-redux";
import {
  getTextNotifications,
  getEmailNotifications
} from "../../store/actions/notificationsActions";

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
      width: "92%"
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

class NotificationsView extends Component {
  state = {
    offset: 0,
    limit: 5,
    filterType: "all",
    filterSent: "pending"
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
  handleFilterSent = e => {
    this.setState({ filterSent: e.target.value });
  };

  render() {
    const { classes } = this.props;
    const allNotifications = [
      ...this.props.textNotifications,
      ...this.props.emailNotifications
    ];

    // this is a quick fix to filter out empty values from the notification table.
    // ideally we would filter out empty contact values on the back end
    // we ran out of time and had to deliver
    const nonNullContactInformation = allNotifications.filter(
      notification =>
        notification.email !== "" && notification.phoneNumber !== ""
    );

    const filteredNotifications = nonNullContactInformation.filter(
      notification => {
        // check if first key included email or text
        if (notification.hasOwnProperty(this.state.filterType)) {
          return notification;
        } else if (this.state.filterType === "all") {
          return notification;
        }
      }
    );

    filteredNotifications.sort((a, b) =>
      a.sendDate > b.sendDate ? 1 : b.sendDate > a.sendDate ? -1 : 0
    );

    const filteredReturn =
      this.state.filterSent === "pending"
        ? filteredNotifications.filter(
            notification =>
              notification.textSent === 0 || notification.emailSent === 0
          )
        : filteredNotifications.filter(
            notification =>
              notification.textSent === 1 || notification.emailSent === 1
          );

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
                  id: "pagination-selector"
                }}
              >
                <option value={"all"}>All</option>
                <option value={"phoneNumber"}>Text</option>
                <option value={"email"}>Email</option>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Select
                native
                className={classes.selection}
                value={this.state.filterSent}
                onChange={e => this.handleFilterSent(e)}
                inputProps={{
                  id: "pagination-selector"
                }}
              >
                <option value={"pending"}>Pending</option>
                <option value={"sent"}>Sent</option>
              </Select>
            </FormControl>
          </div>
        </div>
        <NotificationsList
          notifications={filteredReturn}
          notificationCount={notificationCount}
          filterSent={this.state.filterSent}
          offset={this.state.offset}
          match={this.props.match}
          userID={this.props.userID}
          limit={this.state.limit}
        />
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
