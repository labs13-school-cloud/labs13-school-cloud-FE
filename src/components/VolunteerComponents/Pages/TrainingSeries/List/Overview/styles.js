import styled from "styled-components";

export const styles = {
  listItem: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8E9EB",
    transition: "background-color 0.3s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "whitesmoke"
    }
  },
  title: {
    fontSize: 16
  },
  noMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "9rem",
    color: "grey"
  }
};

export const ListStyles = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 0px;
  margin: 0px;
`;
