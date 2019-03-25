import React, { useState } from 'react';
import Profile from './Profile';
import AppBar from '../AppBar/AppBar';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const Container = styled.div`
	margin-top: 80px;
`;

const ProfileView = props => {
	const { toggle, setToggle } = useState(true);

	const handleLogout = e => {
		e.preventDefault();
		localStorage.removeItem('isLoggedIn');
		props.history.push('/');
	};

	return (
		<Container>
			<AppBar />
			<Button variant="contained" color="secondary" onClick={e => handleLogout(e)}>
				Log Out
			</Button>

			<Profile auth={props.auth} />
		</Container>
	);
};

export default ProfileView;
