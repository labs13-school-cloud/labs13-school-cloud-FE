import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import DeleteModal from "../Modals/deleteModal";
import MessageModal from "../Modals/MessageModal";

import { withRouter } from "react-router";

const ITEM_HEIGHT = 48;

class MessageOptionsModal extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    //console.log(this.props);
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
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
          <MenuItem>
            {/* <MessageModal
							trainingSeries={this.props.singleTrainingSeries}
							createAMessage={this.props.createAMessage}
							editMessage={this.props.editMessage}
							modalType="edit"
							message={this.props.message}
						/> */}
          </MenuItem>
          <MenuItem>
            <DeleteModal deleteType="message" id={this.props.message.id} />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(MessageOptionsModal);
