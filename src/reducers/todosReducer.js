import { reduxActionTypes } from './reduxActionTypes';

const initialState = {
    data: null,
    hasMore: false,
    startAt: 1,
    endAt: null
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case reduxActionTypes.SET_TODOS:
            return {
                ...state,
                data: action.payload.todos
            }
        case reduxActionTypes.SET_TODOS_HASMORE:
            return {
                ...state,
                hasMore: action.payload.hasMore
            }
        case reduxActionTypes.GET_MORE_TODOS:
            return {
                ...state,
                data: [...state.data, ...action.payload.todos]
            }
        case reduxActionTypes.SET_TODOS_STARTAT:
            return {
                ...state,
                startAt: action.payload.startAt
            }
        case reduxActionTypes.SET_TODOS_ENDAT:
            return {
                ...state,
                endAt: action.payload.endAt
            }
        case reduxActionTypes.CRATE_TODOS:
            return {
                ...state,
                data: [...state.data, action.payload.todos]
            }
        default:
            return state
    }
}

export default todosReducer;