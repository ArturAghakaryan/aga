import { reduxActionTypes } from './reduxActionTypes'

const initialState = {
    data: null,
    hesMore: false,
    startAt: 1,
    endAt: null
}

const postReducer = (state = initialState, action) => {

    switch (action.type) {
        case reduxActionTypes.SET_POSTS:
            return {
                ...state,
                data: action.payload.posts
            };
        case reduxActionTypes.SET_POSTS_HASE_MORE:
            return {
                ...state,
                hesMore: action.payload.hesMore
            };
        case reduxActionTypes.SET_POSTS_STARTAT:
            return {
                ...state,
                startAt: action.payload.startAt
            };
        case reduxActionTypes.SET_POSTS_ENDAT:
            return {
                ...state,
                endAt: action.payload.endAt
            };
        case reduxActionTypes.GET_MORE_POSTS:
            return {
                ...state,
                data: [...state.data, ...action.payload.posts]
            };
        case reduxActionTypes.CRATE_POST:
            return {
                ...state,
                data: [...state.data, action.payload.posts]
            };
        default:
            return state;
    }

}


export default postReducer;