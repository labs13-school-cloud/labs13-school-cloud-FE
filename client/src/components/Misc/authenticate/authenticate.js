// HOC for client-side authorization, protecting routes that require authentication
import React from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import logo from '../../img/training-bot.svg';
import '../Progress/loading.css';
import Button from '@material-ui/core/Button';


//Styling
import styled from "styled-components";
import Logo from "../../img/training-bot.png";

//Authentication
import {login} from "../../Auth/Auth";

//axios defaults and interceptors.
axios.defaults.baseURL = `${process.env.REACT_APP_API}`;
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("id_token");
    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticate extends Component {
    render() {
      const token = localStorage.getItem("id_token");

      const notLoggedIn = (
        <>
					{/* NAVIGATION */}
					<NavbarContainer>
						<Link to='/'>
							<img src={Logo} alt='A cute, personable robot' />
						</Link>
						<NavbarItemsContainer>
							<NavbarItem>Team</NavbarItem>
							<NavbarItem to='/pricing'>Pricing</NavbarItem>
							<NavbarItem>Blog</NavbarItem>
							<h2 onClick={login}>Sign In</h2>
						</NavbarItemsContainer>
					</NavbarContainer>

        <LoginContainer>
          <LoginContent>
          <LogoImage src={logo} alt="loading" className="ld ld-bounce" />
            <p>Please login to view this page or return Home.</p>
            <ButtonContainer>

            <StyledButton variant='contained' onClick={e => login()}>Login</StyledButton>
            <StyledLink to='/'><StyledButton variant='outlined' >Home</StyledButton></StyledLink>
            </ButtonContainer>
          </LoginContent>
        </LoginContainer>
        </>
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
  color: black;
  }
`;
const LoginContent = styled.div`
  height: 250px;
  width: 25vw;
  display: flex;
  flex-direction: column;
  /* background-color: #2699fb; */
  justify-content: center;
  align-items: center;
`;

// const LogoContainer = styled.img`
//   width: 100px;
// `;
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
	h3 {
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
const LogoImage = styled.img`
	width: 100px;
	/* position: absolute;
	right: 50%;
	top: 45%; */
`;

const StyledButton = styled(Button)`
  background-color: #451476;
  margin:5px;

    &:hover {
      background: #451476;
      color: #451476;
    };
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #451476;
`;
const ButtonContainer = styled.div`
  display: flex;
  width:160px;
  justify-content: space-between;
`