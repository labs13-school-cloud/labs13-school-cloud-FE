import styled from "styled-components";

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    minWidth: 330,
    width: "100%",
    minHeight: 533,
    // The "Deal with It" pixel - snaps height out of auto so height:100% can take effect
    height: "100%",
    boxSizing: "border-box",
    margin: "5px auto",

    "@media (max-width:768px)": {
      width: "95%",
      marginBottom: 10,
      maxWidth: "none"
    }
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  }
});

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightgray;
  height: 100%;
  text-align: center;
  margin-top: 152px;
`;
