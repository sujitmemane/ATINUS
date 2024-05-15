import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
