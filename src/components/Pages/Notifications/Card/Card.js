// Parent "card" container for any Notification displays
import React, { useState, Suspense } from "react";
import { connect } from "react-redux";

import filter from "./filter.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core/";
import Pagination from "material-ui-flat-pagination";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { styles, MessageContainer } from "./styles.js";

function Card(props) {
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [offset, setOffset] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const { classes, Notifications } = props;
  const limit = props.limit || 5;

  const filters = { status: statusFilter, service: serviceFilter };
  const title =
    statusFilter === "pending" ? `${notificationsCount} Pending` : "Sent";

  return (
    <Paper data-tour="5" className={classes.root} elevation={2}>
      <div className={classes.columnHeader}>
        <Typography variant="h5">{title} Notifications</Typography>
        <div>
          <FormControl className={classes.formControl}>
            <Select
              native
              className={classes.selection}
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
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
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
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
        <Notifications
          offset={offset}
          filter={filter}
          filters={filters}
          limit={limit}
          countNotifications={setNotificationsCount}
          member_id={props.member_id}
        />
        {!notificationsCount && (
          <MessageContainer>
            <p>
              {props.isLoading
                ? "Loading your Notifications."
                : "You do not have any pending messages."}
            </p>
          </MessageContainer>
        )}
      </Suspense>
      <div className={classes.footer}>
        <Pagination
          limit={limit}
          offset={offset}
          total={notificationsCount}
          centerRipple={true}
          onClick={(e, newOffset) => setOffset(newOffset)}
        />
      </div>
    </Paper>
  );
}

const mapStateToProps = state => ({
  isLoading: state.notificationsReducer.isLoading
});

export default connect(mapStateToProps)(withStyles(styles)(Card));
