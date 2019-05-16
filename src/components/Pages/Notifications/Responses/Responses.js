import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SettingsCell from "@material-ui/icons/SettingsCell";
import Email from "@material-ui/icons/Email";

import SlackLogo from "img/slacklogo.jpg";

import {
  styles,
  ResponsesWrapper,
  MainWrapper,
  HeaderWrapper
} from "./styles.js";

function Responses(props) {
  const { classes } = props;
  const [service, setService] = useState("");
  const [allResponses, setAllResponses] = useState([]);

  const { notifications } = props;

  useEffect(() => {
    //gets a list of ALLLL responses based on notifications
    notifications.notifications.map(async notification => {
      console.log("blah");
      // Promise.all?
      const url = `${process.env.REACT_APP_API}/api/notifications/${
        notification.id
      }/responses`;
      const notificationResponses = await axios.get(url);

      const newResponses = [
        ...allResponses,
        ...notificationResponses.data.responses
      ];
      setAllResponses(newResponses);
    });
  }, [notifications]); //including "allResponses" as the console suggests makes this run infinitely...

  const ReturnCorrectServiceLogo = service => {
    if (service === "slack") {
      return (
        <img
          alt="Slack logo"
          style={{ width: "30px", height: "auto" }}
          src={SlackLogo}
        />
      );
    } else if (service === "twillo") {
      return <SettingsCell />;
    } else {
      return <Email />;
    }
  };

  return (
    <MainWrapper>
      <HeaderWrapper>
        <h2>Your Message Responses</h2>
        <div>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            filter by:
          </Typography>
          <select
            onChange={e => {
              setService(e.target.value);
            }}
          >
            <option value="">all</option>
            <option value="slack">slack</option>
            <option value="twillo">text</option>
            <option value="sendgrid">email</option>
          </select>
        </div>
      </HeaderWrapper>

      <ResponsesWrapper>
        {allResponses.length === 0 ? (
          <div style={{ color: "rgba(0,0,0,0.4)" }}>
            Sorry, no responses available!
          </div>
        ) : (
          allResponses
            .filter(response => response.service.includes(service))
            .map(response => {
              return (
                <Card
                  style={{ margin: "10px" }}
                  key={response.id}
                  className={classes.card}
                >
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {response.first_name} {response.last_name}
                    </Typography>

                    <Typography className={classes.pos} color="textSecondary">
                      responded to your message via{" "}
                      {response.service === "slack"
                        ? "slack"
                        : response.service === "sendgrid"
                        ? "email"
                        : "text"}{" "}
                      {ReturnCorrectServiceLogo(response.service)}
                    </Typography>
                    <Typography component="p">
                      {response.response}
                      <br />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={e => {
                        props.history.push(
                          `/home/team-member/${response.team_member_id}`
                        );
                      }}
                    >
                      See Team Memeber
                    </Button>
                  </CardActions>
                </Card>
              );
            })
        )}
      </ResponsesWrapper>
    </MainWrapper>
  );
}

const mapStateToProps = state => {
  return {
    teamMembers: state.teamMembersReducer.teamMembers,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    notifications: state.notificationsReducer,
    responses: state.responsesReducer.responses
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(Responses)
);
