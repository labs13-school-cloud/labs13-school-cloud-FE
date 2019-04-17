import React from "react";
import NumberFormat from "react-number-format";

import styled from "styled-components";

// Material UI
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TrainingBotGIF from "../../../img/trainingBot.gif";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//State Management
import { addTeamMember } from "../../../store/actions";
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
      firstName: "",
      lastName: "",
      jobDescription: "",
      email: "",
      phoneNumber: "",
      userID: "",
      textOn: true,
      emailOn: false
    },
    assignments: [],
    trainingSeries: [],
    isRouting: false,
    snackState: false
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
      userID: this.props.userId
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

  render() {
    const { classes } = this.props;
    const { textOn, emailOn } = this.state.teamMember;

    let textDisabled;
    let emailDisabled;
    let addDisabled = false;
    // console.log(addDisabled);

    if (textOn && !emailOn) {
      textDisabled = true;
    }

    if (emailOn && !textOn) {
      emailDisabled = true;
    }

    if (emailOn && textOn) {
      textDisabled = false;
      emailDisabled = false;
    }

    //Checks to see if one number has been entered and if the full number matches
    if (
      /^$/gm.test(this.state.teamMember.phoneNumber) === true ||
      (/\+1 \(\d{0}/gm.test(this.state.teamMember.phoneNumber) === true &&
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{4})(?:[-.x ]*(\d+))?)\S*$/gm.test(
          this.state.teamMember.phoneNumber
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
                value={this.state.teamMember.firstName}
                onChange={this.handleChange("firstName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Last Name"
                className={classes.textField}
                value={this.state.teamMember.lastName}
                onChange={this.handleChange("lastName")}
                margin="normal"
                required
              />
              <TextField
                id="standard-name"
                label="Job Description"
                className={classes.textField}
                value={this.state.teamMember.jobDescription}
                onChange={this.handleChange("jobDescription")}
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
                value={this.state.teamMember.phoneNumber}
                onChange={this.handleChange("phoneNumber")}
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

            <ButtonContainer>
              <FormControlLabel
                control={
                  <Switch
                    checked={this.state.teamMember.textOn}
                    onChange={
                      textDisabled ? null : this.handleToggleChange("textOn")
                    }
                    value="textOn"
					color="default"
					style={
						this.state.teamMember.textOn
						  ? { color: "#451476" }
						  : { color: "#edeaea" }
					  }
                  />
                }
                label={
                  this.state.teamMember.textOn
                    ? "Texts Active"
                    : "Texts Inactive"
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    disabled={this.state.teamMember.email === ""}
                    checked={this.state.teamMember.emailOn}
                    onChange={
                      emailDisabled ? null : this.handleToggleChange("emailOn")
                    }
                    value="emailOn"
					color="default"
					style={
						this.state.teamMember.emailOn
						  ? { color: "#451476" }
						  : { color: "#edeaea" }
					  }
                  />
                }
                label={
                  this.state.teamMember.emailOn
                    ? "Email Active"
                    : "Email Inactive"
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
    teamMember: state.teamMembersReducer.teamMember
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
