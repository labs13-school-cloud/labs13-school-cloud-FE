import styled from "styled-components";

export const TripleColumn = styled.div`
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  margin: 48px auto;
  @media (max-width: 1400px) {
    flex-wrap: wrap;
    max-width: 1000px;
    padding: 10px;
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
  width: 800px;
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
