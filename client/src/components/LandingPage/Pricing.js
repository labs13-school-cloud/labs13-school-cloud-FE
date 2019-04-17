// contains all components for landing page
import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

//Styling
import styled from 'styled-components';
import { ArrowUpward } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper
} from '@material-ui/core/';

import Logo from '../../img/training-bot.png';
//Auth
import { login } from '../../Auth/Auth';

const styles = theme => ({
	root: {
		width: '75%',
		// marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
		margin: '0 auto',
		fontSize: '1rem'
	},
	table: {
		minWidth: 400,
		border:'none',
		fontSize:'20px',
	},
	tableRow:{
		fontSize: '18px'
	},
	tableCell:{
		fontSize: '18px'
	},
});

let id = 0;
function createData(name, basic, premium, pro) {
	id += 1;
	return { id, name, basic, premium, pro };
}

const rows = [
	createData(
		'Automated Text/Email',
		<span>&#10004;</span>,
		<span>&#10004;</span>,
		<span>&#10004;</span>
	),
	createData(
		'Unlimited Training Series',
		<span>&#10004;</span>,
		<span>&#10004;</span>,
		<span>&#10004;</span>
	),
	createData(
		'Unlimited Team Members',
		<span>&#10004;</span>,
		<span>&#10004;</span>,
		<span>&#10004;</span>
	),
	createData('Message Limit', 50, 200, 1000)
];
class Pricing extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<>
				<LandingPageContainer>
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
					{/* JUMBOTRON STYLED SECTION */}
					<FirstSection>
						<LandingPageContentContainer>
							<h1>Training Bot</h1>
							<p>
								"Empowers team leaders with tools to assist with their team’s
								continual learning by sending automated Text messages/emails on
								a scheduled interval to team members”.
							</p>
							<LandingPageButtonContainer>
								<Button onClick={login}>Get Started</Button>
								<Button variant='outlined'>Learn More</Button>
							</LandingPageButtonContainer>
						</LandingPageContentContainer>
						<VideoContainer>
							<iframe
								width='100%'
								height='400'
								src='https://www.youtube.com/embed/CQ85sUNBK7w'
								frameborder='0'
								allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
								allowfullscreen
								title='Marketing Video'
							/>
						</VideoContainer>
					</FirstSection>
					<div className={classes.root}>
						<Table className={classes.table}>
							<TableHead>
								<TableRow className={classes.tableRow}>
									<TableCell />
									<TableCell className={classes.tableCell} align='right'>Basic</TableCell>
									<TableCell className={classes.tableCell} align='right'>Premium</TableCell>
									<TableCell className={classes.tableCell} align='right'>Pro</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map(row => (
									<TableRow key={row.id}>
										<TableCell className={classes.tableCell} component='th' scope='row'>{row.name}</TableCell>
										<TableCell className={classes.tableCell} align='right'>{row.basic}</TableCell>
										<TableCell className={classes.tableCell} align='right'>{row.premium}</TableCell>
										<TableCell className={classes.tableCell} align='right'>{row.pro}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<FooterContainer>
						<FooterItemsContainer>
							<h3>Team</h3>
							<h3>Pricing</h3>
							<h3>Blog</h3>
						</FooterItemsContainer>
						<ArrowUpward onClick={() => window.scrollTo(0, 0)} />
					</FooterContainer>
				</LandingPageContainer>
			</>
		);
	}
}
export default withStyles(styles)(Pricing);

const LandingPageContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	max-width: 1280px;
	background-color: white;
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

const FirstSection = styled.div`
	background-color: #fafafa;
	width: 95%;
	margin: 0px auto 20px;
	padding: 50px 10px;
	display: flex;
`;

const LandingPageContentContainer = styled.div`
	width: 50%;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0 80px;
	h1 {
		margin-top: 0;
		color: #451476;
		font-size: 42px;
	}

	@media (max-width: 1000px) {
		width: 100%;
		padding: 0;
		text-align: center;
		p {
			padding: 0 50px;
		}
	}
`;

const LandingPageButtonContainer = styled.div`
	display: flex;
	margin-top: 30px;
	button:first-child {
		margin: 0 10px;
		background-color: #451476;
		color: white;
	}
	button:nth-child(2) {
		border: 1px solid #451476;
		color: #451476;
		&:hover {
			background-color: #451476;
			color: white;
		}
	}
`;

const VideoContainer = styled.div`
	width: 50%;
	@media (max-width: 1000px) {
		display: none;
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
	h3 {
		font-size: 16px;
		font-weight: 500;
		padding: 0 20px;
		cursor: pointer;
	}
`;
