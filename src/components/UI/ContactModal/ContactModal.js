import React from "react";
import styled from "styled-components";
import { Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { styles, ContactContainer } from "../../Pages/LandingPage/Team/styles";

const ContactModal = props => {
  const { classes } = props;
  return (
    <ContactModalWrapper
      style={{ cursor: "pointer" }}
      onClick={e => {
        e.preventDefault();
        props.history.push("/home");
      }}
    >
      <ContactModalPaper
        style={{ cursor: "auto" }}
        onClick={e => e.stopPropagation()}
      >
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
            <Button className={classes.button} type="submit" variant="outlined">
              Send
            </Button>
          </form>
        </ContactContainer>
      </ContactModalPaper>
    </ContactModalWrapper>
  );
};

export default withStyles(styles)(ContactModal);

const ContactModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
`;

const ContactModalPaper = styled(Paper)`
  width: 90%;
  max-width: 1400px;
  margin: 10vh auto;
  height: 70vh;
  overflow-y: scroll;
  padding: 20px;
  h3 {
    text-align: center;
    font-size: 35px;
    margin: 0;
  }
`;
