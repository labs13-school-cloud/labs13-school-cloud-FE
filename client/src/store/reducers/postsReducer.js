import {
    GET_POSTS_START,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    GET_SINGLE_POST_START,
    GET_SINGLE_POST_SUCCESS,
    GET_SINGLE_POST_FAIL,
    ADD_POST_START,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL
} from '../actions';

const initialState = {
    posts: [],
    singleTrainingSeries: {},
    singlePost: [],
    isLoading: false,
    error: "",
    addedSuccessfully: false
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        // ---GET ACTIVITIES---
        case GET_POSTS_START:
        return {
            ...state,
            isLoading: true,
            error: ""
        };
        case GET_POSTS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            isAdding: false,
            posts: action.payload.posts,
            singleTrainingSeries: action.payload.trainingSeries

        };
        case GET_POSTS_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
        case GET_SINGLE_POST_START:
        return {
            ...state,
            isLoading: true,
            error: ""
        };
        case GET_SINGLE_POST_SUCCESS:
        return {
            ...state,
            isLoading: false,
            post: action.payload
        };
        case GET_SINGLE_POST_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.payload
        };
        // ---POST ACTIVITIES---
        case ADD_POST_START:
        return {
            ...state,
            isAdding: true,
            error: "",
            addedSuccessfully: false
        }
        case ADD_POST_SUCCESS:
        return {
            ...state,
            isAdding: false,
            addedSuccessfully: true,
            singlePost: action.payload
        };
        case ADD_POST_FAIL:
        return {
            ...state,
            isAdding: false,
            error: action.payload
        };
        default: return state;
    }
}

export default postsReducer;