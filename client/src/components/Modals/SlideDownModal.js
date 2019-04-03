import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import TrainingSeriesModal from './TrainingSeriesModal';
import AddToTrainingSeriesModal from '../Modals/addToTrainingSeriesModal';

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
          <Link to={`home/training-series/${this.props.data.trainingSeriesID}`}>
            <MenuItem onClick={this.handleClose}>Manage Posts</MenuItem>
          </Link>
          <MenuItem>
            <AddToTrainingSeriesModal
              modalType="assignMultiple"
              userID={this.props.userID}
              trainingSeriesID={this.props.data.trainingSeriesID}
            />
          </MenuItem>
          {/* <MenuItem onClick={this.handleClose}>Edit Training Series</MenuItem> */}
          <MenuItem>
            <TrainingSeriesModal
              trainingSeriesID={this.props.data.trainingSeriesID}
              title={this.props.data.title}
              modalType="edit"
              handleClose={this.handleClose}
            />
          </MenuItem>
          <MenuItem
            onClick={() =>
              this.props.deleteTrainingSeries(this.props.data.trainingSeriesID)
            }
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SlideDownModal;
