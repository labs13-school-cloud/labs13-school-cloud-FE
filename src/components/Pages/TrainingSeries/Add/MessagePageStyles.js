import styled from "styled-components";

export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%",
    margin: "20px auto"
  },
  form: {
    margin: "0 auto"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    width: "100%",
    margin: "15px auto"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit
  },
  saveButton: {
    "margin-left": theme.spacing.unit,
    color: "white",
    background: "#451476",
    "&:hover": {
      background: "#501f84",
      color: "white"
    }
  }
});

export const MainContainer = styled.div`
  margin: 0 auto;
  width: 60%;
  min-width:470px;
  max-width: 700px;
`;

export const MessageContainer = styled.div`
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

export const CheckBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;