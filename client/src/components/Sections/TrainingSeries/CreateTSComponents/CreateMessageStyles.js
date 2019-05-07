import styled from "styled-components";

export const styles = theme => ({
  root: {
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxSizing: "border-box",
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      textAlign: "center",
      padding: "30px"
    }
  },
  form: {
    width: "100%",
    margin: "0 auto"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    margin: "15px auto"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit
  },
  createButton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  }
});

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;
export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: baseline;
`;
export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;
