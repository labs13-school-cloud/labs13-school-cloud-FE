// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";

import history from "history.js";

import { getClassList } from "store/actions/classesActions";

import { ListStyles } from "./styles.js";
import { Typography } from "@material-ui/core/";

function VolunteerClassTab(props) {
    const { getClassList } = props;
    useEffect(() => {
        getClassList()
    }, [getClassList]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {props.getFiltered(props.classList).map(
                ({ id, class_name, subject, grade_level, number_of_students, teacher_name }) => {
                    return (
                        <ListStyles key={id} component="li" className={props.classList.listItem}>
                            <Typography key={id}>
                                <div 
                                style={{ cursor: "pointer" }}
                                onClick={() => history.push(`home/classes/${id}`)}
                                >
                                    <Typography variant="subtitle1" style={{ display:"flex", justifyContent:"space-between" }}>
                                        {class_name}
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
)(VolunteerClassTab);
