import React, { useEffect, useState } from "react";
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
  // Used to update the title and subject for Training Series
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    setTitle(props.activeTrainingSeries.title);
  }, [props.activeTrainingSeries, setTitle]);
  useEffect(() => {
    setSubject(props.activeTrainingSeries.subject);
  }, [props.activeTrainingSeries, setSubject]);

  const updateTrainingSeries = e => {
    e.preventDefault();
    props.editTrainingSeries(props.activeTrainingSeries.id, {
      title,
      subject,
      user_id: props.user_id
    });
    props.history.push("/home");
  };

  console.log(title);
  return (
    <PageContainer style={{ position: "relative" }}>
      <InfoPopup popOverText={<p>Will edit this later....</p>} />
      <Paper className={classes.paper}>
        <FormControl>
          <TextField
            id="standard-name"
            label="Title"
            name="title"
            className={classes.textField}
            onChange={e => setTitle(e.target.value)}
            value={title}
            margin="normal"
          />

          <TextField
            id="standard-name"
            label="Subject"
            name="subject"
            className={classes.textField}
            onChange={e => setSubject(e.target.value)}
            value={subject}
            margin="normal"
          />
        </FormControl>

        <Typography>
          Link to Training Series:
          <Link>{props.activeTrainingSeries.link}</Link>
        </Typography>
        <Typography variant="body1">
          Creator: {props.activeTrainingSeries.name}
        </Typography>

        <Button type="submit" onClick={updateTrainingSeries}>
          Submit
        </Button>
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
