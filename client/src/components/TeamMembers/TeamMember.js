// displays individual team member card
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteTeamMember } from '../../store/actions';

//Styles
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core/';

//Routing
import { withRouter } from 'react-router';
import TeamMemberOptions from '../Modals/TeamMemberOptions';

const styles = {
  card: {
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between'

    // "&:hover": {
    //   background: "#C8C8C8"
    // }
  },
  listItem: {
    width: '100%',
    height: 70,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #E8E9EB'
  },
  icons: {
    display: 'block',
    width: 20,
    color: 'gray',
    cursor: 'pointer',
    '&:hover': { color: '#2699FB' }
  },
  hidden: {
    display: 'none'
  },

  title: {
    fontSize: 16
  }
};

function TeamMember(props) {
  // const { classes } = props;
  const {
    firstName,
    lastName,
    jobDescription,
    teamMemberID
  } = props.teamMember;
  // const [id, setID] = useState(false);

  const routeToMemberPage = (e, id) => {
    e.preventDefault();
    props.history.push(`/home/team-member/${id}`);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    props.deleteTeamMember(id);
  };

  return (
    <ListItem>
      <ListItemText
        primary={firstName + ' ' + lastName}
        secondary={`Job: ${jobDescription}`}
      />
      <div>
        <TeamMemberOptions
          routeToMemberPage={routeToMemberPage}
          handleDelete={handleDelete}
          teamMemberID={teamMemberID}
          userId={props.userId}
        />
      </div>
    </ListItem>
  );
}

TeamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  { deleteTeamMember }
)(withStyles(styles)(withRouter(TeamMember)));
