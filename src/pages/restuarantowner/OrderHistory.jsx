import React, { useState } from "react";
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
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  SearchRounded,
  FilterListRounded,
  LocalDiningRounded,
  LocationOnRounded,
  MessageRounded,
  ShoppingBasketRounded,
  RestaurantMenuRounded,
  ListAltRounded,
} from "@mui/icons-material";

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
  address
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
  };
}

const initialOrders = [
  createOrderData(
    "John Doe",
    "O101",
    25,
    "2024-12-28 14:35",
    "Pending",
    2,
    "Fast Food",
    "Extra ketchup",
    "123 Main St"
  ),
  createOrderData(
    "Jane Smith",
    "O102",
    18,
    "2024-12-28 15:10",
    "Accepted",
    2,
    "Japanese",
    "No wasabi",
    "456 Oak Ave"
  ),
  createOrderData(
    "Emily Clark",
    "O103",
    15,
    "2024-12-28 16:45",
    "Rejected",
    2,
    "Cafe",
    "Almond milk",
    "789 Pine Rd"
  ),
];

const OrderHistory = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRow, setOpenRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleChangeStatus = (index, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order, i) =>
        i === index ? { ...order, status: newStatus } : order
      )
    );
  };

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
      case "Pending":
        return {
          backgroundColor: "#fff7ed",
          color: "#c2410c",
          borderColor: "#c2410c",
        };
      default:
        return {};
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

  return (
    <>
      {/* <Box height="4rem" /> */}
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: 3,
          background: "#ffffff",
          boxShadow: "5 4px 20px rgba(42, 38, 38, 0.05)",
          // border: "0.5px solid black",
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
              <LocalDiningRounded sx={{ color: "#4f46e5" }} />
              Orders History
            </Typography>
          </Box>

          <Box
            sx={{ display: "flex", gap: 2, width: "60%", background: "#fff" }}
          >
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
                <MenuItem value="Pending">Pending</MenuItem>
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
                      color: "#475569",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell sx={{ backgroundColor: "#f8fafc" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <React.Fragment key={order.orderId}>
                    <TableRow
                      hover
                      sx={{
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {order.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.orderId}
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
                          ${order.price}
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
                            sx={{
                              backgroundColor:
                                openRow === index ? "#eef2ff" : "transparent",
                              "&:hover": { backgroundColor: "#eef2ff" },
                            }}
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
                          <Box sx={{ py: 2, backgroundColor: "#f8faff" }}>
                            <Card
                              variant="outlined"
                              sx={{
                                mx: 2,
                                borderRadius: 2,
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                              }}
                            >
                              <CardContent>
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                          alignItems: "center",
                                        }}
                                      >
                                        <ShoppingBasketRounded
                                          sx={{ color: "#6366f1" }}
                                        />
                                        <Typography variant="body2">
                                          Items: {order.numberOfItems}
                                        </Typography>
                                      </Box>

                                      <Tooltip title={order.category}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                          }}
                                        >
                                          <RestaurantMenuRounded
                                            sx={{ color: "#6366f1" }}
                                          />
                                          <Typography
                                            variant="body2"
                                            noWrap
                                            sx={{ maxWidth: 150 }}
                                          >
                                            Category : {order.category}
                                          </Typography>
                                        </Box>
                                      </Tooltip>
                                    </Box>
                                  </Grid>

                                  <Grid item xs={6}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                      }}
                                    >
                                      <Tooltip
                                        title={`Note: ${order.specialInstructions}`}
                                      >
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                          }}
                                        >
                                          <MessageRounded
                                            sx={{ color: "#6366f1" }}
                                          />
                                          <Typography
                                            variant="body2"
                                            noWrap
                                            sx={{ maxWidth: 150 }}
                                          >
                                            Note: {order.specialInstructions}
                                          </Typography>
                                        </Box>
                                      </Tooltip>

                                      <Tooltip title={order.address}>
                                        <Box
                                          sx={{
                                            display: "flex",
                                            gap: 2,
                                            alignItems: "center",
                                          }}
                                        >
                                          <LocationOnRounded
                                            sx={{ color: "#6366f1" }}
                                          />
                                          <Typography
                                            variant="body2"
                                            noWrap
                                            sx={{ maxWidth: 150 }}
                                          >
                                            Address : {order.address}
                                          </Typography>
                                        </Box>
                                      </Tooltip>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
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
          sx={{
            ".MuiTablePagination-select": {
              borderRadius: 1,
            },
          }}
        />
      </Paper>
    </>
  );
};

export default OrderHistory;
