import React from "react";
import { withRouter } from "react-router";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import DeleteModal from "../Modals/deleteModal";

class SlideDownModal extends React.Component {
  state = {
    anchorEl: null
  };

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

  routeToTrainingSeriesPage = e => {
    e.preventDefault();
    this.handleClose();
    this.props.history.push(`home/training-series/${this.props.data.id}`);
  };

  render() {
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon
            aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
          />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <DeleteModal
              deleteType="trainingSeries"
              trainingSeriesId={this.props.data.id}
              displayType="text"
              user_id={this.props.user_id}
            />
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withRouter(SlideDownModal);
