import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { editTrainingSeries, getTrainingSeries } from "store/actions";

import { Typography, TextField, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { styles, TrainingSeriesTitle } from "../styles.js";

function Title(props) {
  const { classes, getTrainingSeries: getTSFromProps } = props;

  const trainingSeries =
    props.trainingSeries.find(
      ts => ts.id === parseInt(props.match.params.id, 10)
    ) || {};
  const [title, setTitle] = useState(trainingSeries.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    getTSFromProps();
  }, [getTSFromProps]);

  useEffect(() => {
    setTitle(trainingSeries.title);
  }, [trainingSeries, setTitle]);

  const updateTitle = e => {
    e.preventDefault();
    props.editTrainingSeries(trainingSeries.id, { title });
    setIsEditingTitle(false);
  };

  return (
    <>
      {isEditingTitle ? (
        <form onSubmit={e => updateTitle(e)} autoComplete="off">
          <TrainingSeriesTitle>
            <TextField
              id="standard-name"
              label="Title"
              className={classes.textField}
              value={title}
              onChange={e => setTitle(e.target.value)}
              margin="normal"
            />
            <div>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
              >
                Save
              </Button>
            </div>
          </TrainingSeriesTitle>
        </form>
      ) : (
        <TrainingSeriesTitle onClick={() => setIsEditingTitle(!isEditingTitle)}>
          <Typography variant="headline">{`${title} \u00A0`}</Typography>
          <i
            style={{ fontSize: 25 }}
            className={`material-icons ${classes.icons}`}
          >
            edit
          </i>
        </TrainingSeriesTitle>
      )}
    </>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries
});

export default connect(
  mapStateToProps,
  { editTrainingSeries, getTrainingSeries }
)(withStyles(styles)(Title));
