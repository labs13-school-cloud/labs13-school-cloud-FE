import styled from "styled-components";
import { Paper } from "@material-ui/core";

export const styles = theme => ({
  radioGroup: {
    display: "flex",
    flexDirection: "row",

    "@media(max-width:400px)": {
      flexDirection: "column"
    }
  },
  radioItem: {
    margin: "0 10px",

    "@media(max-width:550px)": {
      margin: "10px"
    },
    "@media(max-width:400px)": {
      margin: "0 10px"
    }
  },
  headerText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,

    "@media(max-width:550px)": {
      flexDirection: "column"
    }
  },
  footer: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",

    "@media(max-width:550px)": {
      flexDirection: "column",
      alignItems: "center"
    }
  }
});

export const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f4f8;
  margin-bottom: 5px;

  p {
    margin: 0;
  }

  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: center;
    padding-right: 15px;
  }
`;

export const Wrapper = styled(Paper)`
  margin: auto;
  padding: 10px;
  width: 80%;
  max-width: 1000px;
  min-width: 220px;

  h5 {
    @media (max-width: 550px) {
      width: 90%;
      text-align: center;
      margin: auto;
    }
  }
`;

export const CheckboxWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  div.checkboxes {
    display: flex;

    @media (max-width: 500px) {
      flex-direction: column;
    }
  }

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: center;
  }
`;
