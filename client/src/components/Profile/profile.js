import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import AppBar from '../AppBar/AppBar';
import styled from 'styled-components';

//Styling
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	withStyles,
} from '@material-ui/core';

//Authentication
import { isLoggedIn, login } from '../../Auth/Auth';

const styles = {
	card: {
		maxWidth: 800,
		margin: '0 auto',
	},
	cardContent: {
		backgroundColor: '#E8E9EB',
	},
	media: {
		height: 200,
		width: 200,
	},
};

const Container = styled.div`
	margin-top: 80px;
`;

function Profile(props) {
	const { classes } = props;

	const [Profile, setProfile] = useState({});

	useEffect(() => {
		if (isLoggedIn()) {
			const user = JSON.parse(localStorage.getItem('Profile'));
			setProfile(user);
		}
	});

	return (
		<div className="container">
			<AppBar />
			{isLoggedIn() ? (
				<>
					<AppBar />
					<Container>
						<div className="profile-area">
							<Card className={classes.card}>
								<Typography gutterBottom variant="h5" component="h1">
									{Profile.name}
								</Typography>

								{/* <CardActionArea> */}
								<CardMedia
									className={classes.media}
									image={Profile.picture}
									title="Contemplative Reptile"
								/>
								<CardContent className={classes.cardContent}>
									<Typography gutterBottom variant="h5" component="h2">
										{Profile.nickname}
									</Typography>
									<Typography component="p">
										<pre>{JSON.stringify(Profile, null, 2)}</pre>
									</Typography>
								</CardContent>
								{/* </CardActionArea> */}
								<CardActions>
									<Button size="small" color="primary">
										Edit
									</Button>
									<Button size="small" color="secondary">
										Delete Account
									</Button>
								</CardActions>
							</Card>
						</div>
					</Container>
				</>
			) : (
				<h1>
					You are not logged in! <button onClick={() => login()}>Login Here!</button>
				</h1>
			)}
		</div>
	);
}

Profile.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
