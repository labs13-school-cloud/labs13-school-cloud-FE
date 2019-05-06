import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Pagination from "material-ui-flat-pagination";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import { TeamsTabWrapper, TeamsMember, TeamsTabHeader } from "./styles.js";

import { Typography, Fab, TextField, InputAdornment } from "@material-ui/core/";

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
  const { getTeamMembers, userId, teamMembers } = props;

  useEffect(() => {
    getTeamMembers(userId);
    setLocalTeamMembers(teamMembers);
  }, [getTeamMembers, userId, teamMembers]);

  const handleClick = offset => {
    setOffset(offset);
  };

  return (
    <div>
      <TeamsTabWrapper>
        <TeamsTabHeader>
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
          <div>
            <Fab
              size="small"
              aria-label="Add"
              onClick={() => {
                props.history.push("/home/create-team-member");
                console.log(props);
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
        </TeamsTabHeader>

        <hr />
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
                console.log(teamMember);
                return (
                  <Grid
                    key={teamMember.id}
                    item
                    style={{ cursor: "pointer" }}
                    onClick={e => {
                      props.history.push(`/home/team-member/${teamMember.id}`);
                    }}
                  >
                    <TeamsMember>
                      <Typography variant="subtitle1">
                        {teamMember.first_name} {teamMember.last_name}
                      </Typography>
                      <hr />
                      <Typography variant="subtitle2">
                        {teamMember.email}
                      </Typography>
                      <Typography variant="overline">
                        {teamMember.phone_number}
                      </Typography>
                      <Typography variant="overline">
                        mentor: {teamMember.mentor || "not assigned"}
                      </Typography>
                      <Typography variant="overline">
                        manager: {teamMember.manager || "not assigned"}
                      </Typography>
                      <DeleteIcon
                        onClick={e => {
                          e.stopPropagation();
                          props.deleteTeamMember(teamMember.id);
                        }}
                      />
                      {/* <ul>
                      {teamMember.trainingSeries.map(series => {
                        return <div>{series}</div>;
                      })}
                    </ul> */}
                    </TeamsMember>
                  </Grid>
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
