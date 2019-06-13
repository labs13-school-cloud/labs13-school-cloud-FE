import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
import TeamMembersOverview from "components/Pages/TeamMembers/List/Overview";
import TeamMembersTab from "components/Pages/TeamMembers/List/Tab";
import TrainingSeriesOverview from "components/Pages/TrainingSeries/List/Overview";
import TrainingSeriesTab from "components/Pages/TrainingSeries/List/Tab";
import VolunteerClassTab from "../../../VolunteerComponents/Pages/Classes/List";
import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/Notifications/Card/Overview/Overview.js";
import Responses from "components/Pages/Notifications/Responses";
import TabNavigation from "components/Pages/Dashboard/Dashboard/helpers/TabNavigation.js";
import DektopNavigation from "components/Pages/Dashboard/Dashboard/helpers/DesktopNavigation.js";

import AppBar from "components/Navigation/AppBar/AppBar";


import {
    TripleColumn,
    SmallColumns,
    Divider,
    DashWrapper,
    MobileNav,
    DesktopNav
  } from "components/Pages/Dashboard/Dashboard/styles.js";

/**
 * This is where we will set up our volunteer routes
 * and connect all of our components regarding
 * volunteers
 */

const VolunteerDashboard = props => {
	const [topTab, setTopTab] = useState("overview");
	const [newResponses, setNewResponses] = useState([]);
	const {
		user_id,
		history,
		responses,
		getAllResponses: responsesFromProps,
	} = props;

	useEffect(() => {
		responsesFromProps();
		setTimeout(() => {
			responsesFromProps();
		}, 60 * 1000);
	}, [responsesFromProps]);

	useEffect(() => {
		setNewResponses(responses.filter(r => !r.seen));
	}, [responses]);

	return (
		<DashWrapper>
            <AppBar />
			<MobileNav>
				<TabNavigation
					topTab={topTab}
					setTopTab={setTopTab}
					newResponses={newResponses}
				/>
			</MobileNav>
			<DesktopNav>
				<DektopNavigation topTab={topTab} setTopTab={setTopTab} />
			</DesktopNav>

			<TripleColumn>
				{topTab === "overview" && (
					<>
						<SmallColumns>
							<SearchCard
								user_id={user_id}
								List={TeamMembersOverview}
								containerTourNum="1"
								section="Team Members"
								headerTourNum={["2", "3"]}
								handleAdd={() => history.push("/home/create-team-member")}
							/>
							<Divider />
							<SearchCard
								user_id={user_id}
								List={TrainingSeriesOverview}
								containerTourNum="4"
								section="Training Series"
								handleAdd={() => history.push("/home/create-training-series")}
							/>
						</SmallColumns>
						<NotificationsCard List={NotificationsOverview} user_id={user_id} />
					</>
				)}

				{topTab === "Team Members" && (
					<SearchCard
						user_id={user_id}
						List={TeamMembersTab}
						section="Team Members"
						handleAdd={() => history.push("/home/create-team-member")}
						isSearching={true}
					/>
				)}

				{topTab === "training series" && (
					<SearchCard
						user_id={user_id}
						List={TrainingSeriesTab}
						section="Training Series"
						handleAdd={() => history.push("/home/create-training-series")}
						isSearching={true}
						limit={3}
					/>
				)}

				{topTab === "classes" && (
					<SearchCard
						user_id={user_id}
						List={VolunteerClassTab}
						section="classes"
						handleAdd={() => history.push("/home/create-class")}
						isSearching={true}
						limit={10}
					/>
				)}

				{topTab === "notifications" && (
					<div style={{ width: "100%" }}>
						<NotificationsCard
							List={NotificationsOverview}
							user_id={user_id}
							width="95%"
						/>
					</div>
				)}
				{topTab === "responses" && (
					<Responses history={props.history} user_id={user_id} />
				)}
			</TripleColumn>
		</DashWrapper>
	);
};

const mapStateToProps = state => ({
	responses: state.responsesReducer.responses,
});

export default connect(
	mapStateToProps,
	{ getAllResponses },
)(VolunteerDashboard);
