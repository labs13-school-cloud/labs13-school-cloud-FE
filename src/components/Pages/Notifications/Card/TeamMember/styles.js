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
    marginBottom: 10,
    marginTop: 4,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #E8E9EB",
    paddingRight: 10,
    paddingLeft: 0,
    overflow: "hidden"
  },
  title: {
    fontSize: 16
  },
  sendDate: {
    backgroundColor: "white",
    fontSize: 13,
    textAlign: "right",
    position: "absolute",
    right: 10,
    width: 65
  },
  icon: {
    height: "100%",
    width: "50px",
    margin: "0px -13px"
  },
  item: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    padding: 0,
    paddingLeft: 16
  }
};
