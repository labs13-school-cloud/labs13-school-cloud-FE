import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Typography } from "@material-ui/core/";
import { Select } from "./TrainingSeriesTabStyles.js";

function TrainingSeriesTabSingle(props) {
  const [messageLength, setMessageLength] = useState(0);
  const [messageNames, setMessageNames] = useState([]);

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

        let namesArray = [];
        res.data.messages.forEach(msg => {
          namesArray.push(msg.subject);
        });
        setMessageNames(namesArray);
      })
      .catch(err => setMessageLength(err));
  }, [id]);

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h6">{props.series.title}</Typography>
          <hr />
        </Grid>
        <Grid item xs={8}>
          <p style={{ marginTop: 0 }}>
            This training series includes messages:
          </p>

          <Select
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {messageNames.map((name, i) => {
              return (
                <option key={i} value={name}>
                  {name}
                </option>
              );
            })}
          </Select>
          <p>
            and is <span style={{ color: "blue" }}>{daysLong}</span> day(s)
            long.
          </p>
        </Grid>

        <Grid item xs={4} align="center">
          <Grid item>
            <Typography variant="overline">
              messages: {messageLength}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default TrainingSeriesTabSingle;
