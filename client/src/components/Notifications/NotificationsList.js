// main page for displaying list of all training series
import React from 'react';

//Styling
import styled from 'styled-components';

//Components
import Notification from './Notification';

import { withStyles } from '@material-ui/core';

const NotificationsList = props => {
  return (
    <>
      <ListStyles>
        {props.notifications.map(notification => {
          return (
            <Notification
              key={notification.notificationID}
              data={notification}
              match={props.match}
            />
          );
        })}
      </ListStyles>
    </>
  );
};

export default NotificationsList;
//Styled Components
const ListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
