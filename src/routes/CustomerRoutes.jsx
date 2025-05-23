import * as React from "react";
import { useState } from "react";
import DashboardCustomer from "../pages/customer/DashboardCustomer";
import TableBooking from "../pages/customer/TableBooking";
import Menu from "../pages/customer/Menu";
import OrderHistory from "../pages/customer/OrderHistory";
import Cart from "../pages/customer/Cart";
import ProfilePageCustomer from "../pages/customer/ProfilePageCustomer";
import Chatbot from "../pages/customer/Chatbot";
import { Routes, Route } from "react-router-dom";

const CustomerRoutes = () => (
  <Routes>
    <Route index element={<DashboardCustomer />} />
    <Route path="dashboard" element={<DashboardCustomer />} />
    <Route path="menu" element={<Menu />} />
    <Route path="cart" element={<Cart />} />
    <Route path="table-booking" element={<TableBooking />} />
    <Route path="order-history" element={<OrderHistory />} />
    <Route path="profile" element={<ProfilePageCustomer />} />
    <Route path="chatbot" element={<Chatbot />} />{" "}
  </Routes>
);

export default CustomerRoutes;
