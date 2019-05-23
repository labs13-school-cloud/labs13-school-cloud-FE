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
    maxWidth: 200,
    overflow: "hidden",

    "@media (max-width: 590px)": {
      width: "100%",
      maxWidth: "none",
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
  Editbutton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },
    "&:disabled": {
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      color: "rgba(0, 0, 0, 0.26)",
      border: "none"
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
    maxWidth: 200,
    overflow: "hidden",

    "@media (max-width: 590px)": {
      width: "100%",
      maxWidth: "none",
      margin: "16px auto 0"
    }
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

export const MainContainer = styled.div`
  margin: 0 auto;
  max-width: ${props => props.maxWidth || "768px"};
  max-height: ${props => props.maxHeight || "none"};
  @media (max-width: 768px) {
    width: 95%;
    margin: auto;
  }
`;

export const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  margin: 20px auto;
  @media (max-width: 590px) {
    flex-direction: column;
    justify-content: center;
    width: 95%;
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

export const SlackButton = styled.button`
  margin: 8px;
  overflow: hidden;
  min-width: 200px;
  max-width: 200px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  padding: 0 0 7px;
  position: relative;
  top: 4px;
  border: 0px;
  line-height: 1;
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  cursor: pointer;
  flex-direction: column;
  justify-content: flex-end;
  transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  p {
    color: rgba(0, 0, 0, 0.54);
    font-size: 1rem;
    margin: 0;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
  p:nth-child(2) {
    display: none;
  }
  &:hover {
    border-radius: 4px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.87);

    p:nth-child(1) {
      display: none;
    }
    p:nth-child(2) {
      display: initial;
    }
  }
  @media (max-width: 590px) {
      width: 100%;
      max-width: none;
      margin: 16px auto 0;
    }    
  }
`;
