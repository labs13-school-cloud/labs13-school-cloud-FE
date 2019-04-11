import React from 'react';
import { withRouter } from 'react-router';

// styles
import { withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton, Menu, MenuItem } from '@material-ui/core/';

// components
import DeleteModal from '../Modals/deleteModal';

const styles = theme => ({});

class TeamMemberOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleClick = e => {
    this.setState({
      anchorEl: e.currentTarget
    });
  };

  handleClose = e => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    // const { classes } = this.props;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon
            aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
          />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem
            onClick={e =>
              this.props.routeToMemberPage(e, this.props.teamMemberID)
            }
          >
            Manage
          </MenuItem>
          <MenuItem>
            <DeleteModal
              deleteType="teamMember"
              teamMemberId={this.props.teamMemberID}
              displayType="text"
              userId={this.props.userId}
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(TeamMemberOptions));
