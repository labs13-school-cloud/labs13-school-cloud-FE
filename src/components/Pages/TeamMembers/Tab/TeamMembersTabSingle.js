import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";

import styled from "styled-components";

function TeamMembersTabSingle(props) {
  const [mentor, setMentor] = useState("");
  const [manager, setManager] = useState("");
  const { teamMember } = props;

  useEffect(() => {
    if (teamMember.mentor_id) {
      axios
        .get(
          `${process.env.REACT_APP_API}/api/team-members/${
            teamMember.mentor_id
          }`
        )
        .then(res => {
          setMentor(res.data.teamMember);
        })
        .catch(err => {
          setMentor({
            first_name: "not assigned",
            last_name: ""
          });
        });
    } else {
      setMentor({
        first_name: "not assigned",
        last_name: ""
      });
    }
  }, [teamMember]);

  useEffect(() => {
    if (teamMember.manager_id) {
      axios
        .get(
          `${process.env.REACT_APP_API}/api/team-members/${
            teamMember.manager_id
          }`
        )
        .then(res => {
          setManager(res.data.teamMember);
        })
        .catch(err => {
          setManager({
            first_name: "not assigned",
            last_name: ""
          });
        });
    } else {
      setManager({
        first_name: "not assigned",
        last_name: ""
      });
    }
  }, [teamMember]);

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
          {teamMember.email || (
            <p style={{ color: "rgba(0,0,0,0.3)", margin: 0 }}>
              no email assigned
            </p>
          )}
        </Typography>
        <Typography variant="overline">{teamMember.phone_number}</Typography>
        <Typography variant="overline">
          mentor: {`${mentor.first_name} ${mentor.last_name}` || "not assigned"}
        </Typography>
        <Typography variant="overline">
          manager:{" "}
          {`${manager.first_name} ${manager.last_name}` || "not assigned"}
        </Typography>
        <DeleteIcon
          onClick={e => {
            e.stopPropagation();
            props.deleteTeamMember(teamMember.id);
          }}
        />
      </TeamsMember>
    </Grid>
  );
}

export default connect(
  null,
  {}
)(TeamMembersTabSingle);

const TeamsMember = styled(Paper)`
  margin: 10px;
  padding: 10px;
  width: 220px;
  &:hover {
    background: #f8f8f8;
  }
`;
