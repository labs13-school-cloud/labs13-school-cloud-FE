// main page for displaying list of all training series
import React, { useEffect } from "react";
import { connect } from "react-redux";

import styled from "styled-components";

import DeleteModal from "components/UI/Modals/deleteModal";
import { getTeamMembers } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function Overview({
  user_id,
  getFiltered,
  getTeamMembers: getMemberFromProps,
  teamMembers,
  classes,
  history
}) {
  useEffect(() => {
    getMemberFromProps(user_id);
  }, [getMemberFromProps, user_id]);

  return (
    <ListStyles>
      {getFiltered(teamMembers).map(
        ({ first_name, last_name, job_description, id, user_id }) => {
          return (
            <SingleMember key={id} component="li" className={classes.listItem}>
              <ListItemText
                primary={first_name + " " + last_name}
                secondary={`Job: ${job_description}`}
                onClick={() => history.push(`/home/team-member/${id}`)}
              />
              <DeleteModal
                deleteType="teamMember"
                teamMemberId={id}
                className={`material-icons ${classes.icons}`}
                user_id={user_id}
              />
            </SingleMember>
          );
        }
      )}
    </ListStyles>
  );
}

const mapStateToProps = state => ({
  teamMembers: state.teamMembersReducer.teamMembers
});

export default connect(
  mapStateToProps,
  { getTeamMembers }
)(withStyles(styles)(Overview));

const SingleMember = styled(ListItem)``;
