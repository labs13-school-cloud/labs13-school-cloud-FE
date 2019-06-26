import React, { useState } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Typography, Paper, TextField } from "@material-ui/core";

// Actions
import { editTrainingSeries, editClass, editVolunteer } from "store/actions/";


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
    maxWidth: "400px",
    width: "100%",
    height: "400px",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: "40px 20px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: "20px"
  },
  icons: {
    display: "block",
    width: 20,
    color: "gray",
    cursor: "pointer",
    "&:hover": { color: "#2699FB" }
  }
});

const EditModal = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [trainingSeries, setTrainingSeries] = useState({
    ...props.trainingSeries
  });
  // console.log('test', classList)
  const [currentClass, setCurrentClass] = useState({
    // ...props.classList
  })

  const [currentVolunteer, setCurrentVolunteer] = useState({
    ...props.volunteers
  })

  // Runs different functions based on what is being updated
  const handleEdit = () => {
    switch (props.updateType) {
      case "trainingSeries":
        const { user_id, subject, title } = trainingSeries;
        props.editTrainingSeries(trainingSeries.id, { user_id, subject, title });
        setIsOpen(false);
        break;
      case "classes":
        props.editClass(currentClass.id, { ...currentClass });
        setIsOpen(false);
        break;
      case "volunteers":
        props.editVolunteer(currentVolunteer.id, {...currentVolunteer});
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleChange = e => {
    switch (props.updateType) {
      case "trainingSeries":
        setTrainingSeries({ ...trainingSeries, [e.target.name]: e.target.value })
        break;
      case "classes":
        setCurrentClass({ ...currentClass, [e.target.name]: e.target.value })
        break;
      case "volunteers": 
        setCurrentVolunteer({ ...currentVolunteer, [e.target.name]: e.target.value });
        break;
      default:
        break
    }
  }

  const handleDisplayType = () => {
    switch (props.displayType) {
      case "button":
        return (
          <Button
            variant="outlined"
            style={{ marginLeft: 10 }}
            onClick={() => setIsOpen(true)}
          >
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
            className={`material-icons ${classes.icons}`}
          >
            create
          </i>
        );
    }
  };

  // Sets title based on what is being updated
  const handleTitle = () => {
    switch (props.updateType) {
      case "trainingSeries":
        return "Training Series";
      case "classes":
        return "Class"
      case "volunteers":
        return "Volunteer"
      default:
        break;
    }
  };

  const handleMap = () => {
    switch (props.updateType) {
      case "trainingSeries":
        return Object.keys(trainingSeries)
      case "classes":
        return Object.keys(currentClass)
      case "volunteers":
        return Object.keys(currentVolunteer)
      default:
        break
    }
  }

  const handleValue = (property) => {
    switch (props.updateType) {
      case "trainingSeries":
        return trainingSeries[property]
      case "classes":
        return currentClass[property]
      case "volunteers":
        return currentVolunteer[property]
      default: 
        break;
    }
  }

  const { classes } = props;

  const doNotDisplay = ["volunteers", "user_id", "id", "name"];

  return (
    <>
      {handleDisplayType()}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Paper style={getModalStyle()} className={classes.paper}>
          <Typography variant="h4">Edit This {handleTitle()}</Typography>
          {
            handleMap().map((property, index) => {
              if (doNotDisplay.includes(property)) return false
              return (
                // ! Update KEY to have uuid
                <TextField 
                  key={index}
                  label={property.toString().charAt(0).toUpperCase() + property.slice(1)}
                  name={property.toString()}
                  onChange={handleChange}
                  value={handleValue(property)}
                />
              )
            })
          }
          <Button
            onClick={handleEdit}
            type="submit"
            variant="contained"
            className={classes.button}
          >
            Save
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

EditModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {
    editTrainingSeries,
    editClass,
    editVolunteer
  }
)(withRouter(withStyles(styles)(EditModal)));
