import React from "react";
import { Outlet } from "react-router-dom"; // Ensure Outlet is imported
import { Box, Typography } from "@mui/material";
import SlideNavbar from "../../component/restuarantowner/SlideNavbar";

const HomeRestroOwner = () => {
  return (
    <div>
      <SlideNavbar />

      {/* This will render OrdersPage or ReportsPage */}
    </div>
  );
};

export default HomeRestroOwner;
