import React from "react";
import logo from "img/training-bot.svg";
import "./loading.css";
import styled from "styled-components";

function ProgressCircle(props) {
  return (
    <LogoImage
      src={logo}
      alt="loading"
      style={{ width: props.width }}
      className="ld ld-bounce"
    />
  );
}

export default ProgressCircle;

const LogoImage = styled.img`
  width: 100px;
  position: absolute;
  right: 45.8%;
  top: 52.5%;
`;
