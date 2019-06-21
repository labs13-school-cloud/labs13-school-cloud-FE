import React from "react";
import { ArrowUpward } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";

import Logo from "img/cloud.png";
import Brandon from "img/Brandon.jpg";
import Steph from "img/Steph.jpg";
import Abdul from "img/Abdul.png";
import Adam from "img/Adam.png";
import Josi from "img/Josi.png";

import { animateScroll as scroll } from "react-scroll";

//Auth
import { lock } from "Auth/Auth";

import {
  styles,
  LandingPageContainer,
  NavbarContainer,
  NavbarItemsContainer,
  NavbarItem,
  TeamContainer,
  TeamInfoContainer,
  TeamMember,
  TeamMemberLinks,
  ContactContainer,
  FooterContainer,
  FooterItemsContainer,
  PortfolioLink,
  AdamsIMG
} from "./styles.js";

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
              <img 
              style={{ height: "45px", width: "50px" }}
              src={Logo} 
              alt="Owl with Grad Cap in a Cloud" />
            </Link>
            <NavbarItemsContainer>
              <NavbarItem href="/team">Team</NavbarItem>
              <NavbarItem href="/pricing">Pricing</NavbarItem>
              <h2 onClick={() => lock.login()}>Sign In</h2>
            </NavbarItemsContainer>
          </NavbarContainer>
          <TeamContainer>
            <Typography variant="h3">The Team</Typography>
            <TeamInfoContainer>
              <TeamMember>
                <img src={Abdul} alt="Abdul A. Ahmad" />
                <Typography variant="title">Abdul A. Ahmad</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/nickcannariato"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/nickcannariato"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/nickcannariato/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={Steph} alt="Stephanie Patton" />
                <Typography variant="title">Stephanie Patton</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://gannon.dev"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/GannonDetroit"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/gannon-darcy-b8345073/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={Brandon} alt="Brandon Vilaychith" />
                <Typography variant="title">Brandon Vilaychith</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://ajbrush.com/"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/ajb85"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/andrew-brush-58205b122/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <img src={Josi} alt="Josefia Magagnoli" />
                <Typography variant="title">Josefia Magagnoli</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/josefiaaa"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/josefiaaa"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/josefia-magagnoli-a02067184/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
              <TeamMember>
                <AdamsIMG src={Adam} alt="Adam McKenney" />
                <Typography variant="title">Adam McKenney</Typography>
                <p>Full-Stack Developer</p>
                <PortfolioLink
                  target="_blank"
                  href="https://github.com/DaftBeowulf"
                >
                  Portfolio Site
                </PortfolioLink>

                <TeamMemberLinks>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/DaftBeowulf"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faGithubSquare} />
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/adam-mckenney-04827a35/"
                  >
                    <FontAwesomeIcon className="fa-2x" icon={faLinkedin} />
                  </a>
                </TeamMemberLinks>
              </TeamMember>
            </TeamInfoContainer>
          </TeamContainer>
          <ContactContainer>
            <Typography variant="h3">Contact Us</Typography>
            <form
              action="/success"
              className={classes.form}
              name="contact"
              method="POST"
            >
              <input type="hidden" name="form-name" value="contact" />
              <TextField
                label="Name"
                className={classes.textField}
                margin="normal"
                name="contact-name"
                required
              />
              <TextField
                label="Email"
                className={classes.textField}
                margin="normal"
                name="contact-email"
                required
              />
              <TextField
                label="Message"
                className={classes.textField}
                margin="normal"
                name="contact-message"
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
              <a href="/team">Team</a>
              <a href="/pricing">Pricing</a>
            </FooterItemsContainer>
            <ArrowUpward onClick={() => this.scrollToTop()} />
          </FooterContainer>
        </LandingPageContainer>
      </>
    );
  }
}

export default withStyles(styles)(Team);
