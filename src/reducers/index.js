import { createStore, combineReducers } from "redux";

import userReducer from "./userReducer";
import postReducer from "./postReducer";

const reducers = combineReducers({
    user: userReducer,
    posts: postReducer,
})

export const store = createStore(reducers);