import styled from "styled-components";

export const styles = theme => ({
  listStyle: {
    display: "flex",
    padding: "5px"
  },
  listItem: {
    width: "100%",
    height: 95,
    display: "flex",

    "@media (max-width: 768px)": {
      width: "100%",
      margin: "0 auto",
      textAlign: "center"
    }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  margin: {
    margin: theme.spacing.unit
  }
});

export const ListStyles = styled.div`
  display: flex;
  transition: background-color 0.3s;
  &:hover {
    width: 100%;
    cursor: pointer;
    background-color: whitesmoke;
  }
  border-bottom: 1px solid #e1e1e1;
`;

export const ListButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-left: 40px;
  padding-right: 5px;
`;
