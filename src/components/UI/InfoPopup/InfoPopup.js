import React, { useState } from "react";

import styled from "styled-components";

export default function InfoPopup(props) {
  const [hoverIconActive, setHoverIconActive] = useState(false);

  return (
    <div>
      <InfoIcon
        style={{
          top: props.top,
          left: props.left
        }}
        onMouseEnter={e => {
          setHoverIconActive(true);
        }}
        onMouseLeave={e => {
          setHoverIconActive(false);
        }}
      >
        i
      </InfoIcon>
      <PopOverModal
        style={hoverIconActive ? { display: "block" } : { display: "none" }}
      >
        {props.popOverText}
      </PopOverModal>
    </div>
  );
}

const InfoIcon = styled.div`
  padding: 2px 8px;
  border-radius: 50%;
  background: rgb(0, 0, 0, 0.38);
  font-size: 12px;
  color: white;
  position: absolute;
  top: 15px;
  left: 20px;
  cursor: pointer;
  &:hover {
    background: #591a99;
  }
`;

const PopOverModal = styled.div`
  width: 80%;
  padding: 10px;
  background: white;
  box-shadow: 0 0 5px (0, 0, 0, 0.2);
  border: 1px solid black;
  position: absolute;
  top: 35px;
  left: 40px;
  z-index: 3;
`;
