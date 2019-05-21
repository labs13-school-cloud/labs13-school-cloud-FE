import React, { useState, useEffect } from "react";
import axios from "axios";

import { Grid, Typography } from "@material-ui/core/";
import { Select } from "./TrainingSeriesTabStyles.js";
import Button from "@material-ui/core/Button";

function TrainingSeriesTabSingle(props) {
  const [messages, setMessages] = useState([]);
  const [daysLong, setDaysLong] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const {
    series: { id }
  } = props;

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}/api/training-series/${id}`;

    axios
      .get(`${url}/messages`)
      .then(res => {
        setMessages(res.data.messages);
        if (res.data.messages.length) {
          const longestDaysFromStart = res.data.messages.sort(
            (a, b) => b.days_from_start - a.days_from_start
          );
          setDaysLong(longestDaysFromStart[0].days_from_start);
          setSelectedId(res.data.messages[0].id);
        }
      })
      .catch(err => setMessages(err));
  }, [id]);

  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Typography variant="h6">{props.series.title}</Typography>
          <hr />
        </Grid>

        {messages.length ? (
          <>
            <Grid item xs={8}>
              <p style={{ marginTop: 0 }}>
                This training series includes messages:
              </p>

              <Select
                onChange={e => {
                  setSelectedId(parseInt(e.target.value));
                }}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                {messages.map(m => {
                  return (
                    <option key={m.id} value={m.id}>
                      {m.subject}
                    </option>
                  );
                })}
              </Select>
              <Button
                style={{ margin: "15px" }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={e => {
                  e.stopPropagation();
                  props.history.push(`/home/message/${selectedId}`);
                }}
              >
                Go to Message
              </Button>

              <p>
                and is <span style={{ color: "blue" }}>{daysLong}</span>{" "}
                {daysLong > 1 ? "days " : "day "}
                long.
              </p>
            </Grid>

            <Grid item xs={4} align="center">
              <Grid item>
                <Typography variant="overline">
                  messages: {messages.length}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} align="center">
            <p>
              This training series doesn't have any messages yet. Click on it to
              add its first message.
            </p>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default TrainingSeriesTabSingle;
