import * as React from "react";

import Orderpage from "../pages/restuarantowner/OrderPage";
import DashboardRestrOwner from "../pages/restuarantowner/DashboardRestrOwner";
import TableBookingManagement from "../pages/restuarantowner/TableBookingManagement";
import Products from "../pages/restuarantowner/Products";
import OrderHistory from "../pages/restuarantowner/OrderHistory";
import { Avatar, Badge, Button, Collapse } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SalesByCategoryChart from "../pages/restuarantowner/SalesByCategoryChart";
import SaleByMonth from "../pages/restuarantowner/SaleByMonth";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { BsGraphUp, BsCalendarMonth } from "react-icons/bs";
import ProfilePage from "../pages/restuarantowner/ProfilePage";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RestroOwnerRoutes = () => (
  <Routes>
    <Route index element={<DashboardRestrOwner />} />
    <Route path="dashboard" element={<DashboardRestrOwner />} />
    <Route path="orders" element={<Orderpage />} />
    <Route path="products" element={<Products />} />
    <Route path="table-booking" element={<TableBookingManagement />} />
    <Route path="order-history" element={<OrderHistory />} />
    <Route path="sales-category" element={<SalesByCategoryChart />} />
    <Route path="sales-month" element={<SaleByMonth />} />
    <Route path="profile" element={<ProfilePage />} />
  </Routes>
);

export default RestroOwnerRoutes;
