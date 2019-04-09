// displays all posts of a training series
import React from 'react';

// import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
// Components
// import PostModal from '../Modals/PostModal';
// import PostOptionsModal from '../Modals/PostOptionsModal';
import DeleteModal from '../Modals/deleteModal';
// import IconButton from '@material-ui/core/IconButton';

import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import { getTrainingSeriesPosts, createAPost, editPost, deletePost } from '../../store/actions';
import { withStyles } from '@material-ui/core/styles';

// Styling
import {
	Paper,
	ListItem,
	ListItemText,
	ListItemSecondaryAction,
	Typography,
} from '@material-ui/core/';

const styles = theme => ({
	paper: {
		width: '80%',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: 'none',
		margin: '20px auto',
		'@media (max-width: 480px)': {
			width: '89%',
			padding: 0,
			margin: '0 auto',
		},
	},
	secondaryAction: {
		display: 'flex',
		flexDirection: 'row',
		'align-items': 'center',
	},
	listItem: {
		width: '79%',
		height: 95,
		marginBottom: 20,
		paddingBottom: 10,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderBottom: '1px solid #E8E9EB',
		// "list-style": "none"
	},
	icons: {
		display: 'block',
		width: 20,
		marginBottom: 10,
		color: 'gray',
		cursor: 'pointer',
		'&:hover': { color: '#2699FB' },
	},
	hidden: {
		display: 'none',
	},
	button: {
		margin: theme.spacing.unit,
	},
	list: {
		listStyleType: 'none',
	},
});
class TrainingSeriesPosts extends React.Component {
	state = {
		active: false,
	};

	componentDidMount() {
		this.getTrainingSeriesWithPosts(this.props.match.params.id);
	}

	getTrainingSeriesWithPosts = id => {
		this.props.getTrainingSeriesPosts(id);
	};

	deletePost = (e, id) => {
		e.preventDefault();
		console.log(id);
		this.props.deletePost(id);
	};

	routeToPostPage = e => {
		e.preventDefault();
		this.props.history.push({
			pathname: '/home/create-post',
			state: {
				trainingSeriesId: this.props.singleTrainingSeries.trainingSeriesID,
			},
		});
	};

	routeToEditPostPage = (e, post) => {
		e.preventDefault();
		console.log('FIRED');
		this.props.history.push({
			pathname: `/home/post/${post.postID}`,
			state: {
				post,
			},
		});
	};

	render() {
		const { classes } = this.props;
		// console.log("POSTS", this.props);
		return (
			<>
				{/* Gives app time to fetch data */}
				{this.props.isLoading && <p>Please wait...</p>}
				{!this.props.isLoading && (
					<Paper className={classes.paper}>
						<HeaderContainer>
							<h1>{this.props.singleTrainingSeries.title}</h1>
							{/* <PostModal
              trainingSeries={this.props.singleTrainingSeries}
              createAPost={this.props.createAPost}
              editPost={this.props.editPost}
            /> */}
							<ButtonContainer>
								<Typography variant="subtitle1">Create A New Message</Typography>
								<Fab
									color="primary"
									size="small"
									aria-label="Add"
									className={classes.fab}
									onClick={e => this.routeToPostPage(e)}>
									<i className="material-icons">add</i>
								</Fab>
							</ButtonContainer>
						</HeaderContainer>
						<ListStyles>
							{this.props.posts.map(post => (
								<ListItem key={post.postID} className={classes.listItem}>
									<ListItemText
										primary={post.postName}
										secondary={post.postDetails}
									/>
									<ListItemSecondaryAction className={classes.secondaryAction}>
										{/* <IconButton aria-label="Delete"> */}
										<div>
											<p>{post.daysFromStart} days</p>
										</div>
										{/* <PostOptionsModal
                      editPost={this.props.editPost}
                      deletePost={this.props.deletePost}
                      singleTrainingSeries={this.props.singleTrainingSeries}
                      post={post}
                    /> */}
										<ListButtonContainer>
											<i
												className={`material-icons ${classes.icons}`}
												onClick={e => this.routeToEditPostPage(e, post)}>
												edit
											</i>

											<DeleteModal
												className={`material-icons ${classes.icons}`}
												deleteType="post"
												id={post.postID}
											/>
										</ListButtonContainer>
										{/* </IconButton> */}
									</ListItemSecondaryAction>
								</ListItem>
							))}
						</ListStyles>
					</Paper>
				)}
			</>
		);
	}
}

const HeaderContainer = styled.div`
	width: 80%;
	margin: 0 auto;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 250px;
`;

const ListStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: space-around;
	width: 80%;
	margin: 20px auto;
	list-style: none;
`;

const ListButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	margin-left: 40px;
`;

const mapStateToProps = state => ({
	isLoading: state.postsReducer.isLoading,
	singleTrainingSeries: state.postsReducer.singleTrainingSeries,
	posts: state.postsReducer.posts,
});

TrainingSeriesPosts.propTypes = {};

export default connect(
	mapStateToProps,
	{ getTrainingSeriesPosts, createAPost, editPost, deletePost }
)(withStyles(styles)(TrainingSeriesPosts));
