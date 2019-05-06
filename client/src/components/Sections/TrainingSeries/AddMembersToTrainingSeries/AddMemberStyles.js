import styled from "styled-components";

import { FormControlLabel } from "@material-ui/core/";

export const AddMemberContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const DirectionsDiv = styled.div`
  margin-bottom: 40px;
`;
export const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 40%;
  padding-left: 12px;

  @media (max-width: 580px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;

export const TeamMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 55%;

  @media (max-width: 580px) {
    padding-top: 35px;
    width: 100%;
  }
`;

export const MemberListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 25px;
  width: 100%;

  @media (max-width: 580px) {
    width: 240px;
    padding: 0 0 20px;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
`;

export const LoadingImage = styled.img`
  width: 40px;
  overflow: hidden;
  pointer-events: none;
  cursor: not-allowed;
`;

export const FormListItem = styled(FormControlLabel)`
  flex-basis: 48%;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

export const styles = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit,
    padding: "5px 16px",
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },
    "&:disabled": {
      color: "grey",
      backgroundColor: "lightgrey"
    }
  },
  cancelButton: {
    margin: theme.spacing.unit,
    padding: "5px 16px"
  },

  memberList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    height: "90%",
    "@media (max-width:580px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  box: {
    padding: "0 12px"
  },
  heading: {
    marginBottom: 40
  }
});
