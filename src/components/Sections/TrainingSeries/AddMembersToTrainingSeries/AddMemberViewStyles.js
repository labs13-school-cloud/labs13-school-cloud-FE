export const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 768,
    margin: "20px auto",
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "20px 30px 40px",
    outline: "none",
    "@media (max-width:768px)": {
      width: "95%"
    }
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    position: "sticky",
    top: "100%"
  },
  pagination: { width: "90%" }
});
