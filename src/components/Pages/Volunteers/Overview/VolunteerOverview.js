// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import styled from "styled-components";

import history from "history.js";

import DeleteModal from "components/UI/Modals/deleteModal";
import { getClassList, deleteClass } from "store/actions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem, ListItemText } from "@material-ui/core/";
import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

function  Overview(props) {
    useEffect(() => {
        props.getClassList()
    }, [props.getClassList]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.getFiltered(props.classList).map(
                ({ id, class_name, subject, grade_level, number_of_students, teacher_name }) => {
                    return (
                        <ListStyles key={id} component="li" className={props.classList.listItem}>
                         
                            <Typography key={id}>
                                <div 
                                style={{ cursor: "pointer" }}
                                // onClick={() => history.push(`home/classes/${id}`)}
                                >
                                    <Typography variant="subtitle1" style={{ display:"flex", justifyContent:"space-between" }}>
                                        {'hello'}
                                    <DeleteModal 
                                        deleteType="classes"
                                        classId={id}
                                        className={`material-icons ${props.classList.icons}`}
                                        // onClick={e => removeClass(id)}
                                        style={{ zIndex: "1000" }}
                                        // removeClass={removeClass}
                                    />
                                    </Typography>
                                    <div onClick={() => history.push(`home/classes/${id}`)}>
                                        
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
    console.log('volunteer state', state)
    return {
      classList: state.classesReducer.classList
    }
};

export default connect(
    mapStateToProps,
    { getClassList, deleteClass }
)(Overview);
