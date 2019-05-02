import styled from "styled-components";

export const TripleColumn = styled.div`
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  margin: 48px auto;
  /* height: 500px; */
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
    /* margin-bottom: 5px; */
  }
`;
export const DashboardContainer = styled.div`
  display: flex;
  /* background-color: #fafafa; */

  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
    padding: 10px;
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