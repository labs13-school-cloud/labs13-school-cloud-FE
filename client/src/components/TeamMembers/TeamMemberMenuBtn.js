import React from 'react';
// import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteModal from '../Modals/deleteModal';

import { withRouter } from 'react-router';

const ITEM_HEIGHT = 48;

class TeamMemberMenuBtn extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  routeToMemberPage = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/home/team-member/${id}`);
  };

  render() {
    console.log(this.props);
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <i
          className="material-icons"
          aria-label="More"
          aria-owns={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.routeToMemberPage}
        >
          edit
        </i>
        <i
          className="material-icons"
          aria-label="More"
          aria-owns={open ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          delete
        </i>
        {/* <IconButton
          aria-label="More"
          aria-owns={open ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        > 
          <MoreVertIcon />
        </IconButton> */}
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem
            onClick={e =>
              this.routeToMemberPage(e, this.props.teamMember.teamMemberID)
            }
          >
            Manage
          </MenuItem>
          <MenuItem>
            <DeleteModal
              deleteType="teamMember"
              id={this.props.teamMember.teamMemberID}
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(TeamMemberMenuBtn);
