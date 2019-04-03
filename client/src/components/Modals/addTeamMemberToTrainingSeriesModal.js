import React from 'react';

import DatePicker from 'react-datepicker';

//Styles
import 'react-datepicker/dist/react-datepicker.css';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import styled from 'styled-components';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import {MenuItem} from '@material-ui/core';

//REDUX
import {connect} from 'react-redux';
import {addTeamMemberToTrainingSeries} from '../../store/actions/';
import {TransitionGroup} from 'react-transition-group';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  memberList: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class UserModal extends React.Component {
  state = {
    open: false,
    trainingSeriesID: '',
    startDate: '',
    value: '',
  };

  componentDidMount() {
    let d = new Date();
    let formattedDate = d.toISOString();
    this.setState({
      trainingSeriesID: this.props.trainingSeriesID,
      startDate: formattedDate,
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isEditing) {
      this.setState({email: this.props.email, name: this.props.name});
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
    console.log(this.state);
  };

  handleDateChange = date => {
    let d = date;
    this.setState({
      startDate: d.toISOString(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      startDate: this.state.startDate,
      trainingSeriesID: this.state.selectedTrainingSeries,
      assignments: [this.props.urlId],
    };
    this.props.addTeamMemberToTrainingSeries(data);
    this.handleClose();
    console.log(data);
  };

  renderTrainingSeriesInDropDown = () => {
    return this.props.trainingSeries.map(series => {
      console.log(series);
      return (
        <MenuItem
          name="trainingSeriesID"
          label={`${series.title}`}
          value={series.trainingSeriesID}
        >
          {series.title}
        </MenuItem>
      );
    });
  };

  render() {
    const {classes} = this.props;
    return (
      <>
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon onClick={this.handleOpen} />
        </Fab>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Assign Training Series
            </Typography>
            <DatePicker
              inline
              selected={this.state.startDate}
              onChange={this.handleDateChange}
            />
            <form
              variant="body1"
              id="modal-title"
              className={classes.memberList}
              onSubmit={e => this.handleSubmit(e)}
            >
              <FormControl className={''}>
                <Select
                  value={this.state.trainingSeriesID}
                  onChange={this.handleChange}
                  name="trainingSeriesID"
                >
                  {this.renderTrainingSeriesInDropDown()}
                </Select>
              </FormControl>
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    trainingSeries: state.trainingSeriesReducer.trainingSeries,
    isLoading: state.userReducer.isLoading,
    teamMembers: state.teamMembersReducer.teamMembers,
  };
};

const UserModalWrapped = withStyles(styles)(UserModal);

export default connect(
  mapStateToProps,
  {
    addTeamMemberToTrainingSeries,
  }
)(UserModalWrapped);
