import { reduxActionTypes } from "reducers/reduxActionTypes";

export const setReduxUser = (user) => ({
    type: reduxActionTypes.SET_USER,
    payload: {
        user,
    }
});
export const removeReduxUser = () => {
    return {
        type: reduxActionTypes.REMOVE_USER,
    }
};
