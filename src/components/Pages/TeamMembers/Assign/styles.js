import styled from "styled-components";

export const styles = theme => ({
  paper: {
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      width: "89%",
      margin: "5px auto"
    },

    "@media (max-width: 480px)": {
      width: "80%",
      margin: "5px auto"
    }
  },
  assignButton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },
    "@media (max-width: 768px)": {
      margin: "10px 5px"
    },

    "&:disabled": {
      background: "white"
    }
  },
  messageText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "lightgray"
  },
  messageTextTop: {
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "lightgray"
  }
});

export const HeaderContainer = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
    padding: 10px 0;
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }
`;

export const HolderText = styled.div`
  margin: 50px 0;
  p {
    color: lightgray;
    text-align: center;
  }
`;
