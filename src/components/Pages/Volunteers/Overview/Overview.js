import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getAllResponses } from "store/actions";
import { getClassList } from "store/actions/classesActions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles, PageContainer } from "./styles.js";

import SearchCard from "components/UI/SearchCard/";
import TrainingSeriesOverview from "components/Pages/TrainingSeries/List/Overview";
import TrainingSeriesTab from "components/Pages/TrainingSeries/List/Tab";
import TabNavigation from "./helpers/TabNavigation.js.js.js";
import DesktopNavigation from "./helpers/DesktopNavigation.js.js.js";

import {
  DoubleColumn,
  SmallColumns,
  Divider,
  DashWrapper,
  MobileNav,
  DesktopNav
} from "./styles.js.js.js";


function Dashboard(props) {
  const [topTab, setTopTab] = useState("overview");
  const {
    user_id,
    history,
    getClassList
  } = props;

  useEffect(() => {
    getTrainingSeries();
    getClassList();
  }, [getTrainingSeries, getClassList]);



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
        <DesktopNavigation topTab={topTab} setTopTab={setTopTab} />
      </DesktopNav>

      <DoubleColumn>
        {topTab === "overview" && (
          <>
            <SmallColumns>
             <SearchCard
                user_id={user_id}
                List={TrainingSeriesOverview}
                containerTourNum="4"
                section="Training Series"
              />
              <Divider />
              <SearchCard
                user_id={user_id}
                List={classListTab}
                containerTourNum="1"
                section="Classes"
                headerTourNum={["2", "3"]}
              />
            </SmallColumns>
          </>
        )}

        {topTab === "Classes" && (
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
            
          />
        )}

      </DoubleColumn>
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
