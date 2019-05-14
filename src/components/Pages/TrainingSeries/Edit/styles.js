import styled from "styled-components";

export const styles = theme => ({
  paper: {
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      width: "89%",
      // padding: 0,
      margin: "5px auto"
    },

    "@media (max-width: 480px)": {
      width: "80%",
      // padding: 0,
      margin: "5px auto"
    }
  },
  paperTitle: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "16px 32px",
    outline: "none",
    display: "flex",
    margin: "5px auto",
    alignItems: "baseline",
    "@media (max-width: 480px)": {
      width: "89%",
      padding: 0,
      margin: "0 auto"
    }
  },
  divider: {
    margin: "15px 0"
  }
});

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

export const TrainingSeriesTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;
