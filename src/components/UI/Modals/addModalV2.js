import React, { useState } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Helpers
import { toCamelCase, capitalizeWord } from "./helperFunctions.js";

//Styles
import { withStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Typography, Paper, TextField } from "@material-ui/core";

// actions
// Modify when using modal
import { addTrainingSeries, addClass } from "store/actions/";

/**
 * There are some things to not to get this to work
 * - Props expected to be passed in
 *   - titleForModal (Add A {titleForModal}) the modal will take care of the capitalization so it will work with and spelling
 *     - i.e. training series === Training Series || class === Class
 *   - fields (Array of strings of the field names). State will be based off these fields, the modal will take care of naming in
 *   state and will covert them to camelCase so name them what the backend will expect for the post request. Fields will also take
 *   care of the label on the TextField and the name of the input
 *     - i.e. of array ["title", "subject"] || ["class name", "grade level"];
 *     - i.e. state { title:"", "subject" } || state { className: "", gradeLevel: "" }
 *     - section (for what the type for handling the add cases)
 *
 *  - All you need to do is import the action and add it to the handleAdd function cases then in the cases create a new object
 *  to match what the backend needs (Check #1 below) to pass to the action creator then call "handleCloseAfterAdd" lastly with a
 *  break statement;
 *    #1) if your field is ["grade level"] then it will be called gradeLevel in state which the backend expects "grade_level" so
 *      in your new object it will need to be { grade_level: state.gradeLevel }
 */

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
    position: "absolute",
    maxWidth: "400px",
    width: "100%",
    height: "400px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "40px 20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: "20px",
  },
  icons: {
    display: "block",
    width: 20,
    color: "gray",
    cursor: "pointer",
    "&:hover": { color: "#2699FB" },
  },
  fab: {
    margin: 5,
    background: "royalblue",
    color: "white",
    "&:hover": {
      background: "#8FCAFC",
    },
  },
});

const AddModal = props => {
  const {
    classes,
    titleForModal,
    fields,
    section,
    user,
    addTrainingSeries,
    addClass
  } = props;

  // Takes the fields array and camelCases the strings and coverts the array to a state object with a value of empty string
  const initialState = Object.assign(
    {},
    ...fields.map(field => {
      return { [toCamelCase(field)]: "" };
    }),
  );

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(initialState);

  const handleCloseAfterAdd = () => {
    setState(initialState);
    setIsOpen(false);
  };

  // Modify when using modal
  const handleAdd = async () => {
    switch (section) {
      case "Training Series":
        const newSeries = { ...state, user_id: user.id };
        addTrainingSeries(newSeries);
        handleCloseAfterAdd();
        break;
      case "Classes":
        // ! Add helper that will take of renaming
        const newClass = {
          grade_level: state.gradeLevel,
          subject: state.subject,
          class_name: state.className,
          number_of_students: state.numberOfStudents
        };
        addClass(newClass);
        handleCloseAfterAdd();
        break;
      default:
        break;
    }
  };

  const handleDisplayType = () => {
    switch (props.displayType) {
      case "button":
        return (
          <Button
            variant="outlined"
            style={{ marginLeft: 10 }}
            onClick={() => setIsOpen(true)}>
            Add
          </Button>
        );
      case "text":
        return <p onClick={() => setIsOpen(true)}>Add</p>;
      default:
        const { classes } = props;
        return (
          <Fab
            size="small"
            aria-label="Add"
            onClick={() => setIsOpen(true)}
            className={classes.fab}>
            <i className="material-icons">add</i>
          </Fab>
        );
    }
  };

  return (
    <div>
      {handleDisplayType()}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <Paper style={getModalStyle()} className={classes.paper}>
          <Typography variant="h4">
            Add A {capitalizeWord(titleForModal)}
          </Typography>
          {fields.map((field, index) => {
            return (
              <TextField
                key={index}
                label={capitalizeWord(field)}
                value={state[field]}
                name={toCamelCase(field)}
                onChange={e =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
            );
          })}
          <Button
            type="submit"
            variant="contained"
            className={classes.button}
            onClick={handleAdd}>
            Add
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    user: state.userReducer.userProfile.user,
  };
};

export default connect(
  mapStateToProps,
  // Modify when using modal
  { addTrainingSeries, addClass },
)(withRouter(withStyles(styles)(AddModal)));
