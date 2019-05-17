import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";

import TeamMembersTabSingle from "./TeamMembersTabSingle.js";

import {
  Paper,
  Fab,
  TextField,
  InputAdornment,
  Typography
} from "@material-ui/core/";

//functional related imports

//fetches team members, likely dont need this here, likely wont need this here but may potentially
//adds team member, likely wont need this here but may potentially
//deleteTeamMembers team member by ID, propbably going to be the only actual functionallity displayed firectly on this page.

import { getTeamMembers, addTeamMember, deleteTeamMember } from "store/actions";

const TeamMembersTab = props => {
  const [searchValue, setSearchValue] = useState("");
  const [localTeamMembers, setLocalTeamMembers] = useState([]);
  const [limit] = useState(8);
  const [offset, setOffset] = useState(0);
  const { getTeamMembers, user_id, teamMembers } = props;

  useEffect(() => {
    getTeamMembers(user_id);
    setLocalTeamMembers(teamMembers);
  }, [getTeamMembers, user_id, teamMembers]);

  const handleClick = offset => {
    setOffset(offset);
  };

  return (
    <div style={{ width: "90%" }}>
      <TeamsTabWrapper>
        <TeamsTabHeader>
          <div>
            <Typography variant="h6">Team Members</Typography>
            <Fab
              size="small"
              aria-label="Add"
              onClick={() => {
                props.history.push("/home/create-team-member");
              }}
              style={{
                margin: "0 10px",
                background: "#451476",
                color: "white"
              }}
            >
              <i className="material-icons">add</i>
            </Fab>
          </div>
          <TextField
            value={searchValue}
            onChange={e => {
              setSearchValue(e.target.value);
            }}
            id="standard-search"
            type="search"
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <i className="material-icons">search</i>
                </InputAdornment>
              )
            }}
          />
        </TeamsTabHeader>

        <Pagination
          limit={limit}
          reduced={true}
          offset={offset}
          total={props.teamMembers.length}
          centerRipple={true}
          onClick={(e, offset) => handleClick(offset)}
        />
        <Grid container justify="center">
          {localTeamMembers.length === 0 ? (
            <div>add some members</div>
          ) : (
            props.teamMembers
              .slice(offset, offset + limit)
              .filter(member =>
                `${member.first_name} ${member.last_name}`
                  .toUpperCase()
                  .includes(searchValue.toUpperCase())
              )
              .map(teamMember => {
                return (
                  <TeamMembersTabSingle
                    deleteTeamMember={props.deleteTeamMember}
                    teamMember={teamMember}
                    history={props.history}
                    key={teamMember.id}
                  />
                );
              })
          )}
        </Grid>
      </TeamsTabWrapper>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    teamMembers: state.teamMembersReducer.teamMembers,
    teamMember: state.teamMembersReducer.teamMember,
    status: state.status
  };
};

export default connect(
  mapStateToProps,
  { getTeamMembers, addTeamMember, deleteTeamMember }
)(TeamMembersTab);

const TeamsTabWrapper = styled(Paper)`
  margin: 48px auto;
  padding: 10px;
  width: 100%;
`;

const TeamsTabHeader = styled.div`
  // display: flex;
  // justify-content: space-between;
  div {
    display: flex;
    h6 {
      margin-top: 4px;
    }
  }
`;
