import React from "react";
import classNames from "classnames";

import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";

import { withRouter } from "react-router";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },
    "&:disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      border: "none"
    }
  }
});

class CustomizedSnackbars extends React.Component {
  state = {
    open: false
  };

  handleClick = e => {
    if (this.props.submitType === "edit") {
      this.setState({ open: true });
    } else if (this.props.submitType === "add") {
      // Not used
      this.setState({ open: true });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
  };

  renderSnackBar = () => {
    switch (this.props.type) {
      case "success":
        return (
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Successfully updated team member"
          />
        );
      case "delete":
        return (
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="error"
            message="An error has occurred"
          />
        );
      default:
        return (
          <MySnackbarContentWrapper
            onClose={this.handleClose}
            variant="success"
            message="Success!"
          />
        );
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button
          disabled={this.props.disabled}
          variant="outlined"
          type="submit"
          className={classes.button}
          onClick={e => this.handleClick(e)}
        >
          {this.props.submitType === "add" ? "Add Member" : "Save"}
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          {this.renderSnackBar}
        </Snackbar>
      </div>
    );
  }
}

export default withStyles(styles2)(withRouter(CustomizedSnackbars));
