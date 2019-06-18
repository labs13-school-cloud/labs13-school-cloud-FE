import React from 'react';

import  PropTypes from "prop-types";

//Styles
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";

import { connect } from "react-redux";

import {
    editClass
} from "store/actions/";

import { Typography, Paper, FormControl, TextField } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
};

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

class ClassListModal extends React.Component {
    state  = {
        open: false,
        title: ""
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };
    
    clearForm = () => {
        this.setState({ title: "" });
    };

    handleEdit = () => {
        this.props.editClass(this.props.classId)
    }
    // handleClose();

    handleDisplayType = () => {
        switch (this.props.displayType) {
          case "button":
            return (
              <Button
                variant="outlined"
                style={{ marginLeft: 10 }}
                onClick={this.handleOpen}
              >
                Edit
              </Button>
            );
          case "text":
            return <p onClick={this.handleOpen}>Edit</p>;
          default:
            const { classes } = this.props;
            return (
              <i
                onClick={this.handleOpen}
                className={`material-icons ${classes.icons}`}
              >
                create
              </i>
            );
        }
    };

    render() {
        console.log(this.props)
        const { classes } = this.props;
        
        console.log(this.props)
        return (
            <div>
            {this.handleDisplayType()}
    
            <Modal
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              open={this.state.open}
              onClose={this.handleClose}
            >
              <Paper style={getModalStyle()} className={classes.paper}>
                <Typography variant="h4">
                  Edit This Class
                </Typography>

                <TextField
                    label="Class Name:"
                    defaultValue={this.props.class_name}
                />
                
                <TextField
                    label="Subject:"
                    defaultValue={this.props.subject}
                />
                    
                <TextField
                    label="Grade Level:"
                    defaultValue={this.props.grade_level}
                />

                <TextField
                    label="Number Of Students:"
                    defaultValue={this.props.number_of_students}
                />

                <TextField
                    label="Teacher's Name:"
                    defaultValue={this.props.teacher_name}
                />


                <Button
                  onClick={() => this.handleEdit()}
                  type="submit"
                  variant="contained"
                  className={classes.button}
                >
                  Save
                </Button>
              </Paper>
            </Modal>
          </div>
        );
    }
}


ClassListModal.propTypes = {
    classes: PropTypes.object.isRequired
};
  
const mapStateToProps = state => {
    return {};
};
  
const ClassListModalWrapped = withStyles(styles)(ClassListModal);
  
  export default connect(
    mapStateToProps,
    {
        editClass
    }
)(withRouter(ClassListModalWrapped));