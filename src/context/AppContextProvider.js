import React, { useReducer } from "react";

import { AppContext, initialState } from "./AppContext.js";
import appReducer from "./appReducer.js";

const AppContextProvider = ({ children }) => {
  const [state, dispache] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispache }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
