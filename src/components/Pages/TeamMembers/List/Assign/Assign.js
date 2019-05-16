import React from "react";
import moment from "moment";

import DeleteModal from "components/UI/Modals/deleteModal";

import { styles, ListStyles, ListButtonContainer } from "./styles.js";
import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";

function Assign({ classes, teamMembers, history, params }) {
  return (
    <>
      {teamMembers.map(member => {
        // add hours to sendDate, formatting with moment ensures it displays properly on the FE
        const formattedStartDate = moment(member.startDate)
          .add(1, "hours")
          .format("MMMM Do, YYYY");
        return (
          <ListStyles key={member.id}>
            <ListItem className={classes.listItem}>
              <ListItemText
                primary={`Member: ${member.first_name} ${member.last_name}`}
                secondary={`Start Date: ${formattedStartDate}`}
                onClick={e => history.push(`/home/team-member/${member.id}`)}
              />
              <ListButtonContainer>
                <DeleteModal
                  className={`material-icons ${classes.icons}`}
                  deleteType="unassign"
                  id={member.id}
                  ts_id={params.id}
                />
              </ListButtonContainer>
            </ListItem>
          </ListStyles>
        );
      })}
    </>
  );
}

export default withStyles(styles)(Assign);
