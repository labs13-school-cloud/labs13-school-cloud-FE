// Main page fro displaying a list of all classes
import React, { useEffect } from "react";
import { connect } from "react-redux";

import history from "history.js";

import { getVolunteers } from "store/actions";
// Material UI imports
import DeleteModal from "components/UI/Modals/deleteModal";
import { withStyles } from "@material-ui/core/styles";
import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

const styles = {
	listitem: {
		width: "30%",
		"@media (max-width:1540px)": {
			width: "29%",
		},
		"@media (max-width: 1090px)": {
			width: "28%",
		},
		"@media (max-width: 900px)": {
			width: "100%",
		},
	},
	container: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
	},
};

function Overview(props) {
	const { getVolunteers, volunteers, getFiltered, classes } = props;

	useEffect(() => {
		getVolunteers();
	}, [getVolunteers]);

	return (
		<div className={classes.container}>
			{getFiltered(volunteers).map(volunteer => {
				const { id, name, approved, donator, email } = volunteer;

				return (
					<ListStyles key={id} component="li" className={classes.listitem}>
						
							<div style={{ cursor: "pointer", width: "100%" }}>
								<Typography
									variant="subtitle1"
									style={{ display: "flex", justifyContent: "space-between" }}>
									{name}
									<DeleteModal
										deleteType="volunteers"
										className={`material-icons ${classes.icons}`}
										volunteerId={id}
										style={{ zIndex: "1000" }}
									/>
								</Typography>
								<div onClick={() => history.push(`home/classes/${id}`)}>
									<hr />
									<Typography variant="overline">{`Email: `}</Typography>
									<Typography variant="overline">{`${email}`}</Typography>
									<Typography variant="overline">
										{`Approved: ${approved}`}
									</Typography>
									<Typography variant="overline">
										{`Donator: ${donator}`}
									</Typography>
								</div>
							</div>
						
					</ListStyles>
				);
			})}
		</div>
	);
}

const mapStateToProps = state => {
	return {
		volunteers: state.volunteerReducer.volunteers,
	};
};

export default connect(
	mapStateToProps,
	{ getVolunteers },
)(withStyles(styles)(Overview));
