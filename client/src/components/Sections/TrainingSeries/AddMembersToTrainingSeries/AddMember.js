import React from "react";

//Date Picker
import DatePicker from "react-datepicker";

//Styles
import "react-datepicker/dist/react-datepicker.css";
import { withStyles } from "@material-ui/core/styles";
import { Button, Typography, Checkbox } from "@material-ui/core/";

import {
  AddMemberContainer,
  DirectionsDiv,
  DatePickerContainer,
  TeamMemberContainer,
  MemberListContainer,
  ButtonContainer,
  LoadingImage,
  FormListItem,
  styles
} from "./AddMemberStyles.js";

//Icons & Images
import TrainingBotGIF from "img/trainingBot.gif";

function AddMember(props) {
  //console.log(props);
  const { classes } = props;

  const renderMembers = () => {
    //Map Through the current assignments for the team member, returns an array of ID's
    let assignments = props.assignments.map(
      assignment => assignment.team_member_id
    );
    //Filters the trainingSeries based on assignments
    let filteredMembers = props.teamMembers.filter(member => {
      return !assignments.includes(member.team_member_id);
    });
    return filteredMembers.map(member => (
      <>
        <FormListItem
          control={
            <Checkbox
              className={classes.box}
              name={member.team_member_id}
              onChange={() =>
                props.handler.handleChecked(member.team_member_id)
              }
            />
          }
          label={`${member.first_name} ${member.last_name}`}
        />
      </>
    ));
  };
  //console.log(props.selectedTeamMembers);
  return (
    <>
      <Typography className={classes.heading} variant="h6">
        Assign Team Members{" "}
      </Typography>
      <AddMemberContainer>
        {props.teamMembers.length ? (
          <>
            <DatePickerContainer>
              <DirectionsDiv>
                <Typography variant="subheading">
                  Choose the start date for the training series.
                </Typography>
              </DirectionsDiv>
              <DatePicker
                inline
                minDate={new Date()}
                selected={props.startDate}
                onChange={props.handler.handleDateChange}
              />
            </DatePickerContainer>
            <TeamMemberContainer>
              <DirectionsDiv>
                <Typography variant="subheading">
                  Select your team members.
                </Typography>
              </DirectionsDiv>
              <form
                variant="body1"
                id="modal-title"
                className={classes.memberList}
                onSubmit={e => props.handler.handleSubmit(e)}
              >
                <MemberListContainer>{renderMembers()}</MemberListContainer>
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
                  <Button
                    onClick={props.handler.routeToPostPage}
                    className={classes.cancelButton}
                  >
                    Cancel
                  </Button>
                </ButtonContainer>
              </form>
            </TeamMemberContainer>
          </>
        ) : (
          <h2>
            Please create at least one team member to allow assignment
            functionality.{" "}
          </h2>
        )}
      </AddMemberContainer>
    </>
  );
}

export default withStyles(styles)(AddMember);
