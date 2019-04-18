// main page for displaying list of all training series
import React from 'react';

//Styling
import styled from 'styled-components';

//Components
import Notification from './Notification';

const NotificationsList = props => {
  //Pagination code
  let arr = [];
  let offset = props.offset;
  let x = offset;
  let y = offset + props.limit;
  arr = props.notifications.slice(x, y);

  let notificationDisplay;

  if (props.notificationCount === 0) {
    notificationDisplay = (
      <MessageContainer>
        <p>You do not have any pending messages.</p>
      </MessageContainer>
    );
  } else {
    notificationDisplay = (
      <ListStyles>
        {arr.map((notification, index) => {
          return (
            <Notification
              key={index}
              notification={notification}
              filterSent={props.filterSent}
              match={props.match}
            />
          );
        })}
      </ListStyles>
    );
  }
  //console.log("NOTIFICATION COUNT", props.notificationCount)
  return <>{notificationDisplay}</>;
};

export default NotificationsList;
//Styled Components
const ListStyles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 0px;
  margin: 0px;
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: lightgray;
`;
