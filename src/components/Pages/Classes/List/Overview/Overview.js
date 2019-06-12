// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import styled from "styled-components";

import history from "history.js";

import DeleteModal from "../../../../UI/Modals/deleteModal";
import { getClassList } from "../../../../../store/actions/classesActions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles, styles } from "./styles.js";

function  Overview(props) {
    useEffect(() => {
        props.getClassList()
    }, [getClassList]);

    console.log(props)
    return (
        <ListStyles>
            {props.getFiltered(props.classList).map(
                ({ id, class_name, subject, grade_level, number_of_students, teacher_name, class_id }) => {
                    return (
                        <SingleClass key={id} component="li" className={props.classList.listItem}>
                            <ListItemText
                                primary={class_name}
                                secondary={`Subject: ${subject}, Grade Level: ${grade_level}, Teacher Name: ${teacher_name}, Number Of Students: ${number_of_students}`}
                                onClick={() => history.push(`home/classes/${id}`)}
                            />
                            <DeleteModal 
                                deleteType="class"
                                classId={id}
                                className={`material-icons ${props.classList.icons}`}
                            />
                        </SingleClass>
                    )
                }
            )}
        </ListStyles>
    )
}

const mapStateToProps = state => {
    return {
      classList: state.classesReducer.classList
    }
};

export default connect(
    mapStateToProps,
    { getClassList }
)(withStyles(styles)(Overview));

const SingleClass = styled(ListItem)``;