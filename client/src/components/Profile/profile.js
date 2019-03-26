import React from 'react';

//Prop Types
import PropTypes from 'prop-types';

//Styling
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';

//Components
import AppBar from '../AppBar/AppBar';

//Authentication
import {logout, isLoggedIn, login} from '../../Auth/Auth';
import Authentication from '../authenticate/authenticate';

const styles = {
  card: {
    maxWidth: 800,
    margin: '0 auto',
  },
  cardContent: {
    backgroundColor: '#E8E9EB',
  },
  media: {
    height: 200,
    width: 200,
  },
};

const Container = styled.div`
  margin-top: 80px;
`;

class Profile extends React.Component {
  state = {
    userProfile: [],
  };

  componentDidMount() {
    //Gets the user profile and assigns it to state
    const user = JSON.parse(localStorage.getItem('Profile'));
    this.setState({userProfile: user});
  }

  render() {
    const {classes} = this.props;
    const {userProfile} = this.state;
    return (
      <div className="container">
        <AppBar />
        <Container>
          <div className="profile-area">
            <Card className={classes.card}>
              <Typography gutterBottom variant="h5" component="h1">
                {userProfile.name}
              </Typography>

              {/* <CardActionArea> */}
              <CardMedia
                className={classes.media}
                image={userProfile.picture}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {userProfile.nickname}
                </Typography>
                <Typography component="p">
                  <pre>{JSON.stringify(userProfile, null, 2)}</pre>
                </Typography>
              </CardContent>
              {/* </CardActionArea> */}
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="secondary">
                  Delete Account
                </Button>
              </CardActions>
            </Card>
          </div>
        </Container>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Authentication(Profile));
