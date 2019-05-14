import React, { useState } from "react";
import { connect } from "react-redux";

import { editTrainingSeries } from "store/actions";

import { Typography, TextField, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { styles, TrainingSeriesTitle } from "../styles.js";

function Title(props) {
  const { isEditing, classes } = props;
  const [title, setTitle] = useState(trainingSeries.title);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const trainingSeries = props.trainingSeries.find(
    ts => ts.id === props.match.params.id
  );

  const updateTitle = e => {
    e.preventDefault();
    props.editTrainingSeries(trainingSeries.id, { ...trainingSeries, title });
    isEditingTitle(false);
  };

  return (
    <>
      {isEditing ? (
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
        <TrainingSeriesTitle>
          <Typography variant="headline">
            {`${this.state.singleTrainingSeries.title} \u00A0`}
          </Typography>
          <i
            style={{ fontSize: 25 }}
            className={`material-icons ${classes.icons}`}
            onClick={() => setIsEditingTitle(!isEditingTitle)}
          >
            edit
          </i>
        </TrainingSeriesTitle>
      )}
    </>
  );
}

export default connect(
  null,
  { editTrainingSeries }
)(withStyles(styles)(Title));
