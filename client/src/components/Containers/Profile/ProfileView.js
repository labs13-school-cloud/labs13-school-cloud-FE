import React from "react";
import { connect } from "react-redux";

//Components
// import UserModal from '../Modals/userModal';
import StripeView from "../../Misc/Stripe/StripeView";
import { logout } from "../../../Auth/Auth";
import Authentication from "../../Misc/authenticate/";

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
import { styles, Container, ButtonContainer } from "./styles.js";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleProfile: [],
      open: false
    };
  }

  componentDidMount() {
    this.props.toggleFreakinSnackBar();
  }
  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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

  render() {
    //Destructure user from userProfile
    const { user } = this.props.userProfile;
    const { classes } = this.props;

    let accountType;
    let account;
    let maxCount;
    if (this.props.doneLoading) {
      let type = user.account_type_id;
      if (type === 3) {
        accountType = <span>Pro</span>;
        account = true;
        maxCount = 1000;
      } else if (type === 2) {
        accountType = <span>Premium</span>;
        account = true;
        maxCount = 200;
      } else if (type === 1) {
        accountType = <span>Free</span>;
        account = false;
        maxCount = 50;
      }
    }

    return (
      <Container>
        {this.props.doneLoading && (
          <>
            <Card className={classes.profileContainer}>
              <div>
                <Avatar
                  alt="Remy Sharp"
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
                  <div>Account Type: {accountType}</div>
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
                  {user.notification_count ? user.notification_count : 0} out of{" "}
                  {maxCount}
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
                      this.handleDelete(user.userID);
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
    doneLoading: state.userReducer.doneLoading,
    isEditing: state.userReducer.isEditing
  };
};

export default connect(
  mapStateToProps,
  {
    getUser,
    editUser,
    deleteUser
  }
)(withStyles(styles)(Authentication(ProfileView)));
