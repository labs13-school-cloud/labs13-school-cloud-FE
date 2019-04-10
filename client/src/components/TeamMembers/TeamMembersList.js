// main page for displaying all tyarn eam members

import React from 'react';
import TeamMember from './TeamMember';
import styled from 'styled-components';

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
					<TeamMember
						key={member.teamMemberID}
						teamMember={member}
						deleteTeamMember={props.deleteTeamMember}
					/>
				))}
			</ListStyles>
		</>
	);
};

export default TeamMembersList;

const ListStyles = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
