import React, { useEffect } from "react";
import { connect } from "react-redux";
import Title from "./helpers/Title.js";
import Messages from "../Messages/";
import MessagesList from "../List/Messages/";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";
import { getTrainingSeriesID, editTrainingSeries } from "store/actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Divider,
  Typography,
  TextField,
  Link,
  Button,
  FormControl
} from "@material-ui/core/";

import { styles, PageContainer } from "./styles.js";

function Edit(props) {
  useEffect(() => {
    props.getTrainingSeriesID(props.match.params.id);
  }, [getTrainingSeriesID]);
  const { classes } = props;

  const updateTrainingSeries = e => {
    e.preventDefault();
    props.editTrainingSeries(props.activeTrainingSeries);
    props.history.push("/home");
  };

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
      <Paper className={classes.paper}>
        <FormControl>
          <TextField
            id="standard-name"
            label="Title"
            className={classes.textField}
            value={props.activeTrainingSeries.title}
            margin="normal"
          />

          <TextField
            id="standard-name"
            label="Subject"
            className={classes.textField}
            value={props.activeTrainingSeries.subject}
            margin="normal"
          />
        </FormControl>

        <Typography>
          Link to Training Series:
          <Link>{props.activeTrainingSeries.link}</Link>
        </Typography>
        <Typography variant="body1">
          Creator: {props.activeTrainingSeries.first_name} {""}
          {props.activeTrainingSeries.last_name}
        </Typography>

        <Button onClick={e => updateTrainingSeries}>Submit</Button>
      </Paper>
    </PageContainer>
  );
}
const mapStateToProps = state => ({
  activeTrainingSeries: state.trainingSeriesReducer.activeTrainingSeries
});

export default connect(
  mapStateToProps,
  { getTrainingSeriesID, editTrainingSeries }
)(withStyles(styles)(Edit));
