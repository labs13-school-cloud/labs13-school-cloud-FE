import React from "react";
import moment from "moment";

//PropTypes
import PropTypes from "prop-types";

//Styling
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography } from "@material-ui/core/";
var phoneFormatter = require("phone-formatter");

//Customized Styling
const styles = {
  listItem: {
    width: "100%",
    marginBottom: 10,
    marginTop: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8E9EB"
  },
  title: {
    fontSize: 16
  },
  sendDate: {
    fontSize: 13,
    textAlign: "right"
  }
};

function Notification(props) {
  const { classes } = props;
  const {
    first_name,
    last_name,
    send_date,
    post_name,
    email,
    phone_number,
    title
  } = props.notification;

  // add hours to sendDate, formatting with moment ensures it displays properly on the FE
  const formattedSendDate = moment(send_date)
    .add(1, "hours")
    .format("MMMM Do");

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        primary={`${post_name} | ${title}`}
        secondary={`${first_name} ${last_name} | ${
          email ? email : phoneFormatter.format(phone_number, "(NNN) NNN-NNNN")
        }`}
      />
      <Typography className={classes.send_date}>
        {props.filterSent === "pending" ? "Send Date" : "Sent on"}
        <br />
        {formattedSendDate}
      </Typography>
    </ListItem>
  );
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
