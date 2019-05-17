import styled from "styled-components";

export const styles = theme => ({
  paper: {
    position: "absolute",
    maxWidth: "500px",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "40px 20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    "@media (max-width: 768px)": {
      // eslint-disable-line no-useless-computed-key
      width: "81%"
    },
    "@media (max-width: 480px)": {
      // eslint-disable-line no-useless-computed-key
      width: "81%"
    }
  },
  profileContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    padding: 10,
    textAlign: "center",

    "@media (max-width: 1000px)": {
      // eslint-disable-line no-useless-computed-key
      justifyContent: "space-around",
      flexDirection: "row",
      maxWidth: "768px",
      width: "94%",
      marginBottom: 10
    },
    "@media (max-width: 768px)": {
      // eslint-disable-line no-useless-computed-key
      width: "94%"
    },
    "@media (max-width: 480px)": {
      // eslint-disable-line no-useless-computed-key
      flexDirection: "column"
    }
  },
  pricing: {
    width: "70%",
    margin: "0px 0px 0px 10px",
    padding: 10,
    // height: 350,
    "@media (max-width: 1000px)": {
      // eslint-disable-line no-useless-computed-key
      maxWidth: "768px",
      width: "94%",
      margin: 0
    },
    "@media (max-width: 768px)": {
      // eslint-disable-line no-useless-computed-key
      width: "94%"
    }
  },
  cardContent: {
    backgroundColor: "#E8E9EB"
  },
  media: {
    height: 200,
    width: 200
  },
  bigAvatar: {
    margin: "10px auto",
    width: 100,
    height: 100
  },
  divider: {
    width: "70%",
    backgroundColor: "#E7E8EB",
    margin: "5px 0 10px 0"
  },
  bold: {
    fontWeight: 700
  },
  bottomSpace: {
    marginBottom: 30
  }
});
export const Container = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  max-width: 1000px;
  width: 100%;
  height: 480px;
  align-items: stretch;
  @media (max-width: 1000px) {
    flex-direction: column;
    height: 100%;
    align-items: center;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  button {
    margin-bottom: 10px;
  }
`;

export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
