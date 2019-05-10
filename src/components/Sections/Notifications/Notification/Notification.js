import React from "react";
import moment from "moment";
import phoneFormatter from "phone-formatter";

//PropTypes
import PropTypes from "prop-types";

//Customized Styling
import { styles } from "./styles.js";

//Styling
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText, Typography } from "@material-ui/core/";

function Notification(props) {
  const { classes } = props;
  const {
    first_name,
    last_name,
    send_date,
    subject,
    name,
    email,
    phone_number,
    series
  } = props.notification;

  // add hours to sendDate, formatting with moment ensures it displays properly on the FE
  const formattedSendDate = moment(send_date)
    .add(1, "hours")
    .format("MMMM Do");

  return (
    <ListItem className={classes.listItem}>
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
