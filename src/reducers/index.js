import { createStore } from "redux";
import { reduxActionTypes } from './reduxActionTypes'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    posts: null,
    postsTotalItems: null
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case reduxActionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user,
            };
        case reduxActionTypes.REMOVE_USER:
            return {
                ...state,
                user: null
            };
        case reduxActionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            };
        case reduxActionTypes.SET_POSTS_TOTOAL_ITEMS_COUNT:
            return {
                ...state,
                postsTotalItems: action.payload.postsTotalItems
            };
        case reduxActionTypes.GET_MORE_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts]
            };
        case reduxActionTypes.CRATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload.posts]
            };
        case reduxActionTypes.UPDATE_POST:
            return {
                ...state,
                posts: action.payload.posts
            };
        case reduxActionTypes.DELETE_POST:
            return {
                ...state,
                posts: action.payload.posts
            };
        default:
            return state;
    }

}

export const store = createStore(reducer);