import styled from "styled-components";
export const styles = theme => ({
  form: {
    width: "75%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    margin: "15px auto"
  },
  button: {
    background: "#451476",
    color: "white",
    margin: "0 auto",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  }
});
export const LandingPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  background-color: white;
  box-sizing: border-box;
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
  h2 {
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
export const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  margin: 40px auto;
  background-color: #fafafa;
  padding: 30px 20px;
  box-sizing: border-box;
  h3 {
    color: #451476;
    font-size: 32px;
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const TeamInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
export const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 32%;
  margin-top: 40px;
  img {
    max-width: 200px;
    width: 100%;
    max-height: 200px;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    flex-basis: 49%;
  }

  @media (max-width: 580px) {
    flex-basis: 100%;
  }
`;
export const TeamMemberLinks = styled.div`
  display: flex;
  justify-content: space-evenly;

  a,
  a:visited {
    color: #451476;
    margin: 0 7px;
  }
`;
export const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  margin: 40px auto;
  background-color: #fafafa;
  padding: 30px 20px;
  box-sizing: border-box;
  h3 {
    color: #451476;
    font-size: 32px;
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
export const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 100px;
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
export const PortfolioLink = styled.a`
  text-decoration: none;
  padding-bottom: 3%;
  color: black;
`;
export const AdamsIMG = styled.img`
  object-fit: cover;
`;
