import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    max-width: 768px;
    height: 100%;
    flex-direction: column;
  }
`;
