import React, { useState, useEffect }  from "react";
import { connect } from "react-redux";

import { editClass, getClassList } from "store/actions";

import { Typography, TextField, Button } from "@material-ui/core/";
import { withStyles } from "@material-ui/core/styles";
import { styles, ClassTitle } from "../styles.js";

function Title(props) {
    const { classes, getClassList } = props;

    const classList =
        props.classList.find(
            c => c.id === parseInt(props.match.params.id, 10)
        ) || {};
    const [title, setTitle] = useState(classList.class_name);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    useEffect(() => {
        getClassList();
    }, [getClassList]);

    useEffect(() => {
        setTitle(classList.class_name)
    }, [classList, setTitle]);

    const updateClassName = e => {
        e.preventDelfault();
        props.editClass(classList.id, {
            class_name,
            user_id: props.user_id
        });
        setIsEditingTitle(false);
    };

    return (
        <>
        {isEditingTitle ? (
            <>

            <form onSubmit={e => updateClassName(e)} autoComplete="off" >
                <ClassTitle>
                    <TextField 
                        id="standard-name"
                        label="Class Name"
                        className={classes.textField}
                        value={class_name}
                        onChange={e => setTitle(e.target.value)}
                        margin="normal"
                    />
                    <div>
                        <Button
                            type="submit"
                            varient="outlined"
                            color="primary"
                            className={classes.button}
                        >
                            Save
                        </Button>
                    </div>
                </ClassTitle>
            </form>

            </>
        ) : (
            <ClassTitle onClick={() => setIsEditingTitle(!isEditingTitle)} >
                <Typography variant="headline">
                    {`${class_name} \u00A0`}
                </Typography>
                <i
                    style={{ fontSize:25 }}
                    className={`material-icons ${classes.icons}`}
                >
                    Edit
                </i>
            </ClassTitle>
        )}
        </>
    )
}

const mapStateToProps = state => ({
    classList: state.classListReducer.classList
});

export default connect(
    mapStateToProps,
    { editClass, getClassList }
)(withStyles(styles)(Title));