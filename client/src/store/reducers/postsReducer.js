import {
    GET_POSTS_START,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    GET_SINGLE_POST_START,
    GET_SINGLE_POST_SUCCESS,
    GET_SINGLE_POST_FAIL,
    ADD_POST_START,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL,
    EDIT_POST_START,
    EDIT_POST_SUCCESS,
    EDIT_POST_FAIL,
    DELETE_POST_START,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL,
} from '../actions';

const initialState = {
    posts: [],
    singleTrainingSeries: {},
    isLoading: false,
    isAdding: false,
    isEditing: false,
    isDeleting: false,
    error: "",
    addedSuccessfully: false,
    editedSuccessfully: false,
    deletedSuccessfully: false
}

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        // ---GET ACTIVITIES---
        case GET_POSTS_START:
        return {
            ...state,
            isLoading: true,
            isAdding: false,
            error: ""
        };
        case GET_POSTS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            posts: action.payload.posts,
            singleTrainingSeries: action.payload.trainingSeries

        };
        case GET_POSTS_FAIL:
        return {
            ...state,
            isLoading: false,
            error: action.error
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
            error: action.error
        };
        // ---POST ACTIVITIES---
        case ADD_POST_START:
        return {
            ...state,
            isAdding: true,
            error: "",
        }
        case ADD_POST_SUCCESS:
        return {
            ...state,
            isAdding: false,
            addedSuccessfully: true,
            posts: [...state.posts, action.payload]
        };
        case ADD_POST_FAIL:
        return {
            ...state,
            isAdding: false,
            error: action.error
        };
        // ---EDIT ACTIVITIES---
        case EDIT_POST_START:
        return {
            ...state,
            isEditing: true,
            error: ""
        };
        case EDIT_POST_SUCCESS:
        const updatedPosts = state.posts.map(post => {
            if (post.postID === action.payload.postID) {
              return {
                ...post,
                postName: action.payload.postName,
                postDetails: action.payload.postDetails,
                link: action.payload.link,
                daysFromStart: action.payload.daysFromStart
              };
            } else return post;
          });
        return {
            ...state,
            isEditing: false,
            editedSuccessfully: true,
            posts: updatedPosts
        };
        case EDIT_POST_FAIL:
        return {
            ...state,
            isEditing: false,
            error: action.error
        };
        case DELETE_POST_START:
        return {
            ...state,
            isDeleting: true,
            error: ""
        };
        case DELETE_POST_SUCCESS:
        return {
            ...state,
            isDeleting: false,
            deletedSuccessfully: true
        };
        case DELETE_POST_FAIL:
        return {
            ...state,
            isDeleting: false,
            error: action.error
        };
        default: return state;
    }
}

export default postsReducer;