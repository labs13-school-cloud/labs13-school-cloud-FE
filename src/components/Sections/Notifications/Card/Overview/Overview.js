// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import phoneFormatter from "phone-formatter";

import { getNotifications } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview({
  offset,
  filters,
  limit,
  countNotifications,
  getNotifications,
  notifications,
  classes
}) {
  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  const formatNotifications = () => {
    const formattedNotifications = notifications
      .sort((a, b) =>
        a.send_date > b.send_date ? 1 : b.send_date > a.send_date ? -1 : 0
      )
      .filter(({ name, is_sent }) => {
        if (
          (filters.status === "pending" && !is_sent) ||
          (filters.status === "sent" && is_sent)
        ) {
          return filters.service === "all" ? true : name === filters.service;
        } else return false;
      })
      .filter(
        (_, i) => i >= offset && i < parseInt(offset, 10) + parseInt(limit, 10)
      )
      .map(
        ({
          id,
          first_name,
          last_name,
          send_date,
          subject,
          name,
          email,
          phone_number,
          series
        }) => {
          const formattedSendDate = moment(send_date)
            .add(1, "hours")
            .format("MMMM Do");
          return (
            <ListItem key={id} className={classes.listItem}>
              <ListItemText
                primary={`${subject} | ${series}`}
                secondary={`${first_name} ${last_name} | ${
                  email
                    ? email
                    : phone_number
                    ? phoneFormatter.format(phone_number, "(NNN) NNN-NNNN")
                    : name
                }`}
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
    countNotifications(formattedNotifications.length);
    return formattedNotifications;
  };
  return <ListStyles>{formatNotifications()}</ListStyles>;
}

const mapStateToProps = state => ({
  notifications: state.notificationsReducer.notifications
});

export default connect(
  mapStateToProps,
  { getNotifications }
)(withStyles(styles)(Overview));
