import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";
import SearchCard from "components/UI/SearchCard/";
import ClassesOverview from "components/VolunteerComponents/Pages/Classes/Overview/Overview.js";
import TrainingSeriesOverview from "components/VolunteerComponents/Pages/TrainingSeries/List/Overview/Overview.js";

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
} from "components/Pages/Dashboard/Dashboard/styles.js";

const Overview = props => {
  const [topTab, setTopTab] = useState("overview");
  const [newResponses, setNewResponses] = useState([]);
  const { user_id, responses, getAllResponses: responsesFromProps } = props;

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
                List={ClassesOverview}
                containerTourNum="1"
                section="Classes"
                //headerTourNum={["3", "3"]}
              />
              <Divider />
              <SearchCard
                user_id={user_id}
                List={TrainingSeriesOverview}
                containerTourNum="2"
                section="Training Series"
              />
            </SmallColumns>
          </>
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
)(Overview);
