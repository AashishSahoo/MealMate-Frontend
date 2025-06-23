import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Collapse,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fade,
  Skeleton,
} from "@mui/material";
import breakfast from "../../assets/breakfast.png";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { id: "userName", label: "Username", minWidth: 150 },
  { id: "userId", label: "User ID", minWidth: 100 },
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "date", label: "Date of Order", minWidth: 150 },
];

export default function OrderHistoryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [filterRestaurant, setFilterRestaurant] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const token = userInfo.token;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleFilterRestaurantChange = (event) => {
    setFilterRestaurant(event.target.value);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "#1976d2";
      case "processing":
        return "#ed6c02";
      case "cancelled":
        return "#E31D1A";
      default:
        return "#1976d2";
    }
  };

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/getAllOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setAllOrders(response?.data?.resultData);
        setFilteredOrders(response?.data?.resultData);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    const filtered = allOrders.filter((order) => {
      const matchesRestaurant =
        !filterRestaurant ||
        order.restaurant.restaurantName === filterRestaurant;
      return matchesRestaurant;
    });
    setFilteredOrders(filtered);
    setPage(0);
  }, [filterRestaurant, allOrders]);

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            marginBottom: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Order Management
            </Typography>
            <FormControl sx={{ minWidth: 240 }} size="small">
              <InputLabel>Restaurant</InputLabel>
              <Select
                value={filterRestaurant}
                onChange={handleFilterRestaurantChange}
                label="Restaurant"
              >
                <MenuItem value="">All Restaurants</MenuItem>
                {Array.from(
                  new Set(
                    allOrders.map((order) => order.restaurant.restaurantName)
                  )
                ).map((restaurant) => (
                  <MenuItem key={restaurant} value={restaurant}>
                    {restaurant}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <img
            src={breakfast}
            alt="header"
            style={{ height: "7rem", width: "auto" }}
          />
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    sx={{ backgroundColor: "#f5f5f5", fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from({ length: rowsPerPage }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Skeleton variant="text" animation="wave" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <Typography variant="body2" color="textSecondary">
                      No data present
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order) => (
                    <React.Fragment key={order._id}>
                      <TableRow
                        hover
                        onClick={() => handleRowClick(order._id)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          {order.user.firstName} {order.user.lastName}
                        </TableCell>
                        <TableCell>{order.user._id}</TableCell>
                        <TableCell>{order._id}</TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>
                          ₹{order.totalAmount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              backgroundColor: `${getStatusColor(order.status)}15`,
                              color: getStatusColor(order.status),
                              padding: "6px 16px",
                              borderRadius: "20px",
                              display: "inline-block",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            {order.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={6} sx={{ padding: 0 }}>
                          <Collapse in={expandedOrderId === order._id}>
                            <Box
                              sx={{
                                margin: 2,
                                padding: 3,
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                sx={{ fontWeight: 600, mb: 2 }}
                              >
                                Order Details
                              </Typography>
                              <Box sx={{ display: "grid", gap: 2 }}>
                                <Typography variant="body2">
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#B96B1A",
                                    }}
                                  >
                                    Items:
                                  </span>{" "}
                                  {order.items
                                    .map((item) => item.food.name)
                                    .join(", ")}
                                </Typography>
                                <Typography variant="body2">
                                  <span
                                    style={{
                                      fontWeight: 600,
                                      color: "#B96B1A",
                                    }}
                                  >
                                    Restaurant:
                                  </span>{" "}
                                  {order.restaurant.restaurantName}
                                </Typography>
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ borderTop: "1px solid #e0e0e0", mt: 2 }}
        />
      </Paper>
    </Fade>
  );
}
