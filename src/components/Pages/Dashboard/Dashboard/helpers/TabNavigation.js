import React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PermIdentity from "@material-ui/icons/PermIdentityOutlined";
import Home from "@material-ui/icons/HomeOutlined";
import QuestionAnswer from "@material-ui/icons/QuestionAnswerOutlined";
import Timeline from "@material-ui/icons/TimelineOutlined";
import ModeComment from "@material-ui/icons/ModeCommentOutlined";

function TabNavigation(props) {
  return (
    <BottomNavigation
      value={props.topTab}
      onChange={(e, value) => {
        props.setTopTab(value);
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
  );
}
export default TabNavigation;
