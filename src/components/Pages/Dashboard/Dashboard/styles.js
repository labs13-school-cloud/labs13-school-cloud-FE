import styled from "styled-components";

export const styles = {
  circle: {
    background: "red",
    width: 10,
    height: 10,
    borderRadius: "50%",
    position: "relative",
    left: 45,
    bottom: 47
  }
};

export const TripleColumn = styled.div`
  box-sizing: border-box;
  max-width: 1358px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 48px auto;

  @media (max-width: 1400px) {
    flex-wrap: wrap;
    width: 100%;
    padding: 10px;
    max-width: 1000px;
  }
  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
export const SmallColumns = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
  margin-left: 115px;
  

  @media (max-width: 1400px) {
    width: 100%;
    margin-bottom: 50px;
  }
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  @media (min-width: 1400px) {
    div:nth-child(2) {
      margin-right: 10px;
    }
  }
`;
export const DashWrapper = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Popover = styled.div`
  padding: 4px;
  width: 105px;
  font-size: 14px;
  text-align: center;
  background: rgba(0, 0, 0, 0.01);
  color: black;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 2;
  top: 60px;
`;

export const Divider = styled.div`
  margin: 0;
  min-width: 10px;
  max-width: 10px;
  min-height: 1px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileNav = styled.div`
  display: block;
  width: 100vw;
  @media (min-width: 765px) {
    display: none;
  }
`;

export const DesktopNav = styled.div`
  display: block;
  @media (max-width: 764px) {
    display: none;
  }
`;
