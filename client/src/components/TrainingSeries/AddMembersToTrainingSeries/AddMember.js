import React from "react";

//Date Picker
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
import MenuItem from "@material-ui/core/MenuItem";
import styled from "styled-components";

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

function AddMember(props) {
  console.log(props);
  const { classes } = props;
  //Need a way to see all of the currently assigned team members of that training series.
  //Map over those assigned members.
  //Display members not currently assigned

  //   const renderMembers = () => {
  //     //Map Through the current assignments for the team member, returns an array of ID's
  //     let assignments = props.assignments.map(
  //       assignment => assignment.trainingSeries_ID
  //     );
  //     console.log("ASSIGNMENTS", assignments);
  //     //Filters the trainingSeries based on assignments
  //     let filteredMembers = props.trainingSeries.filter(series => {
  //       return !assignments.includes(series.trainingSeriesID);
  //     });
  //     console.log("FILTERED MEMBERS", filteredMembers);
  //     return filteredMembers.map(member => (
  //       <>
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               name={member.teamMemberID}
  //               onChange={() => props.handler.handleChecked(member.teamMemberID)}
  //             />
  //           }
  //           label={`${member.firstName} ${member.lastName}`}
  //         />
  //       </>
  //     ));
  //   };

  return (
    <AddMemberContainer>
      {props.teamMembers.length ? (
        <>
          <h3>Assign Team Members </h3>
          <DatePicker
            inline
            selected={props.startDate}
            onChange={props.handler.handleDateChange}
          />
          <TeamMemberContainer>
            <form
              variant='body1'
              id='modal-title'
              className={classes.memberList}
              onSubmit={e => props.handler.handleSubmit(e)}
            >
              {props.teamMembers.map(member => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={member.teamMemberID}
                        onChange={() =>
                          props.handler.handleChecked(member.teamMemberID)
                        }
                      />
                    }
                    label={`${member.firstName} ${member.lastName}`}
                  />
                </>
              ))}
              <Button type='submit'>Submit</Button>
            </form>
          </TeamMemberContainer>
        </>
      ) : (
        <h2> You need to create Team members! </h2>
      )}
    </AddMemberContainer>
  );
}

export default withStyles(styles)(AddMember);

const AddMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TeamMemberContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
