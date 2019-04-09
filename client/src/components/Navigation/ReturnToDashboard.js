import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ReturnToDashboardButton = () => {
  return (
    <ButtonStyles>
      <Link to="/home">Return to Dashboard</Link>
    </ButtonStyles>
  );
};

export default ReturnToDashboardButton;

const ButtonStyles = styled.div`
  margin: 10px 0 10px 7%;
  a {
    text-decoration: none;
    color: #252525;
    &:hover {
      color: #441476;
    }
  }
`;
