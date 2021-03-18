import { reduxActionTypes } from './reduxActionTypes'

const initialState = {
    data: JSON.parse(localStorage.getItem('user')) || null,
}

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case reduxActionTypes.SET_USER:
            return {
                ...state,
                data: action.payload.user,
            };
        case reduxActionTypes.REMOVE_USER:
            return {
                ...state,
                data: null
            };
        default:
            return state;
    }

}

export default userReducer;