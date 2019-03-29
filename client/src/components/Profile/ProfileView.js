import React from "react";

//Components
import AppBar from "../AppBar/AppBar";
import DeleteModal from "../Modals/deleteModal";

//Stripe
import StripeView from "../Stripe/StripeView";

//Auth
import { logout, getUserProfile } from "../../Auth/Auth";
import Authentication from "../authenticate/authenticate";

//State Management
import { connect } from "react-redux";
import { getUser, editUser, deleteUser } from "../../store/actions/userActions";

//Styling
import {
  Button,
  Card,
  CardActions,
  CardMedia,
  Typography,
  withStyles
} from "@material-ui/core";
import styled from "styled-components";

const styles = {
  card: {
    maxWidth: 800,
    margin: "0 auto"
  },
  cardContent: {
    backgroundColor: "#E8E9EB"
  },
  media: {
    height: 200,
    width: 200
  }
};

const Container = styled.div`
  margin-top: 80px;
`;

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      googleProfile: []
    };
  }

  handleLogout = e => {
    e.preventDefault();
    logout();
    this.props.history.push("/");
  };

  handleDelete = () => {
    this.props.deleteUser(this.props.userProfile.user.userID);
  };

  componentDidMount() {
    //Gets profile from Auth0(Google)
    getUserProfile(() => {
      //Gets the user from DB
      this.props.getUser();
      // Sets profile to Local storage -- Assigns it to state
      this.setState({
        googleProfile: JSON.parse(localStorage.getItem("Profile"))
      });
    });
  }
  render() {
    console.log(this.props);
    //Destructure user from userProfile
    const { user } = this.props.userProfile;
    const { classes } = this.props;
    let accountType;
    if (this.props.doneLoading) {
      let type = user.accountTypeID;
      if (type === 3) {
        accountType = <span>Pro</span>;
      } else if (type === 2) {
        accountType = <span>Premium</span>;
      } else if (type === 1) {
        accountType = <span>Free</span>;
      }
    }
    return (
      <Container>
        {this.props.doneLoading && (
          <>
            <AppBar />
            <div className='profile-area'>
              <Card className={classes.card}>
                <Typography gutterBottom variant='h5' component='h1'>
                  {user.name}
                </Typography>

                <CardMedia
                  className={classes.media}
                  image={this.state.googleProfile.picture}
                  title='Contemplative Reptile'
                />
                <Typography gutterBottom variant='h5' component='h5'>
                  {user.email}
                </Typography>
                <Typography gutterBottom variant='h5' component='h5'>
                  <div>Account Type: {accountType}</div>
                </Typography>
                <CardActions>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                  {/* Buton for deleting */}
                  <DeleteModal deleteType='user' id={user.userID} />
                </CardActions>
              </Card>
            </div>
            <StripeView user={this.state.googleProfile} />
          </>
        )}
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
)(withStyles(styles)(Authentication(ProfileView)));
