import { createStore, combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";
import todosReducer from './todosReducer'

const reducers = combineReducers({
    user: userReducer,
    posts: postReducer,
    todos: todosReducer,
})

export const store = createStore(reducers);