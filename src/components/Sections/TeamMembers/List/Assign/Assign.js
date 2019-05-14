import React from "react";
import moment from 'moment';

import {styles, ListStyles} from "./styles.js";
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core/';

function Assign({classes, teamMembers}) {
  return (<>
  {teamMembers.map(member=>{
    
    // add hours to sendDate, formatting with moment ensures it displays properly on the FE
  const formattedStartDate = moment(member.startDate).add(1, 'hours').format('MMMM Do, YYYY');
    return (<ListStyles>
      <ListItem className={classes.listItem}>
        <ListItemText
          primary={`Member: ${member.first_name} ${member.last_name}`}
          secondary={`Start Date: ${formattedStartDate}`}
          />
      </ListItem>
    </ListStyles>)
        })}
    </>
}

const mapStateToProps = state => ({
  teamMembers: state.teamMembersReducer.teamMembers
});

export default export default withStyles(styles)(Assign);
