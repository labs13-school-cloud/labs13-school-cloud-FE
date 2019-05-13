import styled from "styled-components";

export const styles = theme => ({
  paper: {
    width: "100%",
    margin: "20px auto",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px 30px",
    outline: "none"
  },
  heading: {
    textAlign: "center"
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
    margin: theme.spacing.unit
  },
  memberList: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    margin: "0 auto"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  datePicker: {
    display: "flex",
    justifyContent: "center",
    margin: "30px auto"
  },
  assignButton: {
    alignSelf: "center",
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  }
});

export const AssignMemberContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  width: 100%;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 25px;
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
