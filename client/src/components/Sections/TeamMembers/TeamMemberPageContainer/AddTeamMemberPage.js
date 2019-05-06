import React from "react";
import NumberFormat from "react-number-format";
import axios from "axios";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TrainingBotGIF from "img/trainingBot.gif";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//State Management
import { addTeamMember } from "store/actions";
import { connect } from "react-redux";

const styles = theme => ({
  paper: {
    width: "89%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none",
    margin: "5px auto",

    "@media (max-width: 768px)": {
      width: "89%",
      textAlign: "center",
      padding: "30px"
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
    margin: "0 auto"
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
    "margin-left": theme.spacing.unit
  },
  addButton: {
    "margin-left": theme.spacing.unit,
    background: "#451476",
    color: "white",
    "&:hover": {
      background: "#591a99",
      color: "white"
    }
  },
  divider: {
    margin: "15px 0"
  },
  color: {
    color: "red"
  }
});

class TeamMemberPage extends React.Component {
  state = {
    teamMember: {
      first_name: "",
      last_name: "",
      job_description: "",
      email: "",
      phone_number: "",
      user_id: "",
      slack_id: "",
      text_on: true,
      email_on: false,
      slack_on: false,
      manager: null,
      mentor: null
    },
    assignments: [],
    training_series: [],
    isRouting: false,
    snackState: false,
    memberManager: null,
    memberMentor: null,
    otherTeamMembers: [],
    slackUsers: []
  };

  componentDidMount = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/slack/`);
    this.setState({
      otherTeamMembers: this.props.teamMembers,
      slackUsers: data
    });
  };

  handleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.value
      }
    });
  };

  addNewTeamMember = e => {
    e.preventDefault();
    const newMember = {
      ...this.state.teamMember,
      user_id: this.props.userId
    };

    this.props.addTeamMember(newMember);
    this.setState({ isRouting: true });
  };

  handleDate = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleToggleChange = name => event => {
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [name]: event.target.checked
      }
    });
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push("/home");
  };

  selectHandler = (e, relationType) => {
    let val = e.target.value !== "null" ? parseInt(e.target.value) : null;
    this.setState({
      teamMember: {
        ...this.state.teamMember,
        [e.target.name]: val
      },
      [relationType]: val
        ? this.state.otherTeamMembers.find(mbr => mbr.id === val)
        : null
    });
  };

  render() {
    const { classes } = this.props;
    const { text_on, email_on, slack_on } = this.state.teamMember;

    let textEnabled;
    let emailEnabled;
    let slackEnabled;
    let addDisabled = false;
    //console.log(addDisabled);

    if (text_on && !email_on && !slack_on) {
      textEnabled = true;
    }

    if (email_on && !text_on && !slack_on) {
      emailEnabled = true;
    }

    if (slack_on && !text_on && !slack_on) {
      slackEnabled = true;
    }

    if (email_on && text_on && slack_on) {
      textEnabled = false;
      emailEnabled = false;
      slackEnabled = false;
    }
    //Checks to see if one number has been entered and if the full number matches
    if (
      /^$/gm.test(this.state.teamMember.phone_number) === true ||
      (/\+1 \(\d{0}/gm.test(this.state.teamMember.phone_number) === true &&
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\S*$/gm.test(
          this.state.teamMember.phone_number
        ) === false)
    ) {
      addDisabled = true;
    }
    return (
      <MainContainer>
        <form className={classes.form} onSubmit={e => this.addNewTeamMember(e)}>
          <Paper className={classes.paper}>
            <Typography variant="title">Add A New Team Member</Typography>
            <Divider className={classes.divider} />
            <MemberInfoContainer>
              <TextField
                autoFocus="true"
                id="standard-name"
                label="First Name"
                className={classes.textField}
                value={this.state.teamMember.first_name}
                onChange={this.handleChange("first_name")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                value={this.state.teamMember.last_name}
                onChange={this.handleChange("last_name")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Job Description"
                className={classes.textField}
                value={this.state.teamMember.job_description}
                onChange={this.handleChange("job_description")}
                margin="normal"
                required
              />
            </MemberInfoContainer>
            <MemberInfoContainer>
              <NumberFormat
                format="+1 (###) ###-####"
                // mask='_'
                type="tel"
                inputProps={{ minLength: 10 }}
                id="standard-name"
                label="Phone Number"
                customInput={TextField}
                className={classes.textField}
                value={this.state.teamMember.phone_number}
                onChange={this.handleChange("phone_number")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Email"
                type="email"
                className={classes.textField}
                value={this.state.teamMember.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
            </MemberInfoContainer>
            <div className="mentor display">
              Mentor
              {this.state.memberMentor !== null
                ? `: ${this.state.memberMentor.first_name} ${
                    this.state.memberMentor.last_name
                  }`
                : ": none"}
            </div>
            <form className="mentor select">
              <select
                name="mentor"
                value={this.state.teamMember.mentor}
                onChange={e => this.selectHandler(e, "memberMentor")}
              >
                <option>select mentor</option>{" "}
                <option value="null">none</option>
                {this.state.otherTeamMembers
                  .filter(
                    mbr =>
                      mbr.id !== this.state.teamMember.mentor &&
                      mbr.id !== this.state.teamMember.manager
                  )
                  .map(mbr => (
                    <option key={mbr.id} value={mbr.id}>
                      {mbr.first_name} {mbr.last_name}
                    </option>
                  ))}
              </select>
            </form>

            <div className="manager display">
              Manager
              {this.state.memberManager !== null
                ? `: ${this.state.memberManager.first_name} ${
                    this.state.memberManager.last_name
                  }`
                : ": none"}
            </div>
            <form className="manager select">
              <select
                name="manager"
                value={this.state.teamMember.manager}
                onChange={e => this.selectHandler(e, "memberManager")}
              >
                <option>select manager</option>
                <option value="null">none</option>
                {this.state.otherTeamMembers
                  .filter(
                    mbr =>
                      mbr.id !== this.state.teamMember.mentor &&
                      mbr.id !== this.state.teamMember.manager
                  )
                  .map(mbr => (
                    <option key={mbr.id} value={mbr.id}>
                      {mbr.first_name} {mbr.last_name}
                    </option>
                  ))}
              </select>
            </form>
            <MemberInfoContainer>
              <select
                value={this.state.teamMember.slack_id}
                onChange={this.handleChange("slack_id")}
              >
                {this.state.slackUsers &&
                  this.state.slackUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.real_name}
                    </option>
                  ))}
              </select>
            </MemberInfoContainer>

            <ButtonContainer>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.teamMember.text_on}
                    onChange={
                      textEnabled ? null : this.handleToggleChange("text_on")
                    }
                    value="text_on"
                    color="default"
                    style={
                      this.state.teamMember.text_on
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.teamMember.text_on
                    ? "Texts Active"
                    : "Texts Inactive"
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    disabled={this.state.teamMember.email === ""}
                    checked={this.state.teamMember.email_on}
                    onChange={
                      emailEnabled ? null : this.handleToggleChange("email_on")
                    }
                    value="email_on"
                    color="default"
                    style={
                      this.state.teamMember.email_on
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.teamMember.email_on
                    ? "Email Active"
                    : "Email Inactive"
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.teamMember.slack_on}
                    onChange={
                      slackEnabled ? null : this.handleToggleChange("slack_on")
                    }
                    value="slack_on"
                    color="default"
                    style={
                      this.state.teamMember.slack_on
                        ? { color: "#451476" }
                        : { color: "#edeaea" }
                    }
                  />
                }
                label={
                  this.state.teamMember.slack_on
                    ? "Slack Active"
                    : "Slack Inactive"
                }
              />
            </ButtonContainer>
            <ButtonContainer>
              <Button
                disabled={
                  this.state.isRouting || addDisabled === true ? true : null
                }
                variant="contained"
                className={classes.addButton}
                type="submit"
              >
                {this.state.isRouting ? (
                  <LoadingImage src={TrainingBotGIF} alt="Loading Icon" />
                ) : (
                  "Add Member"
                )}
              </Button>
              <Button
                className={classes.button}
                onClick={e => this.handleCancel(e)}
              >
                Cancel
              </Button>
            </ButtonContainer>
          </Paper>
        </form>
      </MainContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    addSuccess: state.teamMembersReducer.status.addSuccess,
    teamMember: state.teamMembersReducer.teamMember,
    teamMembers: state.teamMembersReducer.teamMembers
  };
};

export default connect(
  mapStateToProps,
  { addTeamMember }
)(withStyles(styles)(TeamMemberPage));

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 768px;
  @media (max-width: 768px) {
    width: 95%;
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

const LoadingImage = styled.img`
  width: 32px;
  height: auto;
  overflow: hidden;
  cursor: not-allowed;
  pointer-events: none;
  position: relative;
  padding: 0;
  margin: 0;
`;
