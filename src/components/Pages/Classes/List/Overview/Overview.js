// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import styled from "styled-components";

import history from "history.js";

import DeleteModal from "../../../../UI/Modals/deleteModal";
import AddModal from "../../../../UI/Modals/addModal";
import { getClassList, deleteClass } from "../../../../../store/actions/classesActions";

import { withStyles } from "@material-ui/core/styles";
import { ListItem,
         ListItemText,
         Typography,
         Fab,
         TextField,
         InputAdornment
        } from "@material-ui/core/";
import { ListStyles } from "./styles.js";
// import { Typography } from "@material-ui/core/";

function  Overview(props) {
    useEffect(() => {
        props.getClassList();
    }, [getClassList]);

    // {props.getFiltered(props.classList).map
    console.log(props)
    return (
        <div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.classList.map(c => {
                console.log(c.id)
                return (
                    <ListStyles key={c.id} component="li" className={props.classList.listItem}>
                         
                            <Typography key={c.id}>
                                <div 
                                style={{ cursor: "pointer" }}
                                >
                                    <Typography variant="subtitle1" style={{ display:"flex", justifyContent:"space-between" }}>
                                        {c.class_name}
                                    <DeleteModal 
                                        deleteType="classes"
                                        classId={c.id}
                                        className={`material-icons ${props.classList.icons}`}
                                        />
                                    </Typography>
                                    <div onClick={() => history.push(`home/classes/${c.id}`)}>
                                        
                                        <hr />
                                        <Typography variant="overline">
                                            {`Subject: ${c.subject}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Grade Level: ${c.grade_level}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Teacher Name: ${c.teacher_name}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Number Of Students: ${c.number_of_students}`}
                                        </Typography>
                                    </div>
                                </div>
                            <AddModal
                                classList={c}
                                addType="classes"
                                />
                            </Typography>
                        </ListStyles>
                    )
                } 
                )}
                </div>
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
    { getClassList, deleteClass }
)(Overview);
