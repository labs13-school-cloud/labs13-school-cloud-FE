import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getNotifications } from "store/actions/";

import TeamMembersView from "components/Sections/TeamMembers/TeamMembersView";
import TeamMembersTab from "components/Sections/TeamMembers/TeamMembersTab";
import TrainingSeriesView from "components/Sections/TrainingSeries/DashTSComponents/TrainingSeriesView";
import TrainingSeriesTab from "components/Sections/TrainingSeries/TabTSComponents/TrainingSeriesTab.js";
import NotificationsView from "components/Sections/Notifications/NotificationsView";
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
  const { userId } = props;
  const get_Notifications = props.getNotifications;

  useEffect(() => {
    get_Notifications();
  }, [get_Notifications]);

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
              userId={userId}
            />
            <TrainingSeriesView
              disableSnackbar={props.disableSnackbar}
              userId={userId}
              match={props.match}
            />
          </SmallColumns>
          <NotificationsView userId={userId} />
        </TripleColumn>
      )}

      {topTab === "team members" && (
        <TeamMembersTab history={props.history} userId={userId} />
      )}
      {topTab === "training series" && (
        <TrainingSeriesTab history={props.history} userId={userId} />
      )}
      {topTab === "messages" && (
        <div>
          <h3>this is temporary until we actually build out this component</h3>
          <NotificationsView history={props.history} userId={userId} />
        </div>
      )}
      {topTab === "responses" && (
        <Responses history={props.history} userId={userId} />
      )}
    </DashWrapper>
  );
}

export default connect(
  null,
  getNotifications
)(Dashboard);
