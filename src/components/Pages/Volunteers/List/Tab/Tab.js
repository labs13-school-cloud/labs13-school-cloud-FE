// Main page fro displaying a list of all classes
import React, { useEffect } from  "react";
import { connect } from  "react-redux";


import history from "history.js";

import DeleteModal from "../../../../UI/Modals/deleteModal";

import { getVolunteers, addVolunteer } from "store/actions/volunteerActions";

import { Typography } from "@material-ui/core/";
import { ListStyles } from "./styles.js";


function  AdminVolunteerTab(props) {
    const { getVolunteers } = props;
    useEffect(() => {
       getVolunteers()
    }, [getVolunteers]);


    console.log(props)
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-evenly" }}>
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
                                            {`Email:
                                             ${email}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Role: ${role}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Approved: ${approved}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Donator: ${donator}`}
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
    console.log("TEST", state)
    return {
      volunteers: state.userReducer.volunteers
    }
};

export default connect(
    mapStateToProps,
    { getVolunteers, addVolunteer }
)(AdminVolunteerTab);