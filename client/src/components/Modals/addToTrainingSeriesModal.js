import React from "react";

import DatePicker from "react-datepicker";
//Prop Types
import PropTypes from "prop-types";

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
    selectedTeamMembers: []
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

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleChecked = id => {
    if (!this.state.selectedTeamMembers.includes(id)) {
      this.setState({
        ...this.state,
        selectedTeamMembers: [...this.state.selectedTeamMembers, id]
      });
    } else {
      let filteredTeamMembers = this.state.selectedTeamMembers.filter(
        member => member !== id
      );
      this.setState({
        ...this.state,
        selectedTeamMembers: filteredTeamMembers
      });
    }
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
      trainingSeriesID: this.state.trainingSeriesID,
      assignments: this.state.selectedTeamMembers
    }
    this.props.addTeamMemberToTrainingSeries(data)
    this.handleClose();
  };

  render() {
    const { classes } = this.props;

    let modalMap;
    let modalTitle;
    if (this.props.modalType === "assignMultiple") {
      modalMap = this.props.teamMembers.map(member => (
        <>
          <FormControlLabel
            control={
              <Checkbox
                name={member.teamMemberID}
                onChange={() => this.handleChecked(member.teamMemberID)}
              />
            }
            label={`${member.firstName} ${member.lastName}`}
          />
        </>
      ));
      modalTitle = (
        <FormLabel component="legend">Assign Team Members</FormLabel>
      );
    } else {
      modalMap = this.props.trainingSeries.map(t => <>{t.title}</>);
      modalTitle = "Assign Training Series";
    }

    return (
      <div>
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

            <Typography variant="body1" id="modal-title">
              {this.props.trainingSeries.map(t => (
                <>{t.title}</>
              ))}

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
              {modalMap}
              <Button type="submit">Submit</Button>
            </form>
            {/* <form
              onSubmit={e => this.handleSubmit(e)}
              className={classes.container}
              noValidate
              autoComplete="off"

            />
            <BottomNavigation

              onChange={this.handleChange}
              showLabels
              className={classes.root}
            >

              <Button type="submit">Submit</Button>
            </BottomNavigation>

            </BottomNavigation> */}
          </div>
        </Modal>
      </div>
    );
  }
}

UserModal.propTypes = {
  classes: PropTypes.object.isRequired
};

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
