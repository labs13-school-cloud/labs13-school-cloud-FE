// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import styled from "styled-components";

import history from "../../../../../history.js";

import DeleteModal from "../../../../UI/Modals/deleteModal";
import { getClasses } from "../../../../../store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js.js";

function  Overview({
    getClasses,
    classes,
    getFiltered,
    class_id
}) {
    useEffect(() => {
        getClasses
    }, [getClasses]);

    return (
        <ListStyles>
            {getFiltered(classes).map(
                ({ id, class_name, subject, grade_level, number_of_students, teacher_name, class_id }) => {
                    return (
                        <SingleClass key={id} component="li" className={classes.listItem}>
                            <ListItemText
                                primary={class_name}
                                secondary={`Subject: ${subject}, Grade Level: ${grade_level}, Teacher Name: ${teacher_name}, Number Of Students: ${number_of_students}`}
                                onClick={() => history.push(`home/classes/${id}`)}
                            />
                            <DeleteModal 
                                deleteType="classes"
                                classId={id}
                                className={`material-icons ${classes.icons}`}
                            />
                        </SingleClass>
                    )
                }
            )}
        </ListStyles>
    )
}

const mapStateToProps = state => ({
    classes: state.classesReducer.classes
});

export default connect(
    mapStateToProps,
    { getClasses }
)(withStyles(styles)(Overview));

const SingleClass = styled(ListItem)``;