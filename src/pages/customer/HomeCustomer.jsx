import React from "react";
import { Outlet } from "react-router-dom"; // Ensure Outlet is imported
import { Box, Typography } from "@mui/material";
// import SlideNavbar from "../../component/admin/SlideNavbar";
import SlideNavbar from "../../component/customer/SlideNavbar";

const HomeCustomer = () => {
  return (
    <div>
      <SlideNavbar />
      {/* This will render OrdersPage or ReportsPage */}
    </div>
  );
};

export default HomeCustomer;
