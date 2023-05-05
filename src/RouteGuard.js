import React from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";

const RouteGuard = ({ Children }) => {
  const navigate = useNavigate();

  function hasJWT() {
    let flag = false;

    //check user has JWT token
    localStorage.getItem("token") ? (flag = true) : (flag = false);

    return flag;
  }

  return hasJWT() ? <Outlet/> : <Navigate to="/login" />;
};

export default RouteGuard;
