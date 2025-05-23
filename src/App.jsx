import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "../src/component/ProtectedRoute";
import HomeCutomer from "./pages/customer/HomeCustomer"; // Customer Home page
import ReportsPage from "./pages/customer/ReportsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerRegister from "./pages/CustomerRegister";
import RestroOwnerRegister from "./pages/RestroOwnerRegister";
import AdminRegister from "./pages/AdminRegister";
import HomeAdmin from "./pages/admin/HomeAdmin";
import HomeRestroOwner from "./pages/restuarantowner/HomeRestroOwner";
import Payment from "./pages/customer/Payment";
import RegisterPage from "./pages/RegisterPage";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/register/restro-owner" element={<RegisterPage />} />

          <Route path="/register/customer" element={<CustomerRegister />} />
          <Route path="/register/admin" element={<AdminRegister />} />

          {/* Admin Routes */}

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <HomeAdmin />
              </ProtectedRoute>
            }
          >
            <Route path="*" element={<AdminRoutes />} />
          </Route>

          {/* Customer Routes */}

          <Route
            path="/customer/*"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <HomeCutomer />
              </ProtectedRoute>
            }
          >
            <Route path="*" element={<CustomerRoutes />} />
          </Route>

          <Route
            path="/payment"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <Payment />
              </ProtectedRoute>
            }
          ></Route>

          {/* Restaurant Owner Routes */}
          <Route
            path="/resto-owner"
            element={
              <ProtectedRoute allowedRoles={["restro-owner"]}>
                <HomeRestroOwner />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
