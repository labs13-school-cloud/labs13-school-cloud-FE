import React, { useState } from "react";

import TeamMembersView from "components/Sections/TeamMembers/TeamMembersView";
import TeamMembersTab from "components/Sections/TeamMembers/TeamMembersTab";
import TrainingSeriesView from "components/Sections/TrainingSeries/TrainingSeriesView";
import TrainingSeriesTab from "components/Sections/TrainingSeries/TrainingSeriesTab.js";
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
  const { user } = props;

  return (
    <DashWrapper>
      <BottomNavigation
        value={topTab}
        onChange={e => setTopTab(e.target.value)}
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
              user={user.id}
            />
            <TrainingSeriesView
              disableSnackbar={props.disableSnackbar}
              user={user.id}
              match={props.match}
            />
          </SmallColumns>
          <NotificationsView user={user.id} />
        </TripleColumn>
      )}

      {topTab === "team members" && (
        <TeamMembersTab history={props.history} user={user.id} />
      )}
      {topTab === "training series" && (
        <TrainingSeriesTab history={props.history} user={user.id} />
      )}
    </DashWrapper>
  );
}

export default Dashboard;
