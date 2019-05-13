import React from "react";

function Relationships({ state, dispatch, teamMembers }) {
  const updateRelationship = (relationship, id) => {
    const type = `UPDATE_${relationship}`;
    const key = `${relationship}_id`;

    const person = teamMembers.find(
      member => parseInt(member.id, 10) === parseInt(id, 10)
    );
    dispatch({ type: "UPDATE_MEMBER", key, payload: id });
    dispatch({ type, payload: `${person.first_name} ${person.last_name}` });
  };
  return (
    <>
      <div className="mentor display">Select Mentor:</div>
      <div className="mentor select">
        <select
          value={state.teamMember.mentor_id}
          onChange={e => updateRelationship("mentor", e.target.value)}
        >
          <option value="">None</option>
          {teamMembers
            .filter(member => {
              return (
                member.id !== state.teamMember.mentor_id &&
                member.id !== state.teamMember.manager_id
              );
            })
            .map(member => (
              <option key={member.id} value={member.id}>
                {member.first_name} {member.last_name}
              </option>
            ))}
        </select>
      </div>

      <div className="manager display">Select Manager:</div>
      <div className="manager select">
        <select
          value={state.teamMember.manager_id}
          onChange={e => updateRelationship("manager", e.target.value)}
        >
          <option value="">None</option>
          {teamMembers
            .filter(
              member =>
                member.id !== state.teamMember.mentor_id &&
                member.id !== state.teamMember.manager_id
            )
            .map(member => (
              <option key={member.id} value={member.id}>
                {member.first_name} {member.last_name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
}

export default Relationships;
