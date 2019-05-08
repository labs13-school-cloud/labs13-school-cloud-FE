import styled from "styled-components";

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
    boxSizing: "border-box",
    width: "100%",
    minHeight: "533px",
    height: "100%",
    margin: 5,

    "@media (max-width:768px)": {
      width: "92%",
      marginBottom: 10,
      maxWidth: "none",
      height: "533px"
    }
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icons: {
    display: "flex",
    alignItems: "center"
  },
  fab: {
    margin: 5,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99"
    }
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  },
  textField: {
    width: "100%"
  },
  pagination: { width: "90%" }
});

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: lightgray;
  height: 100%;
  text-align: center;
`;
