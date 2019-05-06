import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core/";

export default function TrainingSeriesTabSingle(props) {
  const [postLength, setPostLength] = useState(0);
  const [assignedLength, setAssignedLength] = useState(0);
  const {
    series: { id }
  } = props;

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}/api/training-series/${id}`;
    async function getTrainingSeriesMessages() {
      try {
        const { data } = await axios.get(`${url}/messages`);
        setPostLength(data.posts.length);
      } catch (err) {
        console.log(err);
      }
    }
    async function getTrainingSeriesAssignments() {
      try {
        const { data } = axios.get(`${url}/assignments`);
        setAssignedLength(data.assignments.length);
      } catch (err) {
        console.log(err);
      }
    }
    getTrainingSeriesMessages();
    getTrainingSeriesAssignments();
  }, [id]);

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
