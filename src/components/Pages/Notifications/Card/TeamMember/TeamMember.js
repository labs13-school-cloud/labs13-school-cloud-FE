// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";

import { getNotifications } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography
} from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

import slack_black_logo from "img/slack_black_logo.png";
import TextsmsOutlined from "@material-ui/icons/TextsmsOutlined";
import EmailOutlined from "@material-ui/icons/EmailOutlined";

function TeamMember({
  offset,
  filter,
  filters,
  limit,
  countNotifications,
  getNotifications,
  notifications,
  classes,
  member_id
}) {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const displayedLogo = {
    twilio: <TextsmsOutlined />,
    sendgrid: <EmailOutlined />,
    slack: (
      <img
        className={classes.listItemIcon}
        src={slack_black_logo}
        alt="monochrome Slack app logo"
      />
    )
  };

  const setFilters = {
    items: notifications,
    offset,
    limit,
    filters,
    member_id
  };

  let formatted = filter(setFilters);
  formatted = formatted.map(
    ({ id, first_name, last_name, send_date, subject, name, series }) => {
      const formattedSendDate = moment(send_date)
        .add(1, "hours")
        .format("MMMM Do");
      return (
        <ListItem key={id} className={classes.listItem}>
          <ListItemIcon>{displayedLogo[name]}</ListItemIcon>
          <ListItemText
            primary={`${subject} | ${series}`}
            secondary={`${first_name} ${last_name}`}
          />

          <Typography className={classes.send_date}>
            {filters.status === "pending" ? "Send Date" : "Sent on"}
            <br />
            {formattedSendDate}
          </Typography>
        </ListItem>
      );
    }
  );

  countNotifications(formatted.length);

  return <ListStyles>{formatted}</ListStyles>;
}

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.notifications
});

export default connect(
  mapStateToProps,
  { getNotifications }
)(withStyles(styles)(TeamMember));
