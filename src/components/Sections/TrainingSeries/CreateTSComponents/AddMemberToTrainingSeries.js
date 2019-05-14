import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import SingleMemberCheck from "./singleMemberCheck.js";
import {
  getTeamMembers,
  getTrainingSeries,
  addNotification
} from "store/actions";

function AddMemberToTrainingSeries(props) {
  const [activeMembers, setActiveMembers] = useState([]); //an array of all IDS of members being added to a series
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));

  // Abstracting to remove useEffect dependency warnings
  const { getTeamMembers, getTrainingSeries, match, user_id } = props;
  const {
    params: { id }
  } = match;

  const addMember = member_id => {
    //this function is passed down to the single members. on check, it sets or removes their id from activeMembers.
    let newMembers = [...activeMembers];
    if (newMembers.includes(member_id)) {
      let index = newMembers.indexOf(member_id);
      newMembers.splice(index, 1);
    } else {
      newMembers.push(member_id);
    }
    setActiveMembers(newMembers);
  };

  useEffect(() => {
    getTeamMembers(user_id);
    getTrainingSeries(id);
  }, [getTeamMembers, getTrainingSeries, user_id, id]);

  return (
    <Wrapper>
      <h1>
        {props.trainingSeries.length &&
          props.trainingSeries.filter(
            series => parseInt(series.id) === parseInt(props.match.params.id)
          )[0].title}
      </h1>
      <p>
        Employee's will be sent {props.messages.length} message(s) throughout
        this training series.
      </p>
      <div>
        {props.teamMembers.map(member => {
          return (
            <SingleMemberCheck
              addMember={addMember}
              key={member.id}
              teamMember={member}
            />
          );
        })}
      </div>
      <form noValidate>
        <TextField
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
      </form>
      <Button
        style={{ margin: "15px" }}
        variant="contained"
        color="primary"
        type="submit"
        onClick={e => {
          e.preventDefault();
          activeMembers.forEach(memberID => {
            props.messages.forEach(msg => {
              //find member who has memberID and check what services they have avaible to thgem
              const memberServices = props.teamMembers.filter(
                mem => mem.id === memberID
              );
              const newNotification = {
                team_member_id: memberID,
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
              props.addNotification(newNotification);
            });
          });
          props.history.push(`/home/training-series/${props.match.params.id}`);
        }}
      >
        submit
      </Button>
    </Wrapper>
  );
}

const mapStateToProps = state => {
  return {
    messages: state.trainingSeriesReducer.messages,
    teamMembers: state.teamMembersReducer.teamMembers,
    trainingSeries: state.trainingSeriesReducer.trainingSeries
  };
};

export default connect(
  mapStateToProps,
  {
    getTeamMembers,
    getTrainingSeries,
    addNotification
  }
)(AddMemberToTrainingSeries);

const Wrapper = styled(Paper)`
  margin: auto;
  padding: 10px;
  width: 80%;
  max-width: 1000px;
`;
