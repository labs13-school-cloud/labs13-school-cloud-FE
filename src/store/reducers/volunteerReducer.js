// ACTION IMPORTS
import {
    // GET VOLUNTEERS
    GET_VOLUNTEERS_START,
    GET_VOLUNTEERS_SUCCESS,
    GET_VOLUNTEERS_FAILURE,
    // DELETE VOLUNTEERS
    DELETE_VOLUNTEER_START,
    DELETE_VOLUNTEER_SUCCESS,
    DELETE_VOLUNTEER_FAILURE
} from "../actions/volunteerActions/actions.js"

const initialState = {
    volunteers: [],
    isLoading: false,
    isDeleting: false,
    error: ""
}

const volunteerReducer = (state = initialState, action) => {
    switch(action.type) {
        // GET VOLUNTEERS
        case GET_VOLUNTEERS_START:
            return { ...state, isLoading: true };
        case GET_VOLUNTEERS_SUCCESS:
            return { ...state, isLoading: false, volunteers: action.payload }
        case GET_VOLUNTEERS_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        // DELETE VOLUNTEERS
        case DELETE_VOLUNTEER_START:
            return { ...state, isDeleting: true };
        case DELETE_VOLUNTEER_SUCCESS:
            return {
                ...state,
                volunteers: [
                    ...state.volunteers.filter(volunteer => {
                        return volunteer.id !== action.payload
                    })
                ],
                isDeleting: false 
            }
        case DELETE_VOLUNTEER_FAILURE:
            return { ...state, isDeleting: false, error: action.payload, }
        default: 
            return state;
    }
}

export default volunteerReducer;