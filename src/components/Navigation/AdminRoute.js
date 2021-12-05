import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  //check if user is login in
  const userLogin = useSelector(state => state?.users?.userAuth);
  return userLogin?.isAdmin ? <Outlet /> : <Navigate to="/not-found" />
};

export default AdminRoute;
