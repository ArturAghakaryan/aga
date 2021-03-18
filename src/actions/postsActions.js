import { reduxActionTypes } from "reducers/reduxActionTypes";

export const setReduxPosts = (posts) => ({
    type: reduxActionTypes.SET_POSTS,
    payload: {
        posts,
    }
});
export const setReduxPostsHesMore = (value) => ({
    type: reduxActionTypes.SET_POSTS_HASE_MORE,
    payload: {
        hesMore: value,
    }
});
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
export const getReduxMorePosts = (posts) => ({
    type: reduxActionTypes.GET_MORE_POSTS,
    payload: {
        posts,
    }
});

export const crateReduxPosts = (posts) => ({
    type: reduxActionTypes.CRATE_POST,
    payload: {
        posts,
    }
});