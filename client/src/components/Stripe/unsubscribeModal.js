import React from 'react';
import { connect } from 'react-redux';

import { withStyles, Button, Typography } from '@material-ui/core/';
function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
	},
	buttonContainer: {
		margin: '0 auto',
	},
	button: {
		margin: 5,
	},
});
class UnsubscribeModal extends React.Component {
	render() {
		const { classes } = this.props;
		return (
			<div style={getModalStyle()} className={classes.paper}>
				<Typography variant="h6" id="modal-title">
					Are you sure you want to unsubscribe?
				</Typography>

				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="default"
						onClick={() => {
							this.props.unsub(
								this.props.userProfile.userID,
								this.props.userProfile.stripe
							);
						}}>
						Yes
					</Button>
					<Button
						className={classes.button}
						variant="contained"
						color="default"
						onClick={() => {
							this.props.handleClose();
						}}>
						No
					</Button>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		plans: state.stripeReducer.plans,
		plan: state.stripeReducer.plan,
		stripeLoading: state.stripeReducer.isLoading,
		userLoading: state.userReducer.isLoading,
		userProfile: state.userReducer.userProfile.user,
		userError: state.userReducer.error,
		stripeError: state.stripeReducer.error,
	};
};

export default connect(mapStateToProps)(withStyles(styles)(UnsubscribeModal));
