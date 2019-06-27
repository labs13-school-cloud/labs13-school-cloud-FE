import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";

import SearchCard from "components/UI/SearchCard/";
import TrainingSeriesOverview from "components/VolunteerComponents/Pages/TrainingSeries/List/Overview";
import VolunteerClassOverview from "components/VolunteerComponents/Pages/Classes/Overview";
import VolunteerClassTab from "components/VolunteerComponents/Pages/Classes/List/V-ClassesTab.js";
import TrainingSeriesTabVolunteer from "components/VolunteerComponents/Pages/TrainingSeries/List/TabVolunteer/TabVolunteer.js";
import NotificationsCard from "components/Pages/Notifications/Card";
import NotificationsOverview from "components/Pages/Notifications/Card/Overview/Overview.js";
import ContactTab from "components/VolunteerComponents/Pages/Contact/Tab";
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
            <SearchCard
              user_id={user_id}
              List={TrainingSeriesOverview}
              containerTourNum="2"
              section="Training Series"
            />
            <Divider />
            <SearchCard
              user_id={user_id}
              List={VolunteerClassOverview}
              containerTourNum="1"
              section="Classes"
              //headerTourNum={["3", "3"]}
            />
          </>
        )}

        {topTab === "training series" && (
          <SearchCard
            user_id={user_id}
            List={TrainingSeriesTabVolunteer}
            section="Training Series"
            isSearching={false}
            limit={3}
          />
        )}

        {topTab === "classes" && (
          <SearchCard
            user_id={user_id}
            List={VolunteerClassTab}
            section="Classes"
            isSearching={false}
            limit={10}
          />
        )}

        {topTab === "contact" && <ContactTab />}
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
