import styled from "styled-components";
export const styles = theme => ({
  root: {
    overflowX: "auto",
    margin: "0 auto",
    fontSize: "1rem",
    "@media (max-width:800px)": {
      display: "none"
    }
  },
  table: {
    minWidth: 400,
    border: "none",
    fontSize: "20px"
  },
  tableRow: {
    fontSize: "18px"
  },
  tableCell: {
    fontSize: "18px"
  },
  noBorder: {
    borderBottom: "none"
  },
  selectButton: {
    color: "white",
    backgroundColor: "#451476",
    margin: "10px auto 0px",
    "&:hover": {
      backgroundColor: "#451476",
      color: "white"
    }
  },
  subCard: {
    border: "1px solid #EBEBEB",
    backgroundColor: "white",
    borderRadiusTopLeft: "3px",
    borderRadiusTopRight: "3px",
    width: "94%",
    minWidth: 201,
    margin: "15px auto",
    padding: 10,
    textAlign: "center",
    "@media (min-width:800px)": {
      display: "none"
    }
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    margin: 10
  },
  price: {
    fontSize: 20,
    margin: "10px 0"
  },
  subPrice: {
    fontSize: 12,
    color: "grey"
  }
});

export const LandingPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  max-width: 1280px;
  background-color: white;
`;
export const NavbarContainer = styled.nav`
  height: 75px;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f4f8;
  padding: 0 25px;
  box-sizing: border-box;
  img {
    width: 50px;
  }
  h2,
  a {
    margin-left: 30px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
  }
  h2 {
    color: #451476;
    border: 1px solid #451476;
    background-color: white;
    padding: 8px;
    border-radius: 7%;
    &:hover {
      background-color: #451476;
      color: white;
    }
  }
  h3 {
    color: #451476;
  }
`;
export const NavbarItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const NavbarItem = styled.a`
  margin-left: 30px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  color: #441476;
  &:visited {
    color: #441476;
  }
`;
export const FirstSection = styled.div`
  background-color: #fafafa;
  width: 95%;
  margin: 40px auto;
  padding: 50px 10px;
  display: flex;
  flex-direction: column;
`;
export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 100px;
  position: sticky;
  top: 100%;
  svg {
    margin: 0 auto;
    font-size: 30px;
    cursor: pointer;
  }
`;
export const FooterItemsContainer = styled.div`
  background-color: #451476;
  display: flex;
  color: white;
  justify-content: center;
  width: 90%;

  a {
    font-size: 16px;
    font-weight: 500;
    padding: 16px 20px;
    cursor: pointer;
    text-decoration: none;
    color: white;
  }

  a:visited {
    color: white;
  }
`;
