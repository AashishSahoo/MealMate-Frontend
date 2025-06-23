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
  Button,
  TablePagination,
  Collapse,
  IconButton,
  Chip,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Fade,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  CheckCircleOutline,
  CancelOutlined,
  AccessTime,
  LocationOn,
  ShoppingBasket,
} from "@mui/icons-material";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { id: "userName", label: "Customer Name", minWidth: 150 },
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 120 },
  { id: "date", label: "Date of Order", minWidth: 180 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "actions", label: "Actions", minWidth: 200 },
];

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRow, setOpenRow] = useState(null);
  const [buttonState, setButtonState] = useState({});
  const [loaderComplete, setLoaderComplete] = useState(true);
  const [loaderCancelled, setLoaderCancelled] = useState(true);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email;
  const token = userInfo.token;

  const fetchAllIncomingOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/getAllIncomingOrdersByRestaurant/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response?.data?.resultCode === 0) {
        setOrders(response.data.resultData || []);
        const newButtonState = {};
        (response.data.resultData || []).forEach((order) => {
          newButtonState[order._id] = {
            acceptLoading: false,
            rejectLoading: false,
            disabled: order.status !== "processing",
          };
        });
        setButtonState(newButtonState);
      }
    } catch (error) {
      console.error("Error fetching incoming orders:", error);
      setOrders([]);
      setButtonState({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIncomingOrders();
  }, []);

  const handleAccept = async (orderId) => {
    setButtonState((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], acceptLoading: true },
    }));

    try {
      await axios.patch(`${BASE_URL}/orders/${orderId}/complete`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAllIncomingOrders();
    } catch (error) {
      console.error("Error accepting order:", error);
    } finally {
      setButtonState((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], acceptLoading: false },
      }));
    }
  };

  const handleReject = async (orderId) => {
    setButtonState((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], rejectLoading: true },
    }));

    try {
      await axios.patch(`${BASE_URL}/orders/${orderId}/cancelled`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchAllIncomingOrders();
    } catch (error) {
      console.error("Error rejecting order:", error);
    } finally {
      setButtonState((prev) => ({
        ...prev,
        [orderId]: { ...prev[orderId], rejectLoading: false },
      }));
    }
  };

  useEffect(() => {
    if (orders.length <= page * rowsPerPage && page > 0) {
      setPage(0);
    }
  }, [orders, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return {
          bgcolor: "#e8f5e9",
          color: "#2e7d32",
          icon: <CheckCircleOutline fontSize="small" sx={{ mr: 1 }} />,
          label: "Accepted",
        };
      case "cancelled":
        return {
          bgcolor: "#ffebee",
          color: "#c62828",
          icon: <CancelOutlined fontSize="small" sx={{ mr: 1 }} />,
          label: "Rejected",
        };
      default:
        return {
          bgcolor: "#fff3e0",
          color: "#ef6c00",
          icon: <AccessTime fontSize="small" sx={{ mr: 1 }} />,
          label: "Pending",
        };
    }
  };

  return (
    <Fade in timeout={800}>
      <Box>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 3,
            background: "#ffffff",
            boxShadow: "5 4px 20px rgba(42, 38, 38, 0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 3,
              borderBottom: "1px solid #f0f0f0",
              background: "#f8fafc",
            }}
          >
            <Box
              sx={{
                padding: "8px 16px",
                borderRadius: "8px",
              }}
            >
              {" "}
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <ShoppingBasket sx={{ color: "#4f46e5" }} />
                Incoming Orders
              </Typography>
            </Box>
          </Box>

          <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                        backgroundColor: "#fff",
                        fontWeight: 600,
                        color: "#1a237e",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  [...Array(rowsPerPage)].map((_, idx) => (
                    <TableRow key={idx}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="subtitle1" color="text.secondary">
                        No data found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((order, index) => {
                      const state = buttonState[order._id] || {
                        acceptLoading: false,
                        rejectLoading: false,
                        disabled: order.status !== "processing",
                      };

                      const statusStyles = getStatusStyle(order.status);

                      return (
                        <React.Fragment key={order._id}>
                          <TableRow hover>
                            <TableCell>
                              {order.user.firstName} {order.user.lastName}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={order._id}
                                size="small"
                                sx={{
                                  backgroundColor: "#e3f2fd",
                                  color: "#1a237e",
                                  fontWeight: 500,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              ₹{order.totalAmount.toFixed(2)}
                            </TableCell>
                            <TableCell>
                              {new Date(order.createdAt).toLocaleString(
                                "en-IN",
                                {
                                  dateStyle: "medium",
                                  timeStyle: "short",
                                }
                              )}
                            </TableCell>
                            <TableCell>
                              <Chip
                                icon={statusStyles.icon}
                                label={statusStyles.label}
                                sx={{
                                  backgroundColor: statusStyles.bgcolor,
                                  color: statusStyles.color,
                                  fontWeight: 500,
                                  "& .MuiChip-icon": {
                                    color: statusStyles.color,
                                  },
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Tooltip title="Accept Order">
                                  <span>
                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      onClick={() => handleAccept(order._id)}
                                      disabled={
                                        state.disabled ||
                                        state.acceptLoading ||
                                        state.rejectLoading
                                      }
                                    >
                                      {state.acceptLoading ? (
                                        <CircularProgress
                                          size={20}
                                          color="inherit"
                                        />
                                      ) : (
                                        "Accept"
                                      )}
                                    </Button>
                                  </span>
                                </Tooltip>
                                <Tooltip title="Reject Order">
                                  <span>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      onClick={() => handleReject(order._id)}
                                      disabled={
                                        state.disabled ||
                                        state.rejectLoading ||
                                        state.acceptLoading
                                      }
                                    >
                                      {state.rejectLoading ? (
                                        <CircularProgress
                                          size={20}
                                          color="inherit"
                                        />
                                      ) : (
                                        "Reject"
                                      )}
                                    </Button>
                                  </span>
                                </Tooltip>
                                <Tooltip
                                  title={
                                    openRow === index
                                      ? "Show Less"
                                      : "Show More"
                                  }
                                >
                                  <IconButton
                                    onClick={() =>
                                      setOpenRow(
                                        openRow === index ? null : index
                                      )
                                    }
                                  >
                                    {openRow === index ? (
                                      <ExpandLess />
                                    ) : (
                                      <ExpandMore />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell colSpan={6} sx={{ py: 0 }}>
                              <Collapse
                                in={openRow === index}
                                timeout="auto"
                                unmountOnExit
                              >
                                <Card
                                  sx={{
                                    m: 2,
                                    backgroundColor: "#f8f9fa",
                                    borderRadius: "8px",
                                    boxShadow: "none",
                                  }}
                                >
                                  <CardContent>
                                    <Grid container spacing={3}>
                                      <Grid item xs={12} sm={6}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 1,
                                          }}
                                        >
                                          <ShoppingBasket
                                            sx={{ mr: 1, color: "#1a237e" }}
                                          />
                                          <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 600 }}
                                          >
                                            Number of Items:{" "}
                                            {order.items.reduce(
                                              (total, item) =>
                                                total + item.quantity,
                                              0
                                            )}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <LocationOn
                                            sx={{ mr: 1, color: "#1a237e" }}
                                          />
                                          <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 600, mr: 1 }}
                                          >
                                            Delivery Address:
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            color="text.secondary"
                                          >
                                            {order.user.address || "N/A"}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>

                                    <Box mt={3}>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Sr No</TableCell>
                                            <TableCell>Item Name</TableCell>
                                            <TableCell>Quantity</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {order.items.map((item, idx) => (
                                            <TableRow key={item._id}>
                                              <TableCell>{idx + 1}</TableCell>
                                              <TableCell>
                                                {item.food.name}
                                              </TableCell>
                                              <TableCell>
                                                {item.quantity}
                                              </TableCell>
                                            </TableRow>
                                          ))}
                                        </TableBody>
                                      </Table>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              borderTop: 1,
              borderColor: "divider",
              ".MuiTablePagination-select": {
                color: "#1a237e",
              },
            }}
          />
        </Paper>
      </Box>
    </Fade>
  );
};

export default OrderPage;
