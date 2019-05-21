import React from "react";

import TrainingBotGIF from "img/trainingBot.gif";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { styles, ButtonContainer, LoadingImage } from "../styles.js";

function AddButtons({ classes, state }) {
  return (
    <ButtonContainer>
      <Button
        disabled={state.isRouting || state.addDisabled}
        variant="contained"
        className={classes.addButton}
        type="submit"
      >
        {state.isRouting ? (
          <LoadingImage src={TrainingBotGIF} alt="Loading Icon" />
        ) : (
          "Add Member"
        )}
      </Button>
      <Button className={classes.button}>Cancel</Button>
    </ButtonContainer>
  );
}

export default withStyles(styles)(AddButtons);
