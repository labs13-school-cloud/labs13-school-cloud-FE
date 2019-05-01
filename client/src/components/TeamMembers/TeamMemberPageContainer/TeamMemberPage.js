import React from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import {
  Paper,
  List,
  Typography,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel
} from "@material-ui/core/";
import NotificationWidget from "./SnackBarTeamMember";
//Components
import TrainingSeriesAssignments from "./TrainingSeriesAssigments";
import DeleteModal from "../../Modals/deleteModal";

//Redux
import { connect } from "react-redux";
import { getTrainingSeries, editTeamMember } from "../../../store/actions";

const styles = theme => ({
  // these styles fixes the off-centering
  paper: {
    // "max-width": 800,
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      width: "89%",
      // padding: 0,
      margin: "5px auto"
    },

    "@media (max-width: 480px)": {
      width: "80%",
      // padding: 0,
      margin: "5px auto"
    }
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    width: "100%"
  },
  info: {
    "margin-right": "50px"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%"
  },
  fab: {
    margin: theme.spacing.unit
  },
  button: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "@media (max-width: 768px)": {
      margin: "15px 0"
    }
  },
  trainingSeriesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 768px)": {
      flexDirection: "column"
    }
  },
  messageText: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center"
  },
  divider: {
    margin: "15px 0"
  },
  assignBtn: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    },

    "&:disabled": {
      background: "white"
    },

    "@media (max-width: 768px)": {
      margin: "20px 0 15px"
    }
  }
});

class TeamMemberPage extends React.Component {
  state = {
    team_member: {
      first_name: "",
      last_name: "",
      job_description: "",
      email: "",
      phone_number: "",
      user_id: "",
      team_member_col: "",
      team_member_id: "",
      text_on: false,
      email_on: false
    },
    assignments: [],
    trainingSeries: [] //Leigh-Ann: this may not be needed?
  };

  componentDidMount() {
    // this.props.getTrainingSeries(this.props.userId);
    if (Object.keys(this.props.teamMember).length !== 0) {
      console.log(
        "team member coming in to TeamMemberPage: ",
        this.props.teamMember
      );
      console.log(
        "teamMemberId and userId: ",
        this.props.teamMember.teamMember.id,
        this.props.userId
      );

      this.setState({
        team_member: this.props.teamMember.teamMember,
        assignments: this.props.teamMember.assignments
      });
    }

    //console.log("team member", this.props.teamMember);
  }

  handleChange = name => event => {
    this.setState({
      team_member: {
        ...this.state.team_member,
        [name]: event.target.value
      }
    });
  };

  handleToggleChange = name => async event => {
    await this.setState({
      team_member: {
        ...this.state.team_member,
        [name]: event.target.checked
      }
    });

    // PUT request on toggle
    this.props.editTeamMember(
      this.state.team_member.id,
      this.state.team_member
    );
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  routeToAssigning = e => {
    e.preventDefault();

    this.props.history.push({
      pathname: `/home/assign-series/${this.state.team_member.id}`,
      state: {
        userId: this.props.userId,
        urlId: this.props.urlId,
        assignments: this.props.teamMember.assignments,
        trainingSeries: this.props.trainingSeries
      }
    });
  };

  render() {
    const { classes } = this.props;

    //console.log("IS LOADING TMP", this.props.isLoading);

    const { text_on, email_on } = this.state.team_member;

    let textDisabled;
    let emailDisabled;

    if (text_on && !email_on) {
      textDisabled = true;
    }

    if (email_on && !text_on) {
      emailDisabled = true;
    }

    if (email_on && text_on) {
      textDisabled = false;
      emailDisabled = false;
    }

    //Checks to see if one number has been entered and if the full number matches
    let addDisabled = false;
    if (
      /^$/gm.test(this.state.team_member.phone_number) === true ||
      (/\+1 \(\d{0}/gm.test(this.state.team_member.phone_number) === true &&
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\S*$/gm.test(
          this.state.team_member.phone_number
        ) === false)
    ) {
      addDisabled = true;
    }

    const trainingAssigments =
      this.props.teamMember.assignments &&
      this.props.teamMember.assignments.map(trainingSeries => {
        return (
          <TrainingSeriesAssignments
            trainingSeries={trainingSeries}
            teamMemberId={this.props.urlId}
          />
        );
      });

    let disabledTrainingSeries;

    if (
      this.props.trainingSeries.length > 0 &&
      this.state.assignments.length === 0
    ) {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Training Series</Typography>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={this.routeToAssigning}
            >
              Assign to Training Series
            </Button>
          </div>
          <HolderText>
            <p>This team member currently does not have any assignments.</p>
            <p>Click the button above to assign them to a training series.</p>
          </HolderText>
        </>
      );
    } else if (this.props.trainingSeries.length > 0) {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Assigned Training Series</Typography>
            <Button
              className={classes.assignBtn}
              variant="outlined"
              // className={classes.button}
              onClick={this.routeToAssigning}
            >
              Assign to Training Series
            </Button>
          </div>
          <List>{trainingAssigments}</List>
        </>
      );
    } else {
      disabledTrainingSeries = (
        <>
          <div className={classes.trainingSeriesHeader}>
            <Typography variant="title">Training Series</Typography>
            <Button className={classes.assignBtn} variant="outlined" disabled>
              Assign to Training Series
            </Button>
          </div>
          <HolderText>
            <p>You don't have any training series to assign.</p>
            <p variant="subheading" className={classes.messageText}>
              <Link to="/home/create-training-series">Click here</Link> to
              create your first training series.
            </p>
          </HolderText>
        </>
      );
    }

    return (
      <MainContainer>
        <form className={classes.form}>
          <Paper className={classes.paper}>
            <Typography variant="title">Team Member Info</Typography>
            <Divider variant="fullWidth" className={classes.divider} />
            <MemberInfoContainer>
              <TextField
                id="standard-name"
                label="first name"
                className={classes.textField}
                value={this.state.team_member.first_name}
                onChange={this.handleChange("first_name")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="last name"
                className={classes.textField}
                value={this.state.team_member.last_name}
                onChange={this.handleChange("last_name")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="job description"
                className={classes.textField}
                value={this.state.team_member.job_description}
                onChange={this.handleChange("job_description")}
                margin="normal"
                required
              />
            </MemberInfoContainer>
            <MemberInfoContainer>
              <NumberFormat
                format="+1 (###) ###-####"
                mask="_"
                id="standard-name"
                label="phone number"
                customInput={TextField}
                className={classes.textField}
                value={this.state.team_member.phone_number}
                onChange={this.handleChange("phone_number")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="email"
                type="email"
                className={classes.textField}
                value={this.state.team_member.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
            </MemberInfoContainer>
            <ButtonContainer>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.team_member.text_on}
                    onChange={
                      textDisabled ? null : this.handleToggleChange("text_on")
                    }
                    value="text_on"
                    color="default"
                    style={
                      this.state.team_member.text_on
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.team_member.text_on
                    ? "Texts Active"
                    : "Texts Inactive"
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.team_member.email_on}
                    onChange={
                      emailDisabled ? null : this.handleToggleChange("email_on")
                    }
                    value="email_on"
                    color="default"
                    style={
                      this.state.team_member.email_on
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.team_member.email_on
                    ? "Email Active"
                    : "Email Inactive"
                }
              />
            </ButtonContainer>
            <ButtonContainer>
              <NotificationWidget
                disabled={addDisabled ? true : false}
                teamMember={this.state.team_member}
                editTeamMemberSubmit={this.props.editTeamMemberSubmit}
                type="success"
                submitType="edit"
              />
              <DeleteModal
                deleteType="inTeamMemberPage"
                teamMemberId={this.props.teamMember.teamMember.id}
                userId={this.props.userId}
                displayType="button"
              />
            </ButtonContainer>
          </Paper>
        </form>
        <Paper className={classes.paper}>{disabledTrainingSeries}</Paper>
      </MainContainer>
    );
  }
}

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const HolderText = styled.div`
  margin: 50px 0;
  p {
    color: lightgray;
    text-align: center;
  }
`;

const MemberInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 20px auto;
  @media (max-width: 480px) {
    flex-direction: column;
    width: 90%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

const mapStateToProps = state => ({
  trainingSeries: state.trainingSeriesReducer.trainingSeries
});

export default connect(
  mapStateToProps,
  { getTrainingSeries, editTeamMember }
)(withStyles(styles)(TeamMemberPage));
