import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
import TrainingSeriesOverview from "components/VolunteerComponents/Pages/TrainingSeries/List/Overview";
import VolunteerClassTab from "components/VolunteerComponents/Pages/Classes/List";
import TrainingSeriesTabVolunteer from "components/VolunteerComponents/Pages/TrainingSeries/List/TabVolunteer/TabVolunteer.js";
import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/Notifications/Card/Overview/Overview.js";
import Responses from "components/Pages/Notifications/Responses";
import TabNavigation from "components/VolunteerComponents/Pages/Dashboard/helpers/TabNavigation.js";
import DektopNavigation from "components/VolunteerComponents/Pages/Dashboard/helpers/DesktopNavigation.js";

import AppBar from "components/Navigation/AppBar/AppBar";

import {
  TripleColumn,
  SmallColumns,
  Divider,
  DashWrapper,
  MobileNav,
  DesktopNav
} from "components/VolunteerComponents/Pages/Dashboard/styles.js";

/**
 * This is where we will set up our volunteer routes
 * and connect all of our components regarding
 * volunteers
 */

const VolunteerDashboard = props => {
  const [topTab, setTopTab] = useState("overview");
  const [newResponses, setNewResponses] = useState([]);
  const { user_id, responses, getAllResponses: responsesFromProps } = props;

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
                containerTourNum="2"
                section="Training Series"
              />
            </SmallColumns>
          </>
        )}

        {topTab === "training series" && (
          <SearchCard
            user_id={user_id}
            List={TrainingSeriesTabVolunteer}
            section="Training Series"
            isSearching={true}
            limit={3}
          />
        )}

        {topTab === "classes" && (
          <SearchCard
            user_id={user_id}
            List={VolunteerClassTab}
            section="classes"
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
  responses: state.responsesReducer.responses
});

export default connect(
  mapStateToProps,
  { getAllResponses }
)(VolunteerDashboard);
