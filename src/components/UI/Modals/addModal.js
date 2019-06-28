import React, { useState } from "react";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { Typography, Paper, TextField } from "@material-ui/core";

// actions
import { addClass } from "store/actions/";

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

const AddModal = props => {
  // console.log(props)
  const [isOpen, setIsOpen] = useState(false);
  const [classList, setClassList] = useState({
    ...props.classList
  });
  // console.log('test', classList)
  const handleAdd = () => {
    switch (props.addType) {
      case "classes":
        props.addClass(classList);
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleChange = e => {
    switch (props.addType) {
      case "classes":
        setClassList({ ...classList, [e.target.name]: e.target.value });
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
            onClick={() => setIsOpen(true)}
          >
            Add
          </Button>
        );
      case "text":
        return <p onClick={() => setIsOpen(true)}>Add</p>;
      default:
        const { classes } = props;
        return (
          <i
            onClick={() => setIsOpen(true)}
            className={`material-icons ${classes.icons}`}
          >
            add_circle
          </i>
        );
    }
  };

  const handleTitle = () => {
    switch (props.addType) {
      case "classes":
        return "Class";
      default:
        break;
    }
  };

  const handleMap = () => {
    switch (props.addType) {
      case "classes":
        return Object.keys(classList);
      default:
        break;
    }
  };

  // const handleValue = property => {
  //   switch (props.addType) {
  //     case "classes":
  //       return classList[property];
  //     default:
  //       break;
  //   }
  // };

  const { classes } = props;

  const doNotDisplay = ["volunteers", "user_id", "id", "name"];

  return (
    <div>
      {handleDisplayType()}

      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Paper style={getModalStyle()} className={classes.paper}>
          <Typography variant="h4">Add A {handleTitle()}</Typography>
          {handleMap().map((property, index) => {
            if (doNotDisplay.includes(property)) return false;
            return (
              // ! Update KEY to have uuid
              <TextField
                key={index}
                label={
                  property
                    .toString()
                    .charAt(0)
                    .toUpperCase() + property.slice(1)
                }
                name={property.toString()}
                onChange={handleChange}
                //   value={handleValue(property)}
              />
            );
          })}
          <Button
            onClick={handleAdd}
            type="submit"
            variant="contained"
            className={classes.button}
          >
            Add
          </Button>
        </Paper>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(
  null,
  {
    addClass
  }
)(withRouter(withStyles(styles)(AddModal)));
