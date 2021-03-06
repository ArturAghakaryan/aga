import fbService from "api/fbService";
import { reduxActionTypes } from "reducers/reduxActionTypes";

export const setReduxPosts = (startAt, endAt) => (dispatch) => {
    return fbService.postsService.getPosts(startAt, endAt).then((data) => {
        dispatch({
            type: reduxActionTypes.SET_POSTS,
            payload: {
                posts: data,
            }
        })
    });
}

export const getReduxMorePosts = (startAt, endAt, limit) => (dispatch) => {
    return fbService.postsService.getPosts(startAt, endAt).then((data) => {
        setReduxPostsHasMore(data.length < limit ? false : true)(dispatch)
        dispatch({
            type: reduxActionTypes.GET_MORE_POSTS,
            payload: {
                posts: data,
            }
        });
    })
};

export const setReduxDeletePosts = (data) => ({
    type: reduxActionTypes.DELETE_POSTS,
    payload: {
        posts: data,
    }
}) 

export const setReduxUpdatePosts = (data) => ({
    type: reduxActionTypes.UPDATE_POSTS,
    payload: {
        posts: data,
    }
}) 

export const setReduxPostsHasMore = (value) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.SET_POSTS_HASE_MORE,
        payload: {
            hasMore: value,
        }
    })
};

export const setReduxPostsStartAt = (value) => ({
    type: reduxActionTypes.SET_POSTS_STARTAT,
    payload: {
        startAt: value,
    }
});
export const setReduxPostsEndAt = (value) => ({
    type: reduxActionTypes.SET_POSTS_ENDAT,
    payload: {
        endAt: value,
    }
});
export const createReduxPosts = (posts) => ({
    type: reduxActionTypes.CRATE_POST,
    payload: {
        posts,
    }
});