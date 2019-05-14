import React, { useState } from "react";

import SearchCard from "components/UI/SearchCard/";
import TeamMembersOverview from "components/Sections/TeamMembers/List/Overview";
import TeamMembersTab from "components/Sections/TeamMembers/Tab";
import TrainingSeriesOverview from "components/Sections/TrainingSeries/List/Overview";
import TrainingSeriesTab from "components/Sections/TrainingSeries/TabTSComponents/TrainingSeriesTab.js";
import NotificationsCard from "components/Sections/Notifications/Card";
import NotificationsOverview from "components/Sections/Notifications/Card/Overview/Overview.js";
import Responses from "components/Sections/Notifications/Responses";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PermIdentity from "@material-ui/icons/PermIdentityOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswerOutlined";
import Timeline from "@material-ui/icons/TimelineOutlined";
import ModeComment from "@material-ui/icons/ModeCommentOutlined";

import { TripleColumn, SmallColumns, DashWrapper } from "./styles.js";

function Dashboard(props) {
  const [topTab, setTopTab] = useState("overview");
  const { user_id } = props;

  return (
    <DashWrapper>
      <BottomNavigation
        value={topTab}
        onChange={(e, value) => {
          setTopTab(value);
        }}
        style={{
          width: "100%",
          whiteSpace: "nowrap",
          background: "rgb(240,240,240)"
        }}
      >
        <BottomNavigationAction
          label="Overview"
          value="overview"
          icon={<Home />}
          color="primary"
        />
        <BottomNavigationAction
          label="Team Members"
          value="team members"
          icon={<PermIdentity />}
        />
        <BottomNavigationAction
          label="Training Series"
          value="training series"
          icon={<Timeline />}
        />
        <BottomNavigationAction
          label="Messages"
          value="messages"
          icon={<QuestionAnswer />}
        />
        <BottomNavigationAction
          label="Responses"
          value="responses"
          icon={<ModeComment />}
        />
      </BottomNavigation>

      {topTab === "overview" && (
        <TripleColumn>
          <SmallColumns>
            <SearchCard
              user_id={user_id}
              List={TeamMembersOverview}
              containerTourNum="1"
              section="Team Members"
              headerTourNum={["2", "3"]}
              handleAdd={() => props.history.push("/home/create-team-member")}
            />
            <SearchCard
              user_id={user_id}
              List={TrainingSeriesOverview}
              containerTourNum="4"
              section="Training Series"
              handleAdd={() =>
                props.history.push("/home/create-training-series")
              }
            />
          </SmallColumns>
          <NotificationsCard
            Notifications={NotificationsOverview}
            user_id={user_id}
          />
        </TripleColumn>
      )}

      {topTab === "team members" && (
        <TeamMembersTab history={props.history} user_id={user_id} />
      )}
      {topTab === "training series" && (
        <TrainingSeriesTab history={props.history} user_id={user_id} />
      )}
      {topTab === "messages" && (
        <div>
          <h3>this is temporary until we actually build out this component</h3>
          <NotificationsCard
            Notifications={NotificationsOverview}
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

export default Dashboard;
