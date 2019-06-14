import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses, getClassList } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
import TeamMembersOverview from "components/Pages/TeamMembers/List/Overview";
import TeamMembersTab from "components/Pages/TeamMembers/List/Tab";
import TrainingSeriesOverview from "components/Pages/TrainingSeries/List/Overview";
import TrainingSeriesTab from "components/Pages/TrainingSeries/List/Tab";
import ClassListTab from "../../../../components/Pages/Classes/List/Overview"
import TrainingSeriesTabVolunteer from "components/Pages/TrainingSeries/List/TabVolunteer/TabVolunteer";
import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/Notifications/Card/Overview/Overview.js";
import Responses from "components/Pages/Notifications/Responses";
import TabNavigation from "./helpers/TabNavigation.js";
import DektopNavigation from "./helpers/DesktopNavigation.js";

import {
  TripleColumn,
  SmallColumns,
  Divider,
  DashWrapper,
  MobileNav,
  DesktopNav
} from "./styles.js";

function Dashboard(props) {
  const [topTab, setTopTab] = useState("overview");
  const [newResponses, setNewResponses] = useState([]);
  const {
    user_id,
    history,
    responses,
    getAllResponses: responsesFromProps,
    getClassList,
  } = props;

  useEffect(() => {
    console.log("Dashboard use effect")
    responsesFromProps();
    setTimeout(() => {
      responsesFromProps();
    }, 60 * 1000);
  }, [responsesFromProps]);

  useEffect(() => {
    setNewResponses(responses.filter(r => !r.seen));
  }, [responses]);

  useEffect(() => {
    console.log("I'm here!!")
    getClassList()
}, [getClassList]);

  return (
    <DashWrapper>
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



        {/* {topTab === "training series" && (
          <SearchCard
            user_id={user_id}
            List={TrainingSeriesTabVolunteer}
            section="Training Series"
            isSearching={true}
            limit={3}
          />
        )} */}

        {topTab === "classes" && (
            <SearchCard 
              List={ClassListTab}
              section="Classes"
              handleAdd={() => history.push("/home/create-class")}
              isSearching={false}
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
}

const mapStateToProps = state => ({
  responses: state.responsesReducer.responses
});

export default connect(
  mapStateToProps,
  { getAllResponses, getClassList }
)(Dashboard);
