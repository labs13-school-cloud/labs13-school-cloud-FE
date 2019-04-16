import React from "react";

//Date Picker
import DatePicker from "react-datepicker";
//Styles
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styled from "styled-components";
import TrainingBotGIF from "../../../img/trainingBot.gif";

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
    margin: theme.spacing.unit,
    color: "#451476",
    "&:hover": {
      background: "#451476",
      color: "white"
    }
  },
  memberList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    "@media (max-width:580px)": {
      flexDirection: "column",
      alignItems: "center",
    }
  },
  box: {
    padding: "0 12px"
  }
});

function AddMember(props) {
  console.log(props);
  const { classes } = props;

  const renderMembers = () => {
    //Map Through the current assignments for the team member, returns an array of ID's
    let assignments = props.assignments.map(
      assignment => assignment.teamMember_ID
    );
    //Filters the trainingSeries based on assignments
    let filteredMembers = props.teamMembers.filter(member => {
      return !assignments.includes(member.teamMemberID);
    });
    return filteredMembers.map(member => (
      <>
        <FormListItem
          control={
            <Checkbox
              className={classes.box}
              name={member.teamMemberID}
              onChange={() => props.handler.handleChecked(member.teamMemberID)}
            />
          }
          label={`${member.firstName} ${member.lastName}`}
        />
      </>
    ));
  };
  console.log(props.selectedTeamMembers);
  return (
    <>
    <h3>Assign Team Members </h3>
    <AddMemberContainer>
      {props.teamMembers.length ? (
        <>
          <DatePickerContainer>
          <DatePicker
            inline
            minDate={new Date()}
            selected={props.startDate}
            onChange={props.handler.handleDateChange}
          />
          </DatePickerContainer>
          <TeamMemberContainer>
            <form
              variant="body1"
              id="modal-title"
              className={classes.memberList}
              onSubmit={e => props.handler.handleSubmit(e)}
            ><MemberListContainer>
              {renderMembers()}
              </MemberListContainer>
              <ButtonContainer>
              <Button
                disabled={
                  props.selectedTeamMembers < 1 || props.isRouting === true
                    ? "true"
                    : null
                }
                type="submit"
                className={classes.button}
              >
                {props.isRouting ? (
                  <LoadingImage src={TrainingBotGIF} alt="loader" />
                ) : (
                  `Assign`
                )}
              </Button>
              <Button onClick={props.handler.routeToPostPage}>Cancel</Button>
              </ButtonContainer>
            </form>
          </TeamMemberContainer>
        </>
      ) : (
        <h2>Please create at least one team member to allow assignment functionality. </h2>
      )}
    </AddMemberContainer>
    </>
  );
}

export default withStyles(styles)(AddMember);

const AddMemberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media (max-width: 580px) {
    flex-direction: column;
  }
`;

const DatePickerContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const TeamMemberContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 580px) {
    padding-top: 35px;
  }
`;

const MemberListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 0 25px;
    width: 100%;

    @media (max-width: 580px) {
      width: 240px;
      padding: 0;

    }

`;
const ButtonContainer = styled.div`
display: flex;
top: 100%;
position: sticky;
`;

const LoadingImage = styled.img`
  width: 40px;
  overflow: hidden;
  pointer-events: none;
  cursor: not-allowed;
`;

const FormListItem = styled(FormControlLabel)`
  flex-basis: 48%;

  @media (max-width: 768px) {
    flex-basis: 100%;
  }

`;
