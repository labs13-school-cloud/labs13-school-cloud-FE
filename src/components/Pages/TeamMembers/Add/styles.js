import styled from "styled-components";

export const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30
  },
  paper: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",
    maxWidth: 768,
    minWidth: 330,
    boxSizing: "border-box"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto"
  },
  info: {
    marginRight: 50
  },
  textFieldMain: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 200,

    "@media (max-width: 590px)": {
      width: "100%",
      margin: "16px auto 0"
    }
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    marginLeft: theme.spacing.unit
  },
  addButton: {
    marginLeft: theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  },
  divider: {
    margin: "15px 0"
  },
  color: {
    color: "red"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,

    "@media (max-width: 590px)": {
      width: "100%",
      margin: "16px auto 0"
    }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  @media (max-width: 768px) {
    width: 90%;
    margin: auto;
  }
`;

export const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;
  margin: 20px auto;
  @media (max-width: 590px) {
    flex-direction: column;
    justify-content: center;
    width: 90%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

export const LoadingImage = styled.img`
  width: 32px;
  height: auto;
  overflow: hidden;
  cursor: not-allowed;
  pointer-events: none;
  position: relative;
  padding: 0;
  margin: 0;
`;
