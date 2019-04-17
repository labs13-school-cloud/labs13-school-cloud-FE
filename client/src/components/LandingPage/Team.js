import React from "react";
import styled from "styled-components";
import { ArrowUpward } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import Logo from "../../img/training-bot.png";
import Alex from "../../img/tb-aking.jpeg";
import Brandon from "../../img/tb-blent.jpeg";
import LeighAnn from "../../img/tb-lfriedel.jpeg";
import Mike from "../../img/tb-mlanders.jpeg";
import Nate from "../../img/tb-nboyette.jpeg";

import { scroller, animateScroll as scroll } from "react-scroll";

//Auth
import { login } from "../../Auth/Auth";

const styles = theme => ({
  form: {
    width: "75%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
    margin: "15px auto"
  },
  button: {
    background: "#451476",
    color: "white",
    margin: "0 auto",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  }
});

class Team extends React.Component {
  scrollToTop() {
    scroll.scrollToTop();
  }

  render() {
    const { classes } = this.props;
    return (
      <>
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
          <TeamContainer>
            <h3>The Team</h3>
            <TeamInfoContainer>
              <TeamMember>
                <img src={Alex} alt="Alex King" />
                <Typography variant="title">Alex King</Typography>
                <p>Full-Stack Developer</p>
                <TeamMemberLinks>
                  <a href="https://github.com/Alex-AK">
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/alex-ak/">
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={Brandon} alt="Brandon Lent" />
                <Typography variant="title">Brandon Lent</Typography>
                <p>Full-Stack Developer</p>
                <TeamMemberLinks>
                  <a href="https://github.com/Blent1050">
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/brandon-lent/">
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={LeighAnn} alt="Leigh-Ann Friedel" />
                <Typography variant="title">Leigh-Ann Friedel</Typography>
                <p>Full-Stack Developer</p>
                <TeamMemberLinks>
                  <a href="https://github.com/lafriedel">
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/leigh-ann-friedel/">
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={Mike} alt="Mike Landers" />
                <Typography variant="title">Mike Landers</Typography>
                <p>Full-Stack Developer</p>
                <TeamMemberLinks>
                  <a href="https://github.com/mlanders">
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/mikelanders/">
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={Nate} alt="Nate Boyette" />
                <Typography variant="title">Nate Boyette</Typography>
                <p>Full-Stack Developer</p>
                <TeamMemberLinks>
                  <a href="https://github.com/nateboyette">
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a href="https://www.linkedin.com/in/nateboyette/">
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
            </TeamInfoContainer>
          </TeamContainer>
          <ContactContainer>
            <h3>Contact Us</h3>
            <form
              className={classes.form}
              name="contact"
              method="POST"
              data-netlify="true"
            >
              <TextField
                label="Name"
                className={classes.textField}
                margin="normal"
                required
              />
              <TextField
                label="Email"
                className={classes.textField}
                margin="normal"
                required
              />
              <TextField
                label="Message"
                className={classes.textField}
                margin="normal"
                multiline
                rows="8"
                placeholder="Type your message here"
                variant="outlined"
                required
              />
              <Button
                className={classes.button}
                type="submit"
                variant="outlined"
              >
                Send
              </Button>
            </form>
          </ContactContainer>
          <FooterContainer>
            <FooterItemsContainer>
              <Link to="/team">Team</Link>
              <Link to="/pricing">Pricing</Link>
            </FooterItemsContainer>
            <ArrowUpward onClick={() => this.scrollToTop()} />
          </FooterContainer>
        </LandingPageContainer>
      </>
    );
  }
}

export default withStyles(styles)(Team);

const LandingPageContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  background-color: white;
  box-sizing: border-box;
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
  h2 {
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
`;

const TeamContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  margin: 40px auto;
  background-color: #fafafa;
  padding: 30px 20px;
  box-sizing: border-box;
  h3 {
    color: #451476;
    font-size: 32px;
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const TeamInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const TeamMember = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 32%;
  margin-top: 40px;
  img {
    max-width: 200px;
    width: 100%;
    max-height: 200px;
    height: 100%;
    border-radius: 5px;
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    flex-basis: 49%;
  }

  @media (max-width: 580px) {
    flex-basis: 100%;
  }
`;

const TeamMemberLinks = styled.div`
  display: flex;
  justify-content: space-evenly;

  a,
  a:visited {
    color: #451476;
    margin: 0 7px;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  margin: 40px auto;
  background-color: #fafafa;
  padding: 30px 20px;
  box-sizing: border-box;
  h3 {
    color: #451476;
    font-size: 32px;
    text-align: center;
    margin: 0;
    margin-bottom: 5px;
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 100px;
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
  }

  a:visited {
    color: white;
  }
`;
