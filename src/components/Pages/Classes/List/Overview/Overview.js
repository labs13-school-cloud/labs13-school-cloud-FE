// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import history from "history.js";

import DeleteModal from "components/UI/Modals/deleteModal";
import EditModal from "components/UI/Modals/editModal";
import { getClassList, deleteClass } from "store/actions/classesActions";

import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

function  Overview(props) {
    useEffect(() => {
        props.getClassList();
    }, [getClassList]);

    console.log(props)
    return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
            {props.classList.map(c => {
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
                                    <EditModal
                                        classList={c}
                                        updateType="classes"
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
    { getClassList, deleteClass }
)(Overview);