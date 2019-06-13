// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import styled from "styled-components";

import history from "history.js";

import DeleteModal from "../../../../UI/Modals/deleteModal";
import { getClassList } from "../../../../../store/actions/classesActions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

function  Overview(props) {
    useEffect(() => {
        props.getClassList()
    }, [getClassList]);

    console.log(props)
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.getFiltered(props.classList).map(
                ({ id, class_name, subject, grade_level, number_of_students, teacher_name }) => {
                    return (
                        <ListStyles key={id} component="li" className={props.classList.listItem}>
                            {/* <ListItemText
                                primary={class_name}
                                secondary={`Number Of Students: ${number_of_students}`}
                                secondary={`Teacher Name: ${teacher_name}`}
                                secondary={`Grade Level: ${grade_level}`}
                                secondary={`Subject: ${subject}`}
                                onClick={() => history.push(`home/classes/${id}`)}
                            />
                            <DeleteModal 
                                deleteType="class"
                                classId={id}
                                className={`material-icons ${props.classList.icons}`}
                            /> */}
                            <Typography key={id}>
                                <div 
                                style={{ cursor: "pointer" }}
                                onClick={() => history.push(`home/classes/${id}`)}
                                >
                                    <Typography variant="subtitle1" style={{ display:"flex", justifyContent:"space-between" }}>
                                        {class_name}
                                    <DeleteModal 
                                        deleteType="class"
                                        classId={id}
                                        className={`material-icons ${props.classList.icons}`}
                                    />
                                    </Typography>
                                    <hr />
                                    <Typography variant="overline">
                                        {`Subject: ${subject}`}
                                    </Typography>
                                    <Typography variant="overline">
                                        {`Grade Level: ${grade_level}`}
                                    </Typography>
                                    <Typography variant="overline">
                                        {`Teacher Name: ${teacher_name}`}
                                    </Typography>
                                    <Typography variant="overline">
                                        {`Number Of Students: ${number_of_students}`}
                                    </Typography>
                                </div>
                            </Typography>
                        </ListStyles>
                    )
                }
            )}
        </div>
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
)(Overview);
//   (withStyles(ListStyles)  
const SingleClass = styled(ListItem)``;