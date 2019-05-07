import styled from "styled-components";

import { Paper } from "@material-ui/core/";

export const Wrapper = styled(Paper)`
  width: 90%;
  padding: 10px;
  margin: 48px auto;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Series = styled(Paper)`
  width: 70%;
  margin: 10px auto;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
`;

export const Select = styled.select`
  width: 125px;
  height: 35px;
  border: 1px solid #441576;
`;
