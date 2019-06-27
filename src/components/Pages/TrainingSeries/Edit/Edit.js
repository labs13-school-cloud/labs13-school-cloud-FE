import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import InfoPopup from "components/UI/InfoPopup/InfoPopup.js";
import { getTrainingSeriesID, editTrainingSeries } from "store/actions";
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  TextField,
  Link,
  Button,
  FormControl
} from "@material-ui/core/";

import { styles, PageContainer } from "./styles.js";

function Edit(props) {
  const { getTrainingSeriesID, activeTrainingSeries } = props;  
  useEffect(() => {
    getTrainingSeriesID(props.match.params.id);
  }, [getTrainingSeriesID]);
  const { classes } = props;
  // Used to update the title and subject for Training Series
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  // Sets the current title and subject so that they can be changed
  useEffect(() => {
    setTitle(activeTrainingSeries.title);
  }, [activeTrainingSeries, setTitle]);
  useEffect(() => {
    setSubject(activeTrainingSeries.subject);
  }, [activeTrainingSeries, setSubject]);

  const updateTrainingSeries = e => {
    e.preventDefault();
    props.editTrainingSeries(activeTrainingSeries.id, {
      title,
      subject,
      user_id: props.user_id
    });
    props.history.push("/home");
  };
  const { link, name } = activeTrainingSeries;
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

        <Typography style={{ marginBottom: ".5rem" }}>
          Link to Training Series:
          <Link to={link}> Training Link</Link>
        </Typography>
        <Typography variant="body1" style={{ marginBottom: ".5rem" }}>Creator: {name}</Typography>

        <Button
          type="submit"
          onClick={updateTrainingSeries}
          className={props.classes.button}
        >
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
