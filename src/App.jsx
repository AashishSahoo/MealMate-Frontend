import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "../src/component/ProtectedRoute";
import HomeCutomer from "./pages/customer/HomeCustomer"; // Customer Home page
// import OrdersPage from "./pages/customer/OrdersPage";
import ReportsPage from "./pages/customer/ReportsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerRegister from "./pages/CustomerRegister";
import RestroOwnerRegister from "./pages/RestroOwnerRegister";
// import RestuarantDashboard from "./restro-owner/RestuarantDashboard";
import Home1 from "./pages/Home1";
import AdminRegister from "./pages/AdminRegister";
import HomeAdmin from "./pages/admin/HomeAdmin";
import HomeRestroOwner from "./pages/restuarantowner/HomeRestroOwner";
// import Home1 from "./pages/HomeRestroOwner";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/register/resto-owner"
            element={<RestroOwnerRegister />}
          />
          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <HomeAdmin />
              </ProtectedRoute>
            }
          />

          {/* Restaurant Owner Routes */}
          <Route
            path="/resto-owner"
            element={
              <ProtectedRoute allowedRoles={["restro-owner"]}>
                <HomeRestroOwner />
              </ProtectedRoute>
            }
          />

          {/* Customer Routes */}

          <Route
            path="/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <HomeCutomer />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes for Orders and Reports */}
            {/* <Route path="orders" element={<OrdersPage />} /> */}
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
