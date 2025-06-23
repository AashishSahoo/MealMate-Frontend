import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../component/ProtectedRoute";
import HomeAdmin from "../pages/admin/HomeAdmin";
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import OrderAdmin from "../pages/admin/OrderAdmin";
import Onboard from "../pages/admin/Onboard";
import UserList from "../pages/admin/UserList";
import RestroOwnerList from "../pages/admin/RestroOwnerList";
import Category from "../pages/admin/Category";
import OrderHeatmap from "../pages/admin/OrderHeatmap";
import ProfilePageAdmin from "../pages/admin/ProfilePageAdmin";
import React from "react";

const AdminRoutes = () => (
  <Routes>
    <Route index element={<DashboardAdmin />} />
    <Route path="dashboard" element={<DashboardAdmin />} />
    <Route path="orders" element={<OrderAdmin />} />
    <Route path="onboard" element={<Onboard />} />
    <Route path="users" element={<UserList />} />
    <Route path="restaurants" element={<RestroOwnerList />} />
    <Route path="categories" element={<Category />} />
    <Route path="analytics" element={<OrderHeatmap />} />
    <Route path="profile" element={<ProfilePageAdmin />} />
  </Routes>
);

export default AdminRoutes;


