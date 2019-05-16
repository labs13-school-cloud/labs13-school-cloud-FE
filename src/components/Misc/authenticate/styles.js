import styled from "styled-components";
import Button from "@material-ui/core/Button";

export const LoginContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: black;
  }
`;
export const LoginContent = styled.div`
  height: 250px;
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  h3 {
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
`;
export const LogoImage = styled.img`
  width: 100px;
`;
export const StyledButton = styled(Button)`
  background-color: #451476;
  margin: 5px;

  &:hover {
    background: #451476;
    color: #451476;
  }
`;
export const StyledLink = styled.a`
  text-decoration: none;
  color: #451476;
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 160px;
  justify-content: space-between;
`;
