import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
import TeamMembersOverview from "components/Pages/TeamMembers/List/Overview";
import TeamMembersTab from "components/Pages/TeamMembers/Tab";
import TrainingSeriesOverview from "components/Pages/TrainingSeries/List/Overview";
import TrainingSeriesTab from "components/Pages/TrainingSeries/Tabs/TrainingSeriesTab.js";
import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/Notifications/Card/Overview/Overview.js";
import Responses from "components/Pages/Notifications/Responses";
import TabNavigation from "./helpers/TabNavigation.js";
import NotificationsTab from "components/Pages/Notifications/Card/NotificationsTab.js";

import { TripleColumn, SmallColumns, DashWrapper } from "./styles.js";

function Dashboard(props) {
  const [topTab, setTopTab] = useState("overview");
  const [newResponses, setNewResponses] = useState([]);
  const {
    user_id,
    history,
    getAllResponses: responsesFromProps,
    responses
  } = props;

  useEffect(() => {
    responsesFromProps();
    setTimeout(() => {
      responsesFromProps();
    }, 60 * 1000);
  }, [responsesFromProps]);

  useEffect(() => {
    console.log("REPONSES", responses);
    setNewResponses(responses.filter(r => !r.seen));
  }, [responses]);

  return (
    <DashWrapper>
      <TabNavigation
        topTab={topTab}
        setTopTab={setTopTab}
        newResponses={newResponses}
      />
      {topTab === "overview" && (
        <TripleColumn>
          <SmallColumns>
            <SearchCard
              user_id={user_id}
              List={TeamMembersOverview}
              containerTourNum="1"
              section="Team Members"
              headerTourNum={["2", "3"]}
              handleAdd={() => history.push("/home/create-team-member")}
            />
            <SearchCard
              user_id={user_id}
              List={TrainingSeriesOverview}
              containerTourNum="4"
              section="Training Series"
              handleAdd={() => history.push("/home/create-training-series")}
            />
          </SmallColumns>
          <NotificationsCard
            List={NotificationsOverview}
            user_id={user_id}
            history={props.history}
          />
        </TripleColumn>
      )}

      {topTab === "team members" && (
        <TeamMembersTab history={props.history} user_id={user_id} />
      )}
      {topTab === "training series" && (
        <TrainingSeriesTab history={props.history} user_id={user_id} />
      )}
      {topTab === "notifications" && (
        <div
          style={{
            width: "90vw",
            marginTop: "48px"
          }}
        >
          <NotificationsTab
            style={{
              width: "100%"
            }}
            List={NotificationsOverview}
            history={props.history}
            user_id={user_id}
          />
        </div>
      )}
      {topTab === "responses" && (
        <Responses history={props.history} user_id={user_id} />
      )}
    </DashWrapper>
  );
}

const mapStateToProps = state => ({
  responses: state.responsesReducer.responses
});

export default connect(
  mapStateToProps,
  { getAllResponses }
)(Dashboard);
