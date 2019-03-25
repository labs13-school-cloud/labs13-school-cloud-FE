// main page for displaying all team members

import React from 'react'
import TeamMember from './TeamMember'
import styled from 'styled-components'

const TeamMembersList = (props) => {
  return (
    <ListStyles>
      <TeamMember teamMembers={props.teamMembers} />
    </ListStyles>
  )
}


export default TeamMembersList;


const ListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;
