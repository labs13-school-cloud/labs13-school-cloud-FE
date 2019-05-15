import styled from "styled-components";

export const styles = theme => ({
  listStyle: {
    margin: 0
  },
  button: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "@media (max-width: 768px)": {
      margin: "10px 5px"
    }
  },
  textField: {
    width: "60%"
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
export const ListStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-around;
  width: 100%;
  margin: 20px auto;
  list-style: none;
`;
