import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Pagination from 'material-ui-flat-pagination';

//State Management
import { connect } from 'react-redux';
import {
	addTeamMemberToTrainingSeries,
	getTeamMembers,
	getMembersAssigned,
} from '../../../store/actions/';
import AddMember from './AddMember';

const styles = theme => ({
	root: {
		width: "100%",
		maxWidth: 768,
		margin: "20px auto",
		boxSizing: 'border-box',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: '20px 30px 40px',
		outline: "none",
		"@media (max-width:768px)": {
			width: "95%"
		}
	},
	footer: {
		display: 'flex',
		justifyContent: 'space-between',
		position: 'sticky',
		top: '100%',
	},
	pagination: { width: '90%' },
});

class AddMembersView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			trainingSeriesID: '',
			startDate: '',
			selectedTeamMembers: [],
			isRouting: false,
			offset: 0,
			limit: 5,
		};
	}

	componentDidMount() {
		this.props.getTeamMembers(this.props.userId);
		this.getAssigned();
		let d = new Date();
		let formattedDate = d.toISOString();
		this.setState({
			trainingSeriesID: this.props.match.params.id,
			startDate: formattedDate,
		});
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isEditing) {
			this.setState({ email: this.props.email, name: this.props.name });
		}
	}
	handleClick(offset) {
		this.setState({ offset });
	}
	getAssigned = () => {
		this.props.getMembersAssigned(this.props.match.params.id);
	};

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root} elevation={1}>
				<AddMember
					startDate={this.state.startDate}
					teamMembers={this.props.teamMembers}
					selectedTeamMembers={this.state.selectedTeamMembers}
					assignments={this.props.assignments}
					handler={this.handler}
					isRouting={this.state.isRouting}
					limit={this.state.limit}
					offset={this.state.offset}
				/>
			</Paper>
		);
	}

	handler = {
		handleDateChange: date => {
			let d = date;
			this.setState({
				startDate: d.toISOString(),
			});
		},
		handleSubmit: e => {
			e.preventDefault();
			const data = {
				startDate: this.state.startDate,
				trainingSeriesID: this.state.trainingSeriesID,
				assignments: this.state.selectedTeamMembers,
			};
			this.props.addTeamMemberToTrainingSeries(data);
			this.setState({ isRouting: true });
		},
		handleChecked: id => {
			if (!this.state.selectedTeamMembers.includes(id)) {
				this.setState({
					...this.state,
					selectedTeamMembers: [...this.state.selectedTeamMembers, id],
				});
			} else {
				let filteredTeamMembers = this.state.selectedTeamMembers.filter(
					member => member !== id
				);
				this.setState({
					...this.state,
					selectedTeamMembers: filteredTeamMembers,
				});
			}
		},
		handleChange: name => event => {
			this.setState({ [name]: event.target.value });
		},
		routeToPostPage: () => {
			this.props.history.push(`/home/training-series/${this.state.trainingSeriesID}`);
		},
	};
}

AddMembersView.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
	return {
		trainingSeries: state.trainingSeriesReducer.trainingSeries,
		isLoading: state.userReducer.isLoading,
		teamMembers: state.teamMembersReducer.teamMembers,
		assignments: state.trainingSeriesReducer.assignments,
	};
};

export default connect(
	mapStateToProps,
	{
		addTeamMemberToTrainingSeries,
		getTeamMembers,
		getMembersAssigned,
	}
)(withStyles(styles)(AddMembersView));
