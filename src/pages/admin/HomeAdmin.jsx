import React from "react";
import { Outlet } from "react-router-dom"; // Ensure Outlet is imported
import { Box, Typography } from "@mui/material";
import SlideNavbar from "../../component/admin/SlideNavbar";

const HomeAdmin = () => {
  return (
    <div>
      <SlideNavbar />

      {/* This will render OrdersPage or ReportsPage */}
    </div>
  );
};

export default HomeAdmin;
