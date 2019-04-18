// contains all components for landing page
import React from "react";
import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";

import {scroller, animateScroll as scroll} from "react-scroll";

//Styling
import styled from "styled-components";
import {ArrowUpward} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core/";

import Logo from "../../img/training-bot.png";
//Auth
import {login} from "../../Auth/Auth";

const styles = theme => ({
  root: {
    // width: '75%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
    margin: "0 auto",
    fontSize: "1rem",
    "@media (max-width:800px)": {
      display: "none",
    },
  },
  table: {
    minWidth: 400,
    border: "none",
    fontSize: "20px",
  },
  tableRow: {
    fontSize: "18px",
  },
  tableCell: {
    fontSize: "18px",
  },
  noBorder: {
    borderBottom: "none",
  },
  selectButton: {
    color: "white",
    backgroundColor: "#451476",
    margin: "10px auto 0px",
    "&:hover": {
      backgroundColor: "#451476",
      color: "white",
    },
  },
  subCard: {
    border: "1px solid #EBEBEB",
    backgroundColor: "white",
    borderRadiusTopLeft: "3px",
    borderRadiusTopRight: "3px",
    width: "94%",
    minWidth: 201,
    margin: "15px auto",
    padding: 10,
    textAlign: "center",
    "@media (min-width:800px)": {
      display: "none",
    },
  },
  title: {
    textTransform: "uppercase",
    fontWeight: 700,
    margin: 10,
  },
  price: {
    fontSize: 20,
    margin: "10px 0",
  },
  subPrice: {
    fontSize: 12,
    color: "grey",
  },
});

let id = 0;
function createData(name, basic, premium, pro) {
  id += 1;
  return {id, name, basic, premium, pro};
}

const rows = [
  createData(
    "Automated Text/Email",
    <span>&#10004;</span>,
    <span>&#10004;</span>,
    <span>&#10004;</span>
  ),
  createData(
    "Unlimited Training Series",
    <span>&#10004;</span>,
    <span>&#10004;</span>,
    <span>&#10004;</span>
  ),
  createData(
    "Unlimited Team Members",
    <span>&#10004;</span>,
    <span>&#10004;</span>,
    <span>&#10004;</span>
  ),
  createData("Message Limit", "50/mo", "200/mo", "1000/mo"),
];
class Pricing extends React.Component {
  scrollToTop() {
    scroll.scrollToTop();
  }
  render() {
    const {classes} = this.props;
    return (
      <LandingPageContainer>
        {/* NAVIGATION */}
        <NavbarContainer>
          <Link to="/">
            <img src={Logo} alt="A cute, personable robot" />
          </Link>
          <NavbarItemsContainer>
            <NavbarItem to="/team">Team</NavbarItem>
            <NavbarItem to="/pricing">Pricing</NavbarItem>
            <h2 onClick={login}>Sign In</h2>
          </NavbarItemsContainer>
        </NavbarContainer>
        {/* JUMBOTRON STYLED SECTION */}
        <FirstSection>
          <Typography variant="h3" style={{paddingLeft: "10%"}}>
            Pricing
          </Typography>
          <div className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow className={classes.tableRow}>
                  <TableCell />
                  <TableCell className={classes.tableCell} align="center">
                    Basic
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    Premium
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    Pro
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow key={row.id}>
                    <TableCell
                      className={classes.tableCell}
                      component="th"
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {row.basic}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {row.premium}
                    </TableCell>
                    <TableCell className={classes.tableCell} align="center">
                      {row.pro}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className={classes.noBorder} align="center" />
                  <TableCell className={classes.noBorder} align="center">
                    <Button
                      variant="container"
                      className={classes.selectButton}
                      onClick={login}
                    >
                      Sign Up
                    </Button>
                  </TableCell>
                  <TableCell className={classes.noBorder} align="center">
                    <Button
                      variant="container"
                      className={classes.selectButton}
                      onClick={login}
                    >
                      Sign Up
                    </Button>
                  </TableCell>
                  <TableCell className={classes.noBorder} align="center">
                    <Button
                      variant="container"
                      className={classes.selectButton}
                      onClick={login}
                    >
                      Sign Up
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className={classes.subCard}>
            <Typography className={classes.title}>Basic</Typography>
            <Typography className={classes.price}>FREE</Typography>
            <div className={classes.content}>
              <Typography className={classes.feature}>
                Automated Text/Email
              </Typography>
              <Typography className={classes.feature}>
                Unlimited Training Series
              </Typography>
              <Typography className={classes.feature}>
                Unlimited Team Members
              </Typography>
              <div className={classes.spread}>
                <Typography className={classes.feature}>
                  Message Limit
                </Typography>
                <Typography className={classes.feature}>50 / mo</Typography>
              </div>
            </div>
            <Button
              variant="container"
              className={classes.selectButton}
              onClick={login}
            >
              Sign Up
            </Button>{" "}
          </div>
          <div className={classes.subCard}>
            <Typography className={classes.title}>Premium</Typography>
            <Typography className={classes.price}>
              $5
              <span className={classes.subPrice}> / mo</span>
            </Typography>{" "}
            <div className={classes.content}>
              <Typography className={classes.feature}>
                Automated Text/Email
              </Typography>
              <Typography className={classes.feature}>
                Unlimited Training Series
              </Typography>
              <Typography className={classes.feature}>
                Unlimited Team Members
              </Typography>
              <div className={classes.spread}>
                <Typography className={classes.feature}>
                  Message Limit
                </Typography>
                <Typography className={classes.feature}>200 / mo</Typography>
              </div>
            </div>
            <Button
              variant="container"
              className={classes.selectButton}
              onClick={login}
            >
              Sign Up
            </Button>{" "}
          </div>
          <div className={classes.subCard}>
            <Typography className={classes.title}>Pro</Typography>
            <Typography className={classes.price}>
              $10
              <span className={classes.subPrice}> / mo</span>
            </Typography>{" "}
            <div className={classes.content}>
              <Typography className={classes.feature}>
                Automated Text/Email
              </Typography>
              <Typography className={classes.feature}>
                Unlimited Training Series
              </Typography>
              <Typography className={classes.feature}>
                Unlimited Team Members
              </Typography>
              <div className={classes.spread}>
                <Typography className={classes.feature}>
                  Message Limit
                </Typography>
                <Typography className={classes.feature}>1000 / mo</Typography>
              </div>
            </div>
            <Button
              variant="container"
              className={classes.selectButton}
              onClick={login}
            >
              Sign Up
            </Button>{" "}
          </div>
        </FirstSection>
        <FooterContainer>
          <FooterItemsContainer>
            <Link to="/team">Team</Link>
            <Link to="/pricing">Pricing</Link>
          </FooterItemsContainer>
          <ArrowUpward onClick={() => this.scrollToTop()} />
        </FooterContainer>
      </LandingPageContainer>
    );
  }
}
export default withStyles(styles)(Pricing);

const LandingPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100vh;
  max-width: 1280px;
  background-color: white;
`;

const NavbarContainer = styled.nav`
  height: 75px;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f4f8;
  padding: 0 25px;
  box-sizing: border-box;
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
    padding: 8px;
    border-radius: 7%;
    &:hover {
      background-color: #451476;
      color: white;
    }
  }
  h3 {
    color: #451476;
  }
`;

const NavbarItemsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarItem = styled(Link)`
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

const FirstSection = styled.div`
  background-color: #fafafa;
  width: 95%;
  margin: 40px auto;
  padding: 50px 10px;
  display: flex;
  flex-direction: column;
`;

const FooterContainer = styled.div`
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

const FooterItemsContainer = styled.div`
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
