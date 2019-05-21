import React from "react";
import styled from "styled-components";
import ArrowBack from "@material-ui/icons/ArrowBack";

const ReturnToPreviousPageButton = ({ history }) => {
  return (
    <ButtonStyles>
      <ArrowBack onClick={() => history.goBack()} />
    </ButtonStyles>
  );
};

export default ReturnToPreviousPageButton;

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
