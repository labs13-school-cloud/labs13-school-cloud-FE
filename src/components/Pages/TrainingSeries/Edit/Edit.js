import React from "react";

import Title from "./helpers/Title.js";
import AssignTeamMembers from "components/Pages/TeamMembers/Assign/";
import AssignList from "components/Pages/TeamMembers/List/Assign/";
import Messages from "../Messages/";
import MessagesList from "../List/Messages/";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Divider } from "@material-ui/core/";

import { styles, PageContainer } from "./styles.js";

function Edit(props) {
  const { classes } = props;

  return (
    <PageContainer style={{ position: "relative" }}>
      <InfoPopup
        popOverText={
          <p>
            You're currently on the "Training Series" page. You can start adding
            messages by clicking on "Add Message". Your messages will be tied to
            this series, and whenever you assign a team member to this training
            series, they will receive those messages based on the "days from
            start" value you give each message.
            <br />
            <br />
            Once you've created some messages, feel free to assign a team member
            to this series. Set the date in which you'd like for the team member
            to start receiving the materials, and they will receive scheduled
            notifications based on the messages that you've scheduled for them.
          </p>
        }
      />
      <Paper className={classes.paper}>
        <Title history={props.history} match={props.match} />
        <Divider variant="fullWidth" className={classes.divider} />
        <Messages
          List={MessagesList}
          ts_id={props.match.params.id}
          history={props.history}
        />
      </Paper>
      <AssignTeamMembers
        history={props.history}
        match={props.match}
        user_id={props.user_id}
        List={AssignList}
        ts_id={props.match.params.id}
      />
    </PageContainer>
  );
}

export default withStyles(styles)(Edit);
