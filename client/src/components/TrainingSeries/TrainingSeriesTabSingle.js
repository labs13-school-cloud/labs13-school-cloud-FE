import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Fab,
  TextField,
  InputAdornment
} from "@material-ui/core/";

export default function TrainingSeriesTabSingle(props) {
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h6">{props.series.title}</Typography>
          <hr />
        </Grid>
        <Grid item xs={6}>
          <Typography style={{ color: "gray" }} variant="caption">
            {props.series.description}
          </Typography>
        </Grid>

        <Grid item xs={6} align="center">
          <Grid item>
            <Typography variant="overline">
              {/* messages: {props.series.posts.length} */}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline">
              {/* assigned: {props.series.teamMembers.length} */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
