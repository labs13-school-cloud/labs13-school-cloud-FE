import styled from "styled-components";

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightgray;
  height: 100%;
  text-align: center;
`;

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    maxWidth: 500,
    minWidth: 330,
    width: "100%",
    minHeight: 533,
    boxSizing: "border-box",
    height: "100%",
    margin: 5,

    "@media (max-width:768px)": {
      width: "95%",
      marginBottom: 10,
      maxWidth: "none",
      height: 533
    }
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  }
});
