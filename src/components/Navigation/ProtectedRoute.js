import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  //check if user is login in
  const userLogin = useSelector(state => state?.users?.userAuth);
  return userLogin ? <Outlet /> : <Navigate to="/login" />

};

export default ProtectedRoute;
