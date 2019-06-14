import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses, getClassList } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
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
    getClassList
  } = props;

  useEffect(() => {
    console.log("Dashboard use effect");
    responsesFromProps();
    setTimeout(() => {
      responsesFromProps();
    }, 60 * 1000);
  }, [responsesFromProps]);

  useEffect(() => {
    setNewResponses(responses.filter(r => !r.seen));
  }, [responses]);

  useEffect(() => {
    console.log("I'm here!!");
    getClassList();
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
                List={TrainingSeriesOverview}
                containerTourNum="4"
                section="Training Series"
                handleAdd={() => history.push("/home/create-training-series")}
              />
            </SmallColumns>
            <NotificationsCard List={NotificationsOverview} user_id={user_id} />
          </>
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
            List={ClassListTab}
            section="Classes"
            handleAdd={() => history.push("/home/create-class")}
            isSearching={false}
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
