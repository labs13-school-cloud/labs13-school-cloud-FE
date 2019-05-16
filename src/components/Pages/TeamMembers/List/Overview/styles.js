import styled from "styled-components";

export const ListStyles = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-left: 0px;
  margin: 0px;
`;

export const styles = {
  listItem: {
    width: "100%",
    marginBottom: 0,
    marginTop: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8E9EB",
    transition: "background-color 0.3s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "whitesmoke"
    }
  }
};
