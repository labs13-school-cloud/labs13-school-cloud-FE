import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ArrowBack from "@material-ui/icons/ArrowBack";

const ReturnToDashboardButton = () => {
  return (
    <ButtonStyles>
      <Link to="/home">
        <ArrowBack />
      </Link>
    </ButtonStyles>
  );
};

export default ReturnToDashboardButton;

const ButtonStyles = styled.div`
  margin: 12px 0 15px 10px;
  font-size: 14px;
  a {
    text-decoration: none;
    color: #252525;
  }
  &:hover {
    a {
      color: #3fbe93;
    }
  }
`;
