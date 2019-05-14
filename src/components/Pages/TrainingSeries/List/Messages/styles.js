import styled from "styled-components";

export const styles = theme => ({
  secondaryAction: {
    display: "flex",
    flexDirection: "row",
    "align-items": "center"
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
  textField: {
    width: "60%"
  }
});

export const ListItemContainer = styled.div`
  transition: background-color 0.3s;
  &:hover {
    width: 100%;
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
export const ListButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 40px;
  padding-right: 5px;
`;
