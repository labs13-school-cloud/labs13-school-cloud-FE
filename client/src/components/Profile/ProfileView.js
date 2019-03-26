import React, { useState } from 'react';
import AppBar from '../AppBar/AppBar';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import { logout } from '../../Auth/Auth';
import Profile from './Profile';

const Container = styled.div`
	margin-top: 80px;
`;

const ProfileView = props => {
	const { toggle, setToggle } = useState(true);

	const handleLogout = e => {
		e.preventDefault();
		logout();
		props.history.push('/');
	};

	return (
		<Container>
			<AppBar />
			<Button variant="contained" color="secondary" onClick={e => handleLogout(e)}>
				Log Out
			</Button>

			<Profile />
		</Container>
	);
};

export default ProfileView;
