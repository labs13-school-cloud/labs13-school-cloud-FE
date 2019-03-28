import React, { Component } from "react";

//Styling
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { login } from "./Auth/Auth";

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <LoginContainer>
          <Button onClick={() => login()} color="primary" variant="contained">
            Register
          </Button>
        </LoginContainer>
      </>
    );
  }
}

const LoginContainer = styled.div`
  margin-top: 150px;
`;

export default App;
