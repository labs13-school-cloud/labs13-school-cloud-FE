import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ReturnToDashboardButton = () => {
  return (
    <ButtonStyles>
      <Link to="/home">
        Return to Dashboard<button>X</button>
      </Link>
    </ButtonStyles>
  );
};

export default ReturnToDashboardButton;

const ButtonStyles = styled.div`
  margin: 18px 0 15px 70%;

  &:hover {
    a {
      color: #441476;
    }
    button {
      background: #441476;
      color: white;
    }
  }
  a {
    text-decoration: none;
    color: #252525;
  }
  button {
    margin: 5px;
    padding: 5px 8px;
    border-radius: 50%;
    cursor: pointer;
  }
`;
