import {
    FETCH_CLASSES_START,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    FETCH_SINGLE_CLASS_START,
    FETCH_SINGLE_CLASS_SUCCESS,
    FETCH_SINGLE_CLASS_FAIL,
    ADD_CLASS_START,
    ADD_CLASS_SUCCESS,
    ADD_CLASS_FAILURE,
    DELETE_CLASS_START,
    DELETE_CLASS_SUCCESS,
    DELETE_CLASS_FAILURE,
    EDIT_CLASS_START,
    EDIT_CLASS_SUCCESS,
    EDIT_CLASS_FAILURE,
} from "../actions";

const initialState = {
    classes: [],
    singleClass: {},
    error: null,
    status: {
        isLoading: false,
        loadSuccess: false,
        isAdding: false,
        addSuccess: false,
        addFailed: false,
        loadFailed: false,
        isEditing: false,
        editSuccess: false,
        editFailed: false,
        isDeleting: false,
        deleteSuccess: false,
        deleteFailed: false,
    }
};

const classesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLASSES_START:
            return {
                ...state,
                status: {
                    ...state.status,
                    isLoading: true,
                    loadSuccess: false,
                    loadFailed: false
                }
            }
        case FETCH_CLASSES_SUCCESS:
            return {
                ...state,
                classes: action.payload.reverse(),
                status: {
                    ...state.status,
                    isLoading: false,
                    loadSuccess: true,
                    loadFailed: false
                }
            }
        case FETCH_CLASSES_FAILURE:
            return {
                ...state,
                error: action.payload,
                status: {
                    ...state.status,
                    loadFailed: true
                }
            }
        case FETCH_SINGLE_CLASS_START:
            return {
                ...state,
                teamMember: {},
                status: {
                ...state.status,
                isLoading: true,
                loadSuccess: false,
                loadFailed: false
                }
            };
        case FETCH_SINGLE_CLASS_SUCCESS:
            return {
                ...state,
                teamMember: action.payload,
                status: {
                ...state.status,
                isLoading: false,
                loadSuccess: true,
                loadFailed: false
                }
            };
        case FETCH_SINGLE_CLASS_FAIL: {
            return {
                ...state,
                state: {
                ...state.status,
                isLoading: false,
                loadSuccess: false,
                loadFailed: true
                }
            };
        }
        case ADD_CLASS_START:
            return {
                ...state,
                status: {
                    ...state.status,
                    isAdding: true,
                    addSuccess: false,
                    addFailed: false,
                }
            }
        case ADD_CLASS_SUCCESS:
            return {
                ...state,
                classes: [...state.classes, action.payload],
                singleClass: action.payload,
                status: {
                    isAdding: false,
                    addSuccess: true,
                    addFailed: false
                }
            }
        case ADD_CLASS_FAILURE: 
            return {
                ...state,
                status: {
                    ...state.status,
                    addFailed: true
                },
                error: action.payload
            };
        case EDIT_CLASS_START:
            return {
                ...state,
                status: {
                    ...state.status,
                    isEditing: true,
                    editSuccess: false,
                    editFailed: false
                }
            }
        case EDIT_CLASS_SUCCESS:
            const updatedClasses = state.classes.map(classes => {
                if (classes.id === action.payload.id) {
                    return {
                        ...classes,
                        ...action.payload
                    };
                } else {
                    return classes;
                }
            });
            return {
                ...state,
                classes: updatedClasses,
                status: {
                    ...state.status,
                    isEditing: false,
                    editSuccess: true
                }
            }
        case EDIT_CLASS_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    editFailed: true,
                    editSuccess: false
                },
                error: action.payload
            };
        case DELETE_CLASS_START:
            return {
                ...state,
                status: {
                    ...state.status,
                    isDeleting: true,
                    deleteFailed: false,
                    deleteSuccess: false
                }
            };
        case DELETE_CLASS_SUCCESS:
            return {
                ...state,
                classes: [
                    ...state.classes.filter(classes => classes.id !== action.payload)
                ],
                status: {
                    ...state,
                    status: {
                        ...state.status,
                        isDeleting: false,
                        deleteSuccess: true,
                        deleteFailed: false
                    }
                }
            };
        case DELETE_CLASS_FAILURE:
            return {
                ...state,
                status: {
                    ...state.status,
                    isDeleting: false,
                    deleteSuccess: false,
                    deleteFailed: true
                },
                error: action.payload
            };
        default:
            return state;
    }
};

export default classesReducer;