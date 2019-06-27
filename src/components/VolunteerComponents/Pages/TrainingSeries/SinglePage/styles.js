import styled from "styled-components";
import { Paper } from "@material-ui/core/";

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
      margin: "5px auto"
    },

    "@media (max-width: 480px)": {
      width: "80%",
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
  },
  info: {
    fontSize: "1rem",
    paddingBottom: "5px",
    fontWeight: "bold",
    marginBottom: "10px"
  },
  links: {
    "&:hover": {
      color: "#2699FB",
      cursor: "pointer",
      textDecoration: "none"
    }
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

export const Wrapper = styled(Paper)`
  width: 90%;
  padding: 10px;
  margin: 10px auto;
  max-width: 1200px;
`;
