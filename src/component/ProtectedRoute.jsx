import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children, allowedRoles }) => {
  // const { user, token } = useSelector((state) => state.auth);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // Extract fields from userInfo
  const email = userInfo.email;
  const token = userInfo.token;
  const user = userInfo.user;

  // console.log("Role Comparison - User Role:", user);
  // console.log("Role Comparison - Allowed Roles:", allowedRoles);
  // console.log("Comparison Result:", allowedRoles.includes(user));
  console.log("User Role:", user);
  console.log("TOken:", token);

  // Debugging log to track state
  // console.log("ProtectedRoute - Auth State:", { user, token });

  if (!token) {
    Swal.fire({
      title: "Unauthorized",
      text: "Please log in to access this page.(token expired)",
      icon: "warning",
      timer: 3000,
      showConfirmButton: false,
    });
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user)) {
    Swal.fire({
      title: "Access Denied",
      text: "You do not have permission to access this page. (role invalid)",
      icon: "error",
      // timer: 3000,
      showConfirmButton: false,
    });
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
