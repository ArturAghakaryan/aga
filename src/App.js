import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppContextProvider from "context/AppContextProvider";
import AppRoutes from "routes/AppRoutes";
import { store } from 'reducers'

import "react-toastify/dist/ReactToastify.css";
import "./styles/_all.scss";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppContextProvider>
      </Provider>
      <ToastContainer position="bottom-right" className="app-toast-container" />
    </>
  );
}

export default App;
