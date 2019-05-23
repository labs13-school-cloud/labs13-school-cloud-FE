// main page for displaying list of all training series
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  getTrainingSeries,
  getAllMessages,
  deleteTrainingSeries
} from "store/actions";
//import DeleteModal from "components/UI/Modals/deleteModal";
import history from "history.js";

import { Grid, Typography } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { Select, Wrapper, styles } from "./styles.js";

function Tab({
  getFiltered,
  getTrainingSeries,
  getAllMessages,
  trainingSeries,
  messages,
  classes
}) {
  useEffect(() => {
    getTrainingSeries();
    getAllMessages();
  }, [getTrainingSeries, getAllMessages]);

  const [selectedId, setSelectedId] = useState(0);

  return (
    <>
      {getFiltered(trainingSeries).map(({ id, title }) => {
        const tsMessages = messages.filter(msg => {
          return msg.training_series_id === id;
        });
        const daysLong = Math.max(...tsMessages.map(m => m.days_from_start));

        return (
          <Wrapper key={`container_${id}`}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant="h6">{title}</Typography>
                <hr />
              </Grid>

              {tsMessages.length ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 10px",
                    width: "100%"
                  }}
                >
                  <Grid className={classes.messages} item xs={8}>
                    <p className={classes.msgText}>Messages:</p>

                    <Select
                      onChange={e => {
                        setSelectedId(parseInt(e.target.value));
                      }}
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      {tsMessages.map(m => {
                        return (
                          <option key={`message_${m.id}`} value={m.id}>
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
                        history.push(`/home/message/${selectedId}`);
                      }}
                    >
                      Go to Message
                    </Button>
                  </Grid>

                  <Grid item xs={4} align="right" className={classes.stats}>
                    <Grid item>
                      <Typography variant="overline">
                        Messages: {tsMessages.length}
                      </Typography>

                      <Typography variant="overline">
                        Duration: {daysLong}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <Grid item xs={12} align="center">
                  <p>
                    This training series doesn't have any messages yet. Click on
                    it to add its first message.
                  </p>
                </Grid>
              )}
            </Grid>
          </Wrapper>
        );
      })}
    </>
  );
}

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries,
  notifications: state.notificationsReducer.notifications,
  messages: state.messagesReducer.messages
});

export default connect(
  mapStateToProps,
  { getTrainingSeries, getAllMessages, deleteTrainingSeries }
)(withStyles(styles)(Tab));
