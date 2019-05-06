// main page for displaying all team members

import React, { Suspense } from "react";
// import TeamMember from './TeamMember';
import { ListStyles } from "./styles.js";
const TeamMember = React.lazy(() => import("../TeamMember"));


const TeamMembersList = props => {
  let arr = [];
  let offset = props.offset;
  let x = offset;
  let y = offset + props.limit;
  arr = props.teamMembers.slice(x, y);

  return (
    <>
      <ListStyles>
        {arr.map(member => (
          <Suspense key={member.id} fallback={<span />}>
            <TeamMember
              key={member.id}
              teamMember={member}
              deleteTeamMember={props.deleteTeamMember}
              userId={props.id}
            />
          </Suspense>
        ))}
      </ListStyles>
    </>
  );
};

export default TeamMembersList;