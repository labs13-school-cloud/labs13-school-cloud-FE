import styled from "styled-components";

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
