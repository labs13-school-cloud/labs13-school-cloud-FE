// main page for displaying all team members

import React, { Suspense } from "react";
// import TeamMember from './TeamMember';
import { ListStyles } from "./styles.js";
const TeamMember = React.lazy(() => import("../TeamMember"));

const TeamMembersList = props => {
  const x = props.offset;
  const y = x + props.limit;
  const arr = props.teamMembers.slice(x, y);

  return (
    <>
      <ListStyles>
        {arr.map(member => (
          <Suspense key={member.id} fallback={<span />}>
            <TeamMember
              key={member.id}
              teamMember={member}
              deleteTeamMember={props.deleteTeamMember}
              user_id={props.id}
            />
          </Suspense>
        ))}
      </ListStyles>
    </>
  );
};

export default TeamMembersList;
