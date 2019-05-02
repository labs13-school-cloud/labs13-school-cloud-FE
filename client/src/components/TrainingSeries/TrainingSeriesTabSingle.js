import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core/";

export default function TrainingSeriesTabSingle(props) {
  const [postLength, setPostLength] = useState(0);
  const [assignedLength, setAssignedLength] = useState(0);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API}/api/training-series/${
          props.series.id
        }/messages`
      )
      .then(res => {
        setPostLength(res.data.posts.length);
      })
      .catch(err => {
        //console.log(err);
      });
    axios
      .get(
        `${process.env.REACT_APP_API}/api/training-series/${
          props.series.id
        }/assignments`
      )
      .then(res => {
        console.log(res.data.assignments);
        setAssignedLength(res.data.assignments.length);
      })
      .catch(err => {
        //console.log(err);
      });
  }, []);
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
            <Typography variant="overline">messages: {postLength}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="overline">
              assigned: {assignedLength}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
