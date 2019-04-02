import React from "react";

import Button from "@material-ui/core/Button";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import TrainingSeriesModal from './TrainingSeriesModal';

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

  render() {
    return (
      <>
        <Button>
          <MoreHorizIcon
            aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
          />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Manage Posts</MenuItem>
          <MenuItem onClick={this.handleClose}>Manage Team Members</MenuItem>
          {/* <MenuItem onClick={this.handleClose}>Edit Training Series</MenuItem> */}
          <MenuItem><TrainingSeriesModal
          trainingSeriesID={this.props.data.trainingSeriesID}
          title={this.props.data.title}
          modalType="edit"
          handleClose={this.handleClose}
        /></MenuItem>
          <MenuItem onClick={() => this.props.deleteTrainingSeries(this.props.data.trainingSeriesID)}>Delete</MenuItem>
        </Menu>
      </>
    );
  }
}

export default SlideDownModal;
