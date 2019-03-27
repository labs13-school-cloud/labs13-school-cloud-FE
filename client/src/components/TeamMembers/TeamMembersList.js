// main page for displaying all team members

import React from "react";
import TeamMember from "./TeamMember";
import styled from "styled-components";

const TeamMembersList = props => {
  const { teamMembers } = props;

  // map through member list on props
  const membersList = teamMembers.map(member => {
    return <TeamMember key={member.teamMemberID} teamMember={member} />;
  });

  return <ListStyles>{membersList}</ListStyles>;
};

export default TeamMembersList;

const ListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
