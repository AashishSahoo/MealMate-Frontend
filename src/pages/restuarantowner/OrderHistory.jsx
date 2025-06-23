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
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Collapse,
  Chip,
  Divider,
  Card,
  CardContent,
  Grid,
  Tooltip,
  Skeleton,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  SearchRounded,
  FilterListRounded,
  LocalDiningRounded,
  ShoppingBasket,
  LocationOn,
} from "@mui/icons-material";
import axios from "axios";
import { Icon } from "@iconify/react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const columns = [
  { id: "userName", label: "Customer Name", minWidth: 150 },
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 120 },
  { id: "date", label: "Date of Order", minWidth: 180 },
  { id: "status", label: "Status", minWidth: 120 },
];

function createOrderData(
  userName,
  orderId,
  price,
  date,
  status,
  numberOfItems,
  category,
  specialInstructions,
  address,
  originalOrder
) {
  return {
    userName,
    orderId,
    price,
    date,
    status,
    numberOfItems,
    category,
    specialInstructions,
    address,
    originalOrder,
  };
}

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRow, setOpenRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const email = userInfo.email;
  const token = userInfo.token;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return {
          backgroundColor: "#e8f5e9",
          color: "#2e7d32",
          borderColor: "#2e7d32",
        };
      case "Rejected":
        return {
          backgroundColor: "#fef2f2",
          color: "#dc2626",
          borderColor: "#dc2626",
        };
      default:
        return {
          backgroundColor: "#e0e7ff",
          color: "#3730a3",
          borderColor: "#3730a3",
        };
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleToggleRow = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  const fetchAllOrderHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/orders/getAllOrdersByRestaurant/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const apiOrders = response?.data?.resultData || [];

      const transformedOrders = apiOrders.map((order) =>
        createOrderData(
          `${order.user.firstName?.trim()} ${order.user.lastName?.trim()}`,
          order._id,
          order.totalAmount,
          new Date(order.createdAt).toLocaleString(),
          order.status === "completed"
            ? "Accepted"
            : order.status === "cancelled"
              ? "Rejected"
              : order.status,
          order.items.reduce((acc, item) => acc + item.quantity, 0),
          order.items.map((item) => item.food.name).join(", "),
          "",
          order.user.address,
          order
        )
      );

      setOrders(transformedOrders);
    } catch (error) {
      console.log("Error fetching order history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrderHistory();
  }, [email]);

  return (
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
            <Icon
              icon="lets-icons:order-fill"
              width="44"
              height="44"
              style={{ color: "#4f46e5" }}
            />
            Orders History
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, width: "60%", background: "#fff" }}>
          <TextField
            placeholder="Search orders..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: <SearchRounded sx={{ color: "#666", mr: 1 }} />,
              sx: { borderRadius: 2 },
            }}
          />

          <FormControl variant="outlined" sx={{ minWidth: 200 }} size="small">
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Filter by Status"
              sx={{ borderRadius: 2 }}
              startAdornment={
                <FilterListRounded sx={{ color: "#666", ml: 1 }} />
              }
            >
              <MenuItem value="">All Orders</MenuItem>
              <MenuItem value="Accepted">Accepted</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer sx={{ maxHeight: "calc(100vh - 300px)" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sx={{
                    minWidth: column.minWidth,
                    fontWeight: 600,
                    backgroundColor: "#fff",
                    color: "#1a237e",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600, backgroundColor: "#fff" }}>
                Actions
              </TableCell>
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
            ) : filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="subtitle1" color="text.secondary">
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders
                .slice()
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <React.Fragment key={order.orderId}>
                    <TableRow hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {order.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.orderId.slice(-6)}
                          size="small"
                          sx={{
                            backgroundColor: "#f1f5f9",
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#059669" }}
                        >
                          ₹{order.price}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {order.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            ...getStatusStyle(order.status),
                            fontWeight: 500,
                            border: "1px solid",
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip
                          title={openRow === index ? "Show less" : "Show more"}
                        >
                          <IconButton
                            onClick={() => handleToggleRow(index)}
                            size="small"
                          >
                            {openRow === index ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        </Tooltip>
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
                                      Number of Items: {order.numberOfItems}
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
                                      {order.address || "N/A"}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>

                              <Box mt={3}>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>Sr No</TableCell>
                                      <TableCell>Item</TableCell>
                                      <TableCell>Quantity</TableCell>
                                      <TableCell>Unit Price</TableCell>
                                      <TableCell>Total</TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {order.originalOrder.items.map(
                                      (item, idx) => (
                                        <TableRow key={item._id}>
                                          <TableCell>{idx + 1}</TableCell>
                                          <TableCell>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                              }}
                                            >
                                              {item.food.name}
                                            </Box>
                                          </TableCell>
                                          <TableCell>{item.quantity}</TableCell>
                                          <TableCell>₹{item.price}</TableCell>
                                          <TableCell>
                                            ₹{item.quantity * item.price}
                                          </TableCell>
                                        </TableRow>
                                      )
                                    )}
                                  </TableBody>
                                </Table>
                              </Box>
                            </CardContent>
                          </Card>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrderHistory;
