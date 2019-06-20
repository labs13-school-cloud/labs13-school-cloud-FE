import styled from "styled-components";

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    height: "100%",
    minHeight: 533,
    minWidth: 330,
    margin: "5px auto",
    marginBottom: "20px",

    "@media (max-width: 768px)": {
      flexDirection: "column",
      width: "95%"
    }
  },
  columnHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,

    "@media (max-width: 400px)": {
      flexDirection: "column"
    }
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
  selection: {
    margin: "0 10px",
    "@media (max-width: 450px)": {
      fontSize: "0.9rem"
    }
  },
  lgTitle: {
    "@media (max-width: 535px)": {
      display: "none"
    }
  },
  smTitle: {
    display: "none",
    "@media (max-width: 535px)": {
      display: "initial"
    },
    "@media (max-width: 450px)": {
      fontSize: "1.2rem"
    }
  }
});

export const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: lightgray;
`;

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  /* https://bit.ly/2ElzpZl */
  height: 0.4242px;
  max-width: ${props => props.width || "none"};
  width: 100%;
  @media (max-width: 1400px) {
    
  margin: auto;
  }
`;
