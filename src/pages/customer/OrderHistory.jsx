import React, { useEffect, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TablePagination,
  Chip,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderId, setOpenOrderId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email || null;
  const token = userInfo.token || null;

  const fetchAllOrderHistory = async () => {
    try {
      const response = await axios.get(
        `/api/orders/getAllOrdersByUser/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.resultCode === 0) {
        setOrders(response.data.resultData);
      }
    } catch (error) {
      console.log("Error fetching the orders history:", error);
    }
  };

  useEffect(() => {
    fetchAllOrderHistory();
    console.log(orders, "orders");
  }, []);

  const toggleRow = (orderId) => {
    setOpenOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 4px 20px rgba(138, 43, 226, 0.2)",
        }}
      >
        <RestaurantIcon sx={{ fontSize: 30, color: "#fff" }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, letterSpacing: "0.5px" }}
        >
          Order History
        </Typography>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerStyle}>Sr No</TableCell>
              <TableCell sx={headerStyle}>Order ID</TableCell>
              <TableCell sx={headerStyle}>Date</TableCell>
              <TableCell sx={headerStyle}>Restaurant</TableCell>
              <TableCell sx={headerStyle}>Delivery Address</TableCell>
              <TableCell sx={headerStyle}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order, idx) => (
                <React.Fragment key={order._id}>
                  {/* Parent Row */}
                  <TableRow hover>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => toggleRow(order._id)}
                        >
                          {openOrderId === order._id ? (
                            <KeyboardArrowUp />
                          ) : (
                            <KeyboardArrowDown />
                          )}
                        </IconButton>
                        <Typography variant="body2">
                          {page * rowsPerPage + idx + 1}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order?.restaurant?.restaurantName}</TableCell>
                    <TableCell>{order?.user?.address}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={
                          order.status === "processing"
                            ? "info"
                            : order.status === "cancelled"
                              ? "error"
                              : "success"
                        }
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </TableCell>
                  </TableRow>

                  {/* Collapsible Row */}
                  <TableRow>
                    <TableCell colSpan={6} sx={{ p: 0 }}>
                      <Collapse
                        in={openOrderId === order._id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            sx={{ fontWeight: 600 }}
                          >
                            Ordered Items{" "}
                            {order.status === "cancelled" && (
                              <Typography variant="caption" color="error" >
                                {" "}
                                (Order is been rejected by Restaurant and your
                                money will be refunded in 3-5 working days )
                              </Typography>
                            )}
                          </Typography>
                          <Table
                            size="small"
                            sx={{ backgroundColor: "#F9F9F9", borderRadius: 2 }}
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell sx={collapseHeadStyle}>
                                  Item
                                </TableCell>
                                <TableCell sx={collapseHeadStyle}>
                                  Price
                                </TableCell>
                                <TableCell sx={collapseHeadStyle}>
                                  Quantity
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {order.items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>{item.food?.name}</TableCell>
                                  <TableCell>₹{item.price}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                </TableRow>
                              ))}
                              <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  Total
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  ₹{order.totalAmount}
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>
                                  {order.items.reduce(
                                    (total, item) => total + item.quantity,
                                    0
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

// Reusable styles
const headerStyle = {
  fontWeight: 700,
  color: "#8A2BE2",
  fontSize: "0.95rem",
  backgroundColor: "#F8F9FA",
};

const collapseHeadStyle = {
  fontWeight: 600,
  fontSize: "0.9rem",
  backgroundColor: "#ECECEC",
};

export default OrderHistory;
