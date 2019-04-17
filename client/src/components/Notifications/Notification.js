import React from 'react';
import moment from 'moment';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Typography } from '@material-ui/core/';
var phoneFormatter = require('phone-formatter');

//Customized Styling
const styles = {
	listItem: {
		width: '100%',
		marginBottom: 10,
		marginTop: 4,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #E8E9EB'
	},
	title: {
		fontSize: 16
	},
	sendDate: {
		fontSize: 13,
		textAlign: 'right'
	}
};

function Notification(props) {
	const { classes } = props;
	const {
		firstName,
		lastName,
		sendDate,
		postName,
		email,
		phoneNumber,
		title
	} = props.notification;

	return (
		<ListItem className={classes.listItem}>
			<ListItemText
				primary={`${postName} | ${title}`}
				secondary={`${firstName} ${lastName} | ${
					email ? email : phoneFormatter.format(phoneNumber, '(NNN) NNN-NNNN')
				}`}
			/>
			<Typography className={classes.sendDate}>
				{props.filterSent === 'pending' ? 'Send Date' : 'Sent on'}
				<br />
				{moment(sendDate)
					.add(1, 'days')
					.format('MMMM Do')}
			</Typography>
		</ListItem>
	);
}

Notification.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Notification);
