// component to contain all the components related to training series
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//REDUX
import { connect } from 'react-redux';
import { getNotifications } from '../../store/actions/';

//Components
import NotificationsList from './NotificationsList';

class NotificationsView extends Component {
  componentDidMount() {
    this.getNotifications();
  }

  getNotifications = () => {
    this.props.getNotifications(this.props.userId);
  };

  render() {
    return (
      <>
        <Route
          exact
          path={`${this.props.match.path}`}
          render={props => (
            <NotificationsList
              {...props}
              notifications={this.props.notifications}
              userID={this.props.userId}
            />
          )}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notificationsReducer.notifications,
    isLoading: state.notificationsReducer.isLoading
  };
};

export default connect(
  mapStateToProps,
  {
    getNotifications
  }
)(NotificationsView);
