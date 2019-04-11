import React from 'react';
import logo from '../../img/training-bot.svg';
import './loading.css';
import styled from 'styled-components';

function ProgressCircle(props) {
	return (
		<div>
			<LogoImage src={logo} alt="loading" className="ld ld-bounce" />
		</div>
	);
}

export default ProgressCircle;

const LogoImage = styled.img`
	width: 100px;
	position: absolute;
	right: 45.8%;
	top: 52.5%;
`;
