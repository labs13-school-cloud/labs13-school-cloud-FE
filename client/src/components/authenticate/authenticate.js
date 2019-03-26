// HOC for client-side authorization, protecting routes that require authentication

import React from "react";

//Styling
import styled from "styled-components";
import Logo from "../../img/training-bot.png";

//Authentication
import { login } from "../../Auth/Auth";

export default function(Component) {
  return class Authenticate extends Component {
    render() {
      const token = localStorage.getItem("id_token");

      const notLoggedIn = (
        <LoginContainer>
          <LoginContent>
            <LogoContainer src={Logo} />
            <p>Please Login to see the users</p>
            <button onClick={e => login()}>Login</button>
          </LoginContent>
        </LoginContainer>
      );
      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}

const LoginContainer = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: white;
  }
`;
const LoginContent = styled.div`
  height: 250px;
  width: 25vw;
  display: flex;
  flex-direction: column;
  background-color: #2699fb;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = styled.img`
  width: 100px;
`;
