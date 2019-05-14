import styled from "styled-components";

export const styles = theme => ({
  secondaryAction: {
    display: "flex",
    flexDirection: "row",
    "align-items": "center"
  },
  listStyle: {
    margin: 0
  },
  listItem: {
    width: "79%",
    height: 80,
    marginBottom: 10,
    paddingBottom: 10,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    wrap: "flex-wrap"
  },
  icons: {
    display: "block",
    width: 20,
    marginBottom: 10,
    color: "gray",
    cursor: "pointer",
    "&:hover": { color: "#2699FB" }
  },
  button: {
    // margin: 5,
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
export const ListItemContainer = styled.div`
  transition: background-color 0.3s;
  &:hover {
    width: 100%;
    cursor: pointer;
    background-color: whitesmoke;
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
export const ListButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 40px;
  padding-right: 5px;
`;
