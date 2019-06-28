import React, { useState } from "react";
import { withRouter } from "react-router";
import PropTypes, { arrayOf } from "prop-types";
import { connect } from "react-redux";

// Helpers
import {
  toCamelCase,
  capitalizeWord,
  handleCloseFinished,
} from "./helperFunctions.js";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Typography, Paper, TextField } from "@material-ui/core";

// Actions
import { editTrainingSeries, editClass } from "store/actions/";

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
});

const EditModal = props => {
  const {
    classes,
    editModalTitle,
    editFields,
    item,
    section,
    editClass,
    editTrainingSeries
  } = props;
  const itemKeys = Object.keys(item);
  const itemValues = Object.values(item);
  const arrayOfObjects = [];

  for (let i = 0; i < itemKeys.length; i++) {
    arrayOfObjects.push({ [toCamelCase(itemKeys[i])]: itemValues[i] });
  }

  const initialState = Object.assign({}, ...arrayOfObjects);

  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState(initialState);

  const handleDisplayType = () => {
    switch (props.displayType) {
      case "button":
        return (
          <Button
            variant="outlined"
            style={{ marginLeft: 10 }}
            onClick={() => setIsOpen(true)}>
            Edit
          </Button>
        );
      case "text":
        return <p onClick={() => setIsOpen(true)}>Edit</p>;
      default:
        const { classes } = props;
        return (
          <i
            onClick={() => setIsOpen(true)}
            className={`material-icons ${classes.icons}`}>
            create
          </i>
        );
    }
  };

  // Runs different functions based on what is being updated
  const handleEdit = () => {
    switch (section) {
      case "Classes":
        const classChanges = {
          id: state.id,
          grade_level: state.gradeLevel,
          subject: state.subject,
          class_name: state.className,
          number_of_students: state.numberOfStudents,
          teacher_name: state.teacherName,
        };
        editClass(state.id, classChanges);
        handleCloseFinished(state, setIsOpen, setState);
        break;
      case "Training Series":
        const trainingSeriesChanges = {
            user_id: state.userId,
            subject: state.subject,
            title: state.title
        }
        editTrainingSeries(state.id, trainingSeriesChanges);
        handleCloseFinished(state, setIsOpen, setState);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {handleDisplayType()}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={() => setIsOpen(false)}>
        <Paper style={getModalStyle()} className={classes.paper}>
          <Typography variant="h4">
            Edit This {capitalizeWord(editModalTitle)}
          </Typography>
          {editFields.map((field, index) => {
            return (
              <TextField
                key={index}
                label={capitalizeWord(field)}
                value={state[toCamelCase(field)]}
                name={toCamelCase(field)}
                onChange={e =>
                  setState({ ...state, [e.target.name]: e.target.value })
                }
              />
            );
          })}
          <Button
            onClick={handleEdit}
            type="submit"
            variant="contained"
            className={classes.button}>
            Save
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

EditModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  null,
  {
    editTrainingSeries,
    editClass,
  },
)(withRouter(withStyles(styles)(EditModal)));
