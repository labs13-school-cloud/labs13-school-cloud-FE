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

  return (
    <div>
      {props.teamMembers.length ? (
        <>
          <DatePicker
            inline
            selected={props.startDate}
            onChange={props.handler.handleDateChange}
          />

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
        </>
      ) : (
        <h2> You need to create Team members! </h2>
      )}
    </div>
  );
}

export default withStyles(styles)(AddMember);
