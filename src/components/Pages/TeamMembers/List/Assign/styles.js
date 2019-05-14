import styled from "styled-components";

export const styles = theme => ({
  listStyle: {
    display: "flex",

    padding: "5px"
  },
  listItem: {
    // display: "flex",
    // flexDirections: "column",
    // width: "90%"
    width: "79%",
    height: 95,
    display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",

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
`;
