import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getTrainingSeriesID } from "store/actions";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Divider, Typography } from "@material-ui/core/";

import { styles, PageContainer } from "./styles.js";

function SingleTrainingSeries({ props }) {
  console.log(props);
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
      <Paper>
        <Typography>{props.title}</Typography>
      </Paper>
    </PageContainer>
  );
}
const mapStateToProps = state => ({
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries
});

export default connect(
  mapStateToProps,
  { getTrainingSeriesID }
)(withStyles(styles)(SingleTrainingSeries));
