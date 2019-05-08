import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Typography } from "@material-ui/core/";
import { Select } from "./TrainingSeriesTabStyles.js";

export default function TrainingSeriesTabSingle(props) {
  const [messageLength, setMessageLength] = useState(0);
  const [assignedLength, setAssignedLength] = useState(0);
  const [assignments, setAssignments] = useState([]);
  const [daysLong, setDaysLong] = useState([]);
  const {
    series: { id }
  } = props;

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}/api/training-series/${id}`;

    axios
      .get(`${url}/messages`)
      .then(res => {
        setMessageLength(res.data.messages.length);
        const longestDaysFromStart = res.data.messages.sort(
          (a, b) => b.days_from_start - a.days_from_start
        );
        setDaysLong(longestDaysFromStart[0].days_from_start);
      })
      .catch(err => setMessageLength(err));

    axios
      .get(`${url}/assignments`)
      .then(res => {
        setAssignedLength(res.data.assignments.length);
        setAssignments(res.data.assignments);
      })
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h6">{props.series.title}</Typography>
          <hr />
        </Grid>
        <Grid item xs={8}>
          <p style={{ marginTop: 0 }}>This training series is assigned to:</p>
          <Select
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <option value="default">default</option>
            <option value="remove me">
              once backend is up, finish this!!!
            </option>
            {assignments.map(assignment => {
              console.log(assignment);
            })}
          </Select>
          <p>
            and is <span style={{ color: "blue" }}>{daysLong}</span> days long.
          </p>
        </Grid>

        <Grid item xs={4} align="center">
          <Grid item>
            <Typography variant="overline">
              messages: {messageLength}
            </Typography>
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
