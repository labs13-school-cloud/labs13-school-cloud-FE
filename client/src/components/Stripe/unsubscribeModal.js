import React from "react";
import { connect } from "react-redux";

import { withStyles, Button, Typography } from "@material-ui/core/";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    maxWidth: "300px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "40px 20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    margin: "0 auto"
  },
  button: {
    marginTop: "20px"
  }
});
class UnsubscribeModal extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={getModalStyle()} className={classes.paper}>
        <Typography variant="subheading">
          Are you sure you want to unsubscribe?
        </Typography>

        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            variant="contained"
            color="default"
            type="submit"
            onClick={() => {
              this.props.unsub(
                this.props.userProfile.userID,
                this.props.userProfile.stripe
              );
            }}
          >
            Unsubscribe
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    plans: state.stripeReducer.plans,
    plan: state.stripeReducer.plan,
    stripeLoading: state.stripeReducer.isLoading,
    userLoading: state.userReducer.isLoading,
    userProfile: state.userReducer.userProfile.user,
    userError: state.userReducer.error,
    stripeError: state.stripeReducer.error
  };
};

export default connect(mapStateToProps)(withStyles(styles)(UnsubscribeModal));
