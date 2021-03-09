import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import AppContextProvider from "context/AppContextProvider";
import AppRoutes from "routes/AppRoutes";

import "react-toastify/dist/ReactToastify.css";
import "./styles/_all.scss";

function App() {
  return (
    <>
      <AppContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppContextProvider>
      <ToastContainer position="bottom-right" className="app-toast-container" />
    </>
  );
}

export default App;
