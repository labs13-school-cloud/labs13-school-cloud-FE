// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";


import history from "history.js";

import DeleteModal from "../../../../UI/Modals/deleteModal";

import { getVolunteers, addVolunteer } from "../../../../../store/actions/volunteerActions";

import { Typography } from "@material-ui/core/";
import { ListStyles } from "./styles.js";


function  AdminVolunteerTab(props) {
    useEffect(() => {
        props.getVolunteers()
    }, [getVolunteers]);


    console.log(props)
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end" }}>
            {props.getFiltered(props.volunteers).map(
                ({ id, name, email, role, approved, donator }) => {
                    console.log(id)
                    return (
                        <ListStyles key={id} component="li" className={props.volunteers.listItem}>
                         
                            <Typography key={id}>
                                <div 
                                style={{ cursor: "pointer" }}
                                >
                                    <Typography variant="subtitle1" style={{ display:"flex", justifyContent:"space-between" }}>
                                        {name}
                                    <DeleteModal 
                                        deleteType="volunteeer"
                                        classId={id}
                                        className={`material-icons ${props.volunteers.icons}`}
                                        style={{ zIndex: "1000" }}
                                    />
                                    </Typography>
                                    <div onClick={() => history.push(`home/volunteers/${id}`)}>
                                        
                                        <hr />
                                        <Typography variant="overline">
                                            {`Subject: ${email}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Grade Level: ${role}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Teacher Name: ${approved}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Number Of Students: ${donator}`}
                                        </Typography>
                                    </div>

                                </div>
                            </Typography>
                        </ListStyles>
                    )
                 } 
            )}
            {/* <AddClassModal 
            className={`material-icons ${props.volunteers.icons}`}
            
            /> */}

        </div>
    )
}

const mapStateToProps = state => {
    return {
      volunteers: state.classesReducer.volunteers
    }
};

export default connect(
    mapStateToProps,
    { getVolunteers, addVolunteer }
)(AdminVolunteerTab);