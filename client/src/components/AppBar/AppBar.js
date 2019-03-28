// navigation includes tab navigation, breadcrumbs, user avatar
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

//PropTypes
import PropTypes from "prop-types";

//Styling
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
//AUTH
import { logout } from "../../Auth/Auth";
// import { flex } from '@material-ui/system/flexbox';

//Images
import logo from "../../img/training-bot.png";

//Customized Styling
const styles = {
  avatar: {
    margin: 10
  },

  appBar: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    color: "white",
    backgroundColor: "",
    padding: 5
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  menuItems: {
    display: "flex",
    alignItems: "center",
    color: "white"
  }
};

const appBar = props => {

  const { classes } = props;
  // const [value, setValue] = React.useState(2);

  const toDashboard = e => {
    e.preventDefault();
    props.history.push("/home");
  };

  const pushToHome = e => {
    e.preventDefault();
    props.history.push("/home");
  };

  return (
    <>
      <AppBar className={classes.appBar}>
        <div className={classes.menuItems}>
          <img src={logo} alt="logo" className={classes.logo} />

          <Button onClick={e => pushToHome(e)}>Dashboard</Button>

          <Button>About</Button>
          <Button>Contact</Button>
          {
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => logout()}
            >
              Log Out
            </Button>
          }
        </div>

        <Link to="/profile">
          <Avatar alt="Avatar" src={logo} className={classes.avatar} />
        </Link>
      </AppBar>
    </>
  );
};

appBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(appBar));
