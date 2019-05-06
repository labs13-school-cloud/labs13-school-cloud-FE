import React, { useState } from "react";

import TeamMembersView from "components/Sections/TeamMembers/TeamMembersView";
import TeamMembersTab from "components/Sections/TeamMembers/TeamMembersTab";
import TrainingSeriesView from "components/Sections/TrainingSeries/DashTSComponents/TrainingSeriesView";
import TrainingSeriesTab from "components/Sections/TrainingSeries/TabTSComponents/TrainingSeriesTab.js";
import NotificationsView from "components/Sections/Notifications/NotificationsView";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PermIdentity from "@material-ui/icons/PermIdentityOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswerOutlined";
import Timeline from "@material-ui/icons/TimelineOutlined";

import { TripleColumn, SmallColumns, DashWrapper } from "./styles.js";

function Dashboard(props) {
  const [topTab, setTopTab] = useState("overview");
  const { userId } = props;

  return (
    <DashWrapper>
      <BottomNavigation
        value={topTab}
        onChange={(e, value) => {
          console.log(e.target.value);
          setTopTab(value);
        }}
        style={{ width: "80%" }}
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
      </BottomNavigation>

      {topTab === "overview" && (
        <TripleColumn>
          <SmallColumns>
            <TeamMembersView
              disableSnackbar={props.disableSnackbar}
              userId={userId}
            />
            <TrainingSeriesView
              disableSnackbar={props.disableSnackbar}
              userId={userId}
              match={props.match}
            />
          </SmallColumns>
          <NotificationsView user={userId} />
        </TripleColumn>
      )}

      {topTab === "team members" && (
        <TeamMembersTab history={props.history} userId={userId} />
      )}
      {topTab === "training series" && (
        <TrainingSeriesTab history={props.history} userId={userId} />
      )}
    </DashWrapper>
  );
}

export default Dashboard;
