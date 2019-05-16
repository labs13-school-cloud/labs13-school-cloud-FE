import styled from "styled-components";

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    width: "50%",
    boxSizing: "border-box",
    height: "100%",
    margin: "5px auto"
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  },
  icons: {
    display: "flex",
    alignItems: "center"
  },
  fab: { margin: 5 },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  },
  pagination: { width: "90%" },
  selection: { margin: "0 10px" }
});

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: lightgray;
`;

export const CardWrapper = styled.div`
  min-height: ${props => props.minHeight};
  min-width: ${props => props.minWidth};
  width: 100%;
`;
