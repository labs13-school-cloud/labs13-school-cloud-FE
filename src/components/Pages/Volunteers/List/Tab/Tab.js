
// Main page for displaying a list of all volunteers
import React, { useEffect } from  "react";
import { connect } from  "react-redux";


import history from "history.js";

import EditModal from "components/UI/Modals/editModal"
import DeleteModal from "components/UI/Modals/deleteModal";

import { getVolunteers, addVolunteer } from "store/actions/volunteerActions";

import { Typography } from "@material-ui/core/";
import { ListStyles } from "./styles.js";


function  AdminVolunteerTab(props) {
    const { getVolunteers } = props;
    useEffect(() => {
       getVolunteers();
    }, [getVolunteers]);


    // console.log(props)
    return (
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-evenly" }}>
            {props.getFiltered(props.volunteers).map(v => {
                // ({ id, name, email, role, approved, donator }) => {
                    // console.log(v.id)
                    return (
                        <ListStyles key={v.id} component="li" className={props.volunteers.listItem}>
                         
                            {/* <Typography key={v.id}> */}
                                <div 
                                style={{ cursor: "pointer" }}
                                >
                                    <Typography variant="subtitle1" style={{ display:"flex", justifyContent:"space-between" }}>
                                        {v.name}
                                    <DeleteModal 
                                        deleteType="volunteers"
                                        volunteerID={v.id}
                                        className={`material-icons ${props.volunteers.icons}`}
                                        // style={{ zIndex: "1000" }}
                                    />
                                    <EditModal
                                        volunteers={v}
                                        updateType="volunteers"
                                    />
                                    </Typography>
                                    <div onClick={() => history.push(`home/volunteers/${v.id}`)}>
                                        
                                        <hr />
                                        <Typography variant="overline">
                                            {`Email:
                                             ${v.email}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Role: ${v.role}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Approved: ${v.approved}`}
                                        </Typography>
                                        <Typography variant="overline">
                                            {`Donator: ${v.donator}`}
                                        </Typography>
                                    </div>

                                </div>
                            {/* </Typography> */}
                        </ListStyles>
                    )
                 } 
            )}
        </div>
    )
}

const mapStateToProps = state => {
    // console.log("TEST", state)
    return {
      volunteers: state.userReducer.volunteers
    }
};

export default connect(
    mapStateToProps,
    { getVolunteers, addVolunteer }
)(AdminVolunteerTab);