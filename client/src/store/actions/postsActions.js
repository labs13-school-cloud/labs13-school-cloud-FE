import axios from "axios";

// GET POSTS
export const GET_POSTS_START = "GET_POSTS_START";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAIL = "GET_POSTS_FAIL";

// GET SINGLE POST
export const GET_SINGLE_POST_START = "GET_SINGLE_POST_START";
export const GET_SINGLE_POST_SUCCESS = "GET_SINGLE_POST_SUCCESS";
export const GET_SINGLE_POST_FAIL = "GET_SINGLE_POST_FAIL";

// ADD A NEW POST
export const ADD_POST_START = "ADD_POST_START";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAIL = "ADD_POST_FAIL";

// EDIT A POST
// export const EDIT_POST_START = "EDIT_POST_START";
// export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
// export const EDIT_POST_FAIL = "EDIT_POST_FAIL";

// // DELETE A POST
// export const DELETE_POST_START = "DELETE_POST_START";
// export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
// export const DELETE_POST_FAIL = "DELETE_POST_FAIL";

// GET all posts for a training series
export const getTrainingSeriesPosts = id => dispatch => {
  dispatch({
    type: GET_POSTS_START
  });
  axios
    .get(`${process.env.REACT_APP_API}/api/training-series/${id}/posts`)
    .then(res =>
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => dispatch({ type: GET_POSTS_FAIL, error: err }));
};

//GET a single post by id
export const getPostById = id => dispatch => {
  dispatch({ type: GET_SINGLE_POST_START });
  axios
    .get(`${process.env.REACT_APP_API}/api/posts/${id}`)
    .then(res =>
      dispatch({ type: GET_SINGLE_POST_SUCCESS, payload: res.data.post })
    )
    .catch(err => dispatch({ type: GET_SINGLE_POST_FAIL, error: err }));
};

// POST a new post
export const createAPost = post => dispatch => {
  dispatch({ type: ADD_POST_START });
  console.log("post in createAPost", post);
  axios
    .post(`${process.env.REACT_APP_API}/api/posts`, post)
    .then(res =>
      dispatch({ type: ADD_POST_SUCCESS, payload: res.data.newPost })
    )
    .catch(err => dispatch({ type: ADD_POST_FAIL, error: err }));
};

// PUT a post

// DELETE a post
