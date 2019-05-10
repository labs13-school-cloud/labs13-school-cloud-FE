import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getTrainingSeriesMessages,
  getTeamMembers,
  getTrainingSeries
} from "store/actions";

import SingleMemberCheck from "./singleMemberCheck.js";

function AddMemberToTrainingSeries(props) {
  const [activeMembers, setActiveMembers] = useState([]); //an array of all IDS of members being added to a series

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
    console.log(props);
    props.getTrainingSeriesMessages(props.match.params.id);
    props.getTeamMembers(props.userId);
    props.getTrainingSeries(props.match.params.id);
  }, []);

  return (
    <div>
      <h1>
        {props.trainingSeries.length &&
          props.trainingSeries.filter(
            series => parseInt(series.id) === parseInt(props.match.params.id)
          )[0].title}
      </h1>
      <p>
        Employee's will be sent {props.messages.length} messages throughout this
        trainign series.
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
      {activeMembers.map(mem => (
        <div>{mem}</div>
      ))}
    </div>
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
  { getTrainingSeriesMessages, getTeamMembers, getTrainingSeries }
)(AddMemberToTrainingSeries);
