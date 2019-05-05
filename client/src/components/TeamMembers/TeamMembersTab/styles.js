import styled from "styled-components";
import {
    Paper
} from "@material-ui/core/";

export const TeamsTabWrapper = styled(Paper)`
  margin: 48px auto;
  padding: 10px;
  width: 90%;
`;
export const TeamsMember = styled(Paper)`
  margin: 10px;
  padding: 10px;
  width: 220px;
  &:hover {
    background: #f8f8f8;
  }
`;
export const TeamsTabHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;