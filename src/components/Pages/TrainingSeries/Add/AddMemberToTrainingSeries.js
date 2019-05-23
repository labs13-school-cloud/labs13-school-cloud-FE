import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import SingleMemberCheck from "./singleMemberCheck.js";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { styles, Wrapper } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
import {
  getTeamMembers,
  getTrainingSeries,
  addNotification,
  getAllMessages
} from "store/actions";

function AddMemberToTrainingSeries(props) {
  const [activeMembers, setActiveMembers] = useState([]); //an array of all IDS of members being added to a series
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [memberComMethods, setMemberComMethods] = useState([]); //an array of object containing members firat name and last nam, pluswhich communication method is selected

  // Destructuring to remove useEffect dependency warnings
  const {
    getTeamMembers,
    getTrainingSeries,
    getAllMessages,
    match,
    user_id,
    classes
  } = props;
  const { params } = match;
  const { id } = params;

  const getNewNotification = (recipient_id, msg, team_member_id) => {
    const memberServices = props.teamMembers.filter(
      tm => tm.id === recipient_id
    );
    return {
      recipient_id,
      team_member_id,
      service_id: memberServices[0].phone_number
        ? 1
        : memberServices[0].email
        ? 2
        : 3,
      message_id: msg.id,
      num_attempts: 0,
      is_sent: false,
      send_date: moment(startDate)
        .add(msg.days_from_start, "days")
        .toISOString()
    };
  };

  const addMember = member_id => {
    //this function is passed down to the single members. on check, it sets or removes their + mentors/managers ids from activeMembers.
    let newMembers = [...activeMembers];
    if (newMembers.includes(member_id)) {
      const index = newMembers.indexOf(member_id);
      newMembers.splice(index, 1);
    } else {
      newMembers.push(member_id);
    }
    setActiveMembers(newMembers);
  };

  useEffect(() => {
    getTeamMembers(user_id);
    getTrainingSeries(id);
    getAllMessages();
  }, [getTeamMembers, getTrainingSeries, getAllMessages, user_id, id]);

  const handelAddComMethod = (id, method) => {
    const memberMethod = { id, method }; //create an object for the team member and their preferred method of communication.

    const workArray = [...memberComMethods]; //take our current array of members and communications and spread it into a new array so we can work on it.

    workArray.forEach((mem, i) => {
      //map over that array and check if the member being added already exists in our array. if so, delete their original preferred item from the list;
      if (mem.id === memberMethod.id) {
        workArray.splice(i, 1);
      }
    });

    setMemberComMethods([...workArray, memberMethod]); //add member to list
  };

  const handleSubmit = e => {
    e.preventDefault();

    const currentTrainingSeries = props.trainingSeries.find(
      series => parseInt(series.id) === parseInt(props.match.params.id)
    );

    if (!activeMembers.length) return;
    const newNotifications = [];
    let roles = getRoles(props.messages[0]);
    activeMembers.forEach(idSet => {
      props.messages
        .filter(msg => msg.training_series_id === currentTrainingSeries.id)
        .forEach(msg => {
          //need to filter through these messages to make sure they're a part of this training series
          //find member who has memberID and check what services they have available to them
          roles.forEach(role => {
            if (msg[`for_${role}`] && idSet[role]) {
              newNotifications.push(
                getNewNotification(idSet[role], msg, idSet.team_member)
              );
            }
          });
        });
    });
    newNotifications.forEach(n => {
      memberComMethods.forEach(member => {
        //this looks at the communication methods set by clicking on the radio buttons.
        //it then assigns which type of notification should be sent out based on what you clicked.
        //if you forgot to click anything, it defaults to SMS.
        if (n.team_member_id === member.id) {
          n.service_id = member.method;
        }
      });
      props.addNotification(n);
    });
    props.history.push(`/home/training-series/${props.match.params.id}`);
  };

  //grabs list of all tmIDs currently assigned to TS (they have a notification assigned to them and this TS)
  const filteredMemberIds = props.notifications
    .filter(n => n.training_series_id === parseInt(props.match.params.id))
    .map(n => n.team_member_id);
  const unassignedMembers = props.teamMembers.filter(
    m => !filteredMemberIds.includes(m.id)
  );

  const messagesNumber = props.messages.filter(
    m =>
      m.training_series_id === parseInt(props.match.params.id) &&
      m.for_team_member
  ).length;
  return (
    <Wrapper>
      <div className={classes.headerText}>
        <Typography variant="title" gutterBottom>
          {props.trainingSeries.length &&
            props.trainingSeries.find(
              series => parseInt(series.id) === parseInt(props.match.params.id)
            ).title}
        </Typography>
        <Typography variant="subtitle1">
          Message Count: {messagesNumber}
        </Typography>
      </div>
      <div>
        {unassignedMembers.map(member => {
          return (
            <SingleMemberCheck
              addMember={addMember}
              key={member.id}
              teamMember={member}
              handelAddComMethod={handelAddComMethod}
            />
          );
        })}
      </div>
      {unassignedMembers.length ? (
        <div className={classes.footer}>
          <TextField
            style={{ maxWidth: 210, marginBottom: 20 }}
            id="date"
            label="Start Date"
            type="date"
            defaultValue={moment().format("YYYY-MM-DD")}
            InputLabelProps={{
              shrink: true
            }}
            onChange={e => {
              setStartDate(e.target.value); //gives a text version of date in YYY-MM-DD
            }}
          />
          <div style={{ minWidth: 208 }}>
            <Button
              style={{ margin: 10 }}
              variant="contained"
              color="primary"
              type="submit"
              onClick={e => handleSubmit(e)}
            >
              submit
            </Button>
            <Button
              style={{ margin: 10 }}
              variant="contained"
              color="default"
              type="submit"
              onClick={e =>
                props.history.push(
                  `/home/training-series/${props.match.params.id}`
                )
              }
            >
              cancel
            </Button>
          </div>
        </div>
      ) : (
        <p>
          All your available team members are already assigned to this training
          series, either click Cancel to return or{" "}
          <Link to="/home/create-team-member">click here</Link> to create more
          team members.
        </p>
      )}
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    messages: state.messagesReducer.messages,
    teamMembers: state.teamMembersReducer.teamMembers,
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    notifications: state.notificationsReducer.notifications
  };
};

export default connect(
  mapStateToProps,
  {
    getTeamMembers,
    getTrainingSeries,
    addNotification,
    getAllMessages
  }
)(withStyles(styles)(AddMemberToTrainingSeries));

function getRoles(msg) {
  // No, this isn't necessary for 3 roles. But this will scale better if more roles are added
  const roles = [];
  for (let prop in msg) {
    if (prop.substring(0, 4) === "for_") {
      roles.push(prop.substring(4));
    }
  }
  return roles;
}
