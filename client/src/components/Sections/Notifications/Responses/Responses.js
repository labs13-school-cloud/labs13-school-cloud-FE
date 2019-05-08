import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import SettingsCell from "@material-ui/icons/SettingsCell";
import Email from "@material-ui/icons/Email";

import SlackLogo from "img/slacklogo.jpg";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function Responses(props) {
  const { classes } = props;

  const [service, setService] = useState("");

  useEffect(() => {
    console.log(props);
  }, []);

  const ReturnCorrectSrviceLogo = service => {
    if (service === "slack") {
      return <img style={{ width: "30px", height: "auto" }} src={SlackLogo} />;
    } else if (service === "SMS") {
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
            <option value="SMS">SMS</option>
            <option value="email">email</option>
          </select>
        </div>
      </HeaderWrapper>

      <ResponsesWrapper>
        {fakeResponses
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
                    responded to your message via {response.service}{" "}
                    {ReturnCorrectSrviceLogo(response.service)}
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
          })}
      </ResponsesWrapper>
    </MainWrapper>
  );
}

const mapStateToProps = state => {
  return {
    teamMembers: state.teamMembersReducer.teamMembers,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    notifications: state.notificationsReducer
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    {}
  )(Responses)
);

const fakeResponses = [
  {
    id: 1,
    first_name: "Tom",
    last_name: "Hessburg",
    team_member_id: 1,
    response: "This is some fake response text from slack...",
    service: "slack",
    created_at: "Aug 25th"
  },
  {
    id: 2,
    first_name: "Fake A.",
    last_name: "Person",
    team_member_id: 2,
    response: "This is some fake response text from SMS...",
    service: "SMS",
    created_at: "Aug 25th"
  },
  {
    id: 3,
    first_name: "Ima",
    last_name: "Nerd",
    team_member_id: 3,
    response: "This is some fake response text from email...",
    service: "email",
    created_at: "Aug 25th"
  }
];

const ResponsesWrapper = styled.div`
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const MainWrapper = styled(Paper)`
  margin: 48px auto;
  padding: 10px;
  width: 90%;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 10px;
  border-bottom: 1px solid gray;
  @media (max-width: 700px) {
    justify-content: space-between;
  }
  h2 {
    text-decoration: underline;
    margin: 0 40px 0 10px;
    @media (max-width: 700px) {
      margin: 0 20px 0 10px;
    }
  }
  select {
    width: 125px;
    margin-left: 10px;
    height: 25px;
    border: 1px solid black;
  }
  div {
    display: flex;
    align-items: center;
    @media (max-width: 700px) {
      flex-direction: column;
    }
  }
`;
