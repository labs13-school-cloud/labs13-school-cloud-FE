import React from "react";
import { connect } from "react-redux";

//Components
import StripeView from "../../Misc/Stripe/StripeView";
import { logout } from "Auth/Auth";
import Authentication from "../../Misc/authenticate";

//State Management
import { getUser, editUser, deleteUser } from "store/actions/userActions";

//Styling
import {
  Button,
  Card,
  CardActions,
  Typography,
  withStyles,
  Modal,
  Avatar,
  Divider,
  Paper
} from "@material-ui/core";
import { styles, Container, ButtonContainer, getModalStyle } from "./styles.js";

const scope =
  "channels:history channels:read chat:write:bot groups:history im:history im:write mpim:history bot reactions:read users:read";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleProfile: [],
      open: false
    };
  }

  componentDidMount() {
    this.props.disableSnackbar();
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, slack: false });
  };

  handleLogout = e => {
    e.preventDefault();
    logout();
    this.props.history.push("/");
  };

  handleDelete = id => {
    this.props.deleteUser(id);
    this.props.history.push("/");
  };

  authorizeSlack = async () => {
    const url = `https://slack.com/oauth/authorize?client_id=604670969987.618830021958&scope=${scope}&redirect_uri=${`${
      process.env.REACT_APP_URL
    }/slack-callback`}&state=${"Yes, this is a terrible state to provide but I want to test it for now, that's all"}`;

    window.location = url;
  };

  render() {
    const { user } = this.props.userProfile;
    const { classes } = this.props;
    let account;

    if (this.props.doneLoading) {
      let type = user.subscription;
      if (type === "Pro" || type === "Premium") {
        account = true;
      } else if (type === "free") {
        account = false;
      }
    }

    return (
      <Container>
        {this.props.doneLoading && (
          <>
            <Card className={classes.profileContainer}>
              <div>
                <Avatar
                  alt="profile pic of logged-in user"
                  src={JSON.parse(localStorage.getItem("Profile")).picture}
                  className={classes.bigAvatar}
                />
                <Typography gutterBottom variant="h5" component="h1">
                  {user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {user.email}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="subtitle1"
                >
                  <div>Account Type: {user.subscription}</div>
                </Typography>
              </div>
              <div>
                <Divider variant="middle" className={classes.divider} />
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="subtitle1"
                  className={classes.bold}
                >
                  Messages Sent
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="subtitle1"
                >
                  {/* quick fix for minor bug, newUser object doesn't have notification count */}
                  {user.notifications_sent ? user.notifications_sent : 0} out of{" "}
                  {user.max_notification_count}
                </Typography>
                <CardActions>
                  <ButtonContainer>
                    <Button
                      variant="contained"
                      onClick={this.handleOpen}
                      className={classes.button}
                    >
                      Delete Account
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        this.props.activateTutorial();
                      }}
                    >
                      Show Tutorial
                    </Button>
                    <a href="https://slack.com/oauth/authorize?client_id=604670969987.618830021958&scope=bot,channels:read,chat:write:bot,im:write,users:read,channels:history,im:history,groups:history,mpim:history,reactions:read">
                      <img
                        alt="Add to Slack"
                        height="40"
                        width="149.08"
                        src="https://platform.slack-edge.com/img/add_to_slack.png"
                        srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
                      />
                    </a>
                  </ButtonContainer>
                </CardActions>
              </div>
            </Card>

            <Card className={classes.pricing}>
              {/* <Pricing /> */}
              <StripeView user={this.state.googleProfile} />
            </Card>
          </>
        )}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Paper style={getModalStyle()} className={classes.paper}>
            {account ? (
              <>
                <Typography
                  variant="h6"
                  id="modal-title"
                  style={{ marginBottom: 10 }}
                >
                  Active subscription
                </Typography>
                <Typography>
                  Please unsubscribe from your current subscription before
                  deleting your account.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" id="modal-title">
                  Are you sure you want to delete your account?
                </Typography>
                <Typography variant="subtitle" className={classes.bottomSpace}>
                  All data associated with this account will be permanently
                  deleted.
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    this.handleDelete(user.id);
                  }}
                >
                  Delete Account
                </Button>
              </>
            )}
          </Paper>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: state.userReducer.userProfile,
    doneLoading: state.userReducer.doneLoading
  };
};

export default connect(
  mapStateToProps,
  {
    getUser,
    editUser,
    deleteUser
  }
)(withStyles(styles)(Authentication(Profile)));
