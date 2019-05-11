// displays training series card
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core/';

import SlideDownModal from 'components/UI/Modals/SlideDownModal';

//Customized Styling
const styles = {
	listItem: {
		width: '100%',
		// marginTop: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #E8E9EB',
		transition: 'background-color 0.3s',
		'&:hover': {
			cursor: 'pointer',
			backgroundColor: 'whitesmoke'
			// "box-shadow": "0px 6px 15px -4px rgba(0,0,0,0.84)"
		}
	},
	title: {
		fontSize: 16
	}
};

function SeriesCard(props) {
	const { classes } = props;
	const [ messageLength, setMessageLength ] = useState(0);
	const [ assignedLength, setAssignedLength ] = useState(0);

	const { id } = props.data;
	const url = `${process.env.REACT_APP_API}/api/training-series/${id}`;

	async function getMessageCount() {
		try {
			const { data } = await axios.get(`${url}/messages`);
			// console.log(data);
			setMessageLength(data.messages.length);
		} catch (err) {
			console.log(err);
		}
	}
	function getMemberCount() {
		//first filter all notifications brought in from Redux state for only ones linked to this series
		const filteredNotifs = props.notifications.filter((n) => n.training_series_id === id);
		//push each unique team member id from remaining notifications, length of this is # of assigned members
		let tmIds = [];
		filteredNotifs.forEach((n) => !tmIds.includes(n.team_member_id) && tmIds.push(n.team_member_id));
		setAssignedLength(tmIds.length);
	}

	useEffect(() => {
		getMessageCount();
		getMemberCount();
	});

	const routeToTrainingSeriesPage = (e) => {
		e.preventDefault();

		props.history.push(`home/training-series/${id}`);
	};

	return (
		<ListItem component="li" className={classes.listItem}>
			<ListItemText
				primary={props.data.title}
				secondary={`Messages: ${messageLength} | Assigned: ${assignedLength}`}
				onClick={(e) => routeToTrainingSeriesPage(e)}
			/>

			<SlideDownModal deleteTrainingSeries={props.deleteTrainingSeries} data={props.data} userId={props.userId} />
		</ListItem>
	);
}

SeriesCard.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		notifications: state.notificationsReducer.notifications
	};
};

export default connect(mapStateToProps, null)(withStyles(styles)(withRouter(SeriesCard)));
