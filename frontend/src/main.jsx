import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "./context/AppContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </AppContextProvider>
  </React.StrictMode>
);
