import styled from "styled-components";

import { Paper } from "@material-ui/core/";

export const styles = () => ({
  messages: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    padding: 0,

    "@media (max-width:740px)": {
      justifyContent: "center"
    }
  },
  msgText: {
    margin: "0 10px 0 0 ",
    padding: 0
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 15
  },
  selection: {
    width: "20%",
    display: "flex",
    marginLeft: "60%",
    "@media (max-width: 450px)": {
      marginLeft: "70%"
    }
  }
});

export const Wrapper = styled(Paper)`
  width: 90%;
  padding: 10px;
  margin: 10px auto;
  max-width: 1200px;
  &:hover {
    background: #f8f8f8;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Redirect = styled.a`
  color: "inherit";
  &:hover {
    text-decoration: "none";
    color: #4169e0;
    cursor: pointer;
  }
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
