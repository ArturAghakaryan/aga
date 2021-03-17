import contextTypes from "./contextTypes";

const appReducer = (state, action) => {
  switch (action.type) {
    case contextTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case contextTypes.REMOVE_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};

export default appReducer;
