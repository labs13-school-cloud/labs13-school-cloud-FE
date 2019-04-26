import styled from "styled-components";

export const LandingPageContainer = styled.div`
  margin: 0 auto;

  width: 100%;
  max-width: 1280px;
  background-color: white;
  @media (max-width: 700px) {
    padding: 0;
  }
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

  @media (max-width: 700px) {
    padding: 0 5px;
  }

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
    padding: 4px 10px;
    border-radius: 7%;
    &:hover {
      background-color: #451476;
      color: white;
    }

    @media (max-width: 700px) {
      width: 75px;
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
  margin: 40px auto 20px;
  padding: 75px 10px;
  display: flex;
  border-radius: 5px;
  h3 {
    width: 100%;
  }
  @media (max-width: 700px) {
    width: 100%;
    margin: 0;
  }
  p {
    text-align: center;
  }
`;
export const MarketingContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto 100px;
  padding: 0px 30px;
`;
export const MarketingSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 40px 0;

  &:nth-child(even) {
    flex-direction: row-reverse;
  }
  img {
    width: 100%;
  }

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: center;
    &:nth-child(even) {
      flex-direction: column;
    }
  }
`;
export const MarketingImage = styled.div`
  width: 40%;
  @media (max-width: 700px) {
    width: 80%;
    margin: 0 auto;
  }
`;
export const MarketingContent = styled.div`
  width: 50%;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    width: 100%;
    font-size: 32px;
    color: #451476;
    margin-bottom: 0;
    text-align: left;
  }
  p {
    font-size: 20px;
  }

  @media (max-width: 700px) {
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    padding: 0;
  }
`;
export const LandingPageContentContainer = styled.div`
  width: 50%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 80px;
  h1 {
    margin-top: 0;
    color: #451476;
    font-size: 42px;
  }

  @media (max-width: 1000px) {
    width: 100%;
    padding: 0;
    text-align: center;
    p {
      padding: 0 50px;
    }
  }
`;
export const LandingPageButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  button:first-child {
    margin: 0 10px;
    background-color: #451476;
    color: white;
    padding: 0 16px;
  }
  button:nth-child(2) {
    border: 1px solid #451476;
    color: #451476;

    &:hover {
      background-color: #451476;
      color: white;
    }
  }
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
export const GetStartedButton = styled.div`
  button {
    margin: 10px 10px 0;
    background-color: #451476;
    color: white;
    &:hover {
      /* margin: 0 15px; */
      background-color: #451476;
      color: white;
    }
  }
`;
export const LogoImage = styled.img`
  width: 50px;
`;
