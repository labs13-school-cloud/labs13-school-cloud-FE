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
    maxWidth: "500px",
    width: "100%",
    minHeight: "533px",
    boxSizing: "border-box",
    height: "100%",
    margin: 5,

    "@media (max-width:768px)": {
      width: "92%",
      marginBottom: 10,
      maxWidth: "none",
      height: "533px"
    }
  },
  textField: {
    width: "100%"
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
  formControl: {
    margin: theme.spacing.unit
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  }
  // pagination: { width: '90%' },
});
