import React from "react";

import DatePicker from "react-datepicker";

//Styles
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
//REDUX
import { connect } from "react-redux";
import { addTeamMemberToTrainingSeries } from "../../store/actions/";
import { TransitionGroup } from "react-transition-group";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  memberList: {
    display: "flex",
    flexDirection: "column"
  }
});

class UserModal extends React.Component {
  state = {
    open: false,
    trainingSeriesID: "",
    startDate: "",
    value: ""
  };

  componentDidMount() {
    if (this.props.modalType === "assignMultiple") {
      let d = new Date();
      let formattedDate = d.toISOString();
      this.setState({
        trainingSeriesID: this.props.trainingSeriesID,
        startDate: formattedDate
      });
    } else {
      this.setState({ email: this.props.email, name: this.props.name });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isEditing) {
      this.setState({ email: this.props.email, name: this.props.name });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleDateChange = date => {
    let d = date;
    this.setState({
      startDate: d.toISOString()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const data = {
      startDate: this.state.startDate,
      trainingSeriesID: this.state.selectedTrainingSeries,
      assignments: [this.props.urlId]
    };
    this.props.addTeamMemberToTrainingSeries(data);
    this.handleClose();
    console.log(data);
  };

  render() {
    const { classes } = this.props;

    let modalMap;
    let modalTitle;
    if (this.props.modalType === "assignMultiple") {
      modalMap = this.props.trainingSeries.map(series => (
        <>
          <FormControlLabel
            control={<Radio />}
            label={`${series.title}`}
            value={series.trainingSeriesID}
          />
        </>
      ));
      modalTitle = (
        <FormLabel component='legend'>Assign Training Series</FormLabel>
      );
    } else {
      modalMap = this.props.trainingSeries.map(t => <p>{t.title}</p>);
      modalTitle = "Assign Training Series";
    }

    console.log("MODAL", this.state.trainingSeriesID);

    return (
      <>
        <Fab color='primary' aria-label='Add' className={classes.fab}>
          <AddIcon onClick={this.handleOpen} />
        </Fab>

        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant='h6' id='modal-title'>
              Assign Training Series
            </Typography>
            <DatePicker
              inline
              selected={this.state.startDate}
              onChange={this.handleDateChange}
            />
            <form
              variant='body1'
              id='modal-title'
              className={classes.memberList}
              onSubmit={e => this.handleSubmit(e)}
            >
              <RadioGroup
                onChange={this.handleChange}
                name='TrainingSeries'
                value={this.state.value}
              >
                {modalMap}
              </RadioGroup>
              <Button type='submit'>Submit</Button>
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
    teamMembers: state.teamMembersReducer.teamMembers
  };
};

const UserModalWrapped = withStyles(styles)(UserModal);

export default connect(
  mapStateToProps,
  {
    addTeamMemberToTrainingSeries
  }
)(UserModalWrapped);
