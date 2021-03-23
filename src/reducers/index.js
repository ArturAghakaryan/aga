import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk'
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import todosReducer from './todosReducer'

const reducers = combineReducers({
    user: userReducer,
    posts: postReducer,
    todos: todosReducer,
})

const initialState = {
    user: {
        data: JSON.parse(localStorage.getItem('user')) || null,
    },
    posts: {
        data: null,
        hesMore: false,
        startAt: 1,
        endAt: null
    },
    todos: {
        data: null,
        hasMore: false,
        startAt: 1,
        endAt: null
    }
}

export const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));