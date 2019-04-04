// displays training series card
import React from 'react';
import { Link } from 'react-router-dom';

//PropTypes
import PropTypes from 'prop-types';

//Styling
import { withStyles } from '@material-ui/core/styles';
import {
	// Card,
	// CardContent,
	// Typography,
	// List,
	ListItem,
	// ListItemSecondaryAction,
	ListItemText,
} from '@material-ui/core/';

import SlideDownModal from '../Modals/SlideDownModal';

//Customized Styling
const styles = {
	listItem: {
		width: '100%',
		marginBottom: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #E8E9EB',
	},
	title: {
		fontSize: 16,
	},
};

function SeriesCard(props) {
	const { classes } = props;

	return (
		<ListItem className={classes.listItem}>
			<ListItemText primary={props.data.title} secondary="Posts: 10 | Assigned: 5" />

			<SlideDownModal
				deleteTrainingSeries={props.deleteTrainingSeries}
				data={props.data}
				userID={props.userID}
			/>
		</ListItem>

		// <Card className={classes.card}>
		//   <CardContent>
		//     <Typography
		//       className={classes.title}
		//       variant="h5"
		//       component="h3"
		//       gutterBottom
		//     >
		//       {props.data.title}
		//     </Typography>
		//     <Typography variant="caption">Posts: 10 | Assigned: 5</Typography>
		//   </CardContent>
		//   <SlideDownModal
		//     deleteTrainingSeries={props.deleteTrainingSeries}
		//     data={props.data}
		//     userID={props.userID}
		//   />
		// </Card>
	);
}

SeriesCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeriesCard);
