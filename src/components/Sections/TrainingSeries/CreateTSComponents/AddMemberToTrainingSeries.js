import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getTrainingSeriesMessages,
  getTeamMembers,
  getTrainingSeries
} from "store/actions";

import SingleMemberCheck from "./singleMemberCheck.js";

function AddMemberToTrainingSeries(props) {
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
          return <SingleMemberCheck key={member.id} teamMember={member} />;
        })}
      </div>
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
