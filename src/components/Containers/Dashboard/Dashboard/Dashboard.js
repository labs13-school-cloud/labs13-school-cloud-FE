import React, { useState } from "react";

import TeamMembersView from "components/Sections/TeamMembers/TeamMembersView";
import TeamMembersTab from "components/Sections/TeamMembers/TeamMembersTab";
import TrainingSeriesView from "components/Sections/TrainingSeries/DashTSComponents/TrainingSeriesView";
import TrainingSeriesTab from "components/Sections/TrainingSeries/TabTSComponents/TrainingSeriesTab.js";
import NotificationsContainer from "components/Sections/Notifications/Container";
import NotificationsOverview from "components/Sections/Notifications/Notification/Overview";
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
            <TeamMembersView
              disableSnackbar={props.disableSnackbar}
              user_id={user_id}
            />
            <TrainingSeriesView
              disableSnackbar={props.disableSnackbar}
              user_id={user_id}
              match={props.match}
            />
          </SmallColumns>
          <NotificationsContainer
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
          <NotificationsContainer
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
