// displays individual post modal
import React from 'react';

//Prop Types
import PropTypes from 'prop-types';

// Styles
import { withStyles } from '@material-ui/core/styles';
import { Modal, TextField, Button } from '@material-ui/core/';

function getModalStyle() {
	const top = 50;
	const left = 50;

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
	container: {
		display: 'flex',
		'flex-direction': 'column',
		flexWrap: 'wrap',
		'align-items': 'center',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '90%',
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
	button: {
		margin: theme.spacing.unit,
	},
});

class PostModal extends React.Component {
	state = {
		open: false,
		isUpdating: false,
		post: {
			postName: '',
			postDetails: '',
			link: '',
			daysFromStart: 1,
			trainingSeriesID: '',
		},
	};

	componentDidMount() {
		this.props.modalType === 'edit' &&
			this.setState({
				post: {
					postName: this.props.post.postName,
					postDetails: this.props.post.postDetails,
					link: this.props.post.link,
					daysFromStart: this.props.post.daysFromStart,
					trainingSeriesID: this.props.post.trainingSeriesID,
				},
			});
	}

	handleOpen = () => {
		if (this.props.modalType === 'edit') {
			this.setState({
				open: true,
			});
		} else {
			this.setState({
				open: true,
				post: {
					...this.state.post,
					trainingSeriesID: this.props.trainingSeries.trainingSeriesID,
				},
			});
		}
	};

	handleClose = () => {
		if (this.props.modalType !== 'edit') {
			this.clearForm();
		} else {
			this.setState({
				post: {
					postName: this.props.post.postName,
					postDetails: this.props.post.postDetails,
					link: this.props.post.link,
					daysFromStart: this.props.post.daysFromStart,
					trainingSeriesID: this.props.post.trainingSeriesID,
				},
			});
		}

		this.setState({
			open: false,
		});
	};

	handleChange = e => {
		e.preventDefault();
		this.setState({
			...this.state,
			post: {
				...this.state.post,
				[e.target.name]: e.target.value,
			},
		});
	};

	clearForm = () => {
		this.setState({
			post: {
				...this.state.post,
				postName: '',
				postDetails: '',
				link: '',
				daysFromStart: 1,
				trainingSeriesID: '',
			},
		});
	};

	handlePostSubmit = e => {
		e.preventDefault();
		if (this.props.modalType === 'edit') {
			this.props.editPost(this.props.post.postID, this.state.post);
		} else {
			this.props.createAPost(this.state.post);
			this.clearForm();
		}
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<>
				<Button onClick={this.handleOpen}>
					{this.props.modalType === 'edit' ? 'Edit ' : 'Create New '} post{' '}
				</Button>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={this.state.open}
					onClose={this.handleClose}>
					<div style={getModalStyle()} className={classes.paper}>
						<p>{this.props.modalType === 'edit' ? 'Edit Post' : 'Add Post'}</p>
						<form onSubmit={e => this.handlePostSubmit(e)}>
							<TextField
								name="postName"
								label="Post name"
								margin="normal"
								className={classes.textField}
								onChange={this.handleChange}
								value={this.state.post.postName}
							/>
							<TextField
								name="postDetails"
								label="Post Details"
								margin="normal"
								className={classes.textField}
								onChange={this.handleChange}
								value={this.state.post.postDetails}
							/>
							<TextField
								name="link"
								label="Link"
								margin="normal"
								className={classes.textField}
								onChange={this.handleChange}
								value={this.state.post.link}
							/>
							<TextField
								name="daysFromStart"
								label="Days from Start"
								margin="normal"
								className={classes.textField}
								onChange={this.handleChange}
								value={this.state.post.daysFromStart}
								step="1"
								min="1"
							/>
							<Button type="submit">Submit</Button>
						</form>
						<Button type="button" onClick={this.handleClose}>
							Cancel
						</Button>
					</div>
				</Modal>
			</>
		);
	}
}

PostModal.propTypes = {};

const PostModalWrapped = withStyles(styles)(PostModal);

export default PostModalWrapped;
