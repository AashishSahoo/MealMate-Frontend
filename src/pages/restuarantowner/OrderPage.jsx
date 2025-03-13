
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
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  CheckCircleOutline,
  CancelOutlined,
  AccessTime,
  LocationOn,
  Notes,
  ShoppingBasket,
  Category,
} from "@mui/icons-material";

const columns = [
  { id: "userName", label: "Customer Name", minWidth: 150 },
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 120 },
  { id: "date", label: "Date of Order", minWidth: 180 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "actions", label: "Actions", minWidth: 200 },
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
    "Pending",
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
    "Pending",
    2,
    "Cafe",
    "Almond milk",
    "789 Pine Rd"
  ),
];

const OrderPage = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openRow, setOpenRow] = useState(null);

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
          bgcolor: "#e8f5e9",
          color: "#2e7d32",
          icon: <CheckCircleOutline fontSize="small" sx={{ mr: 1 }} />,
        };
      case "Rejected":
        return {
          bgcolor: "#ffebee",
          color: "#c62828",
          icon: <CancelOutlined fontSize="small" sx={{ mr: 1 }} />,
        };
      case "Pending":
        return {
          bgcolor: "#fff3e0",
          color: "#ef6c00",
          icon: <AccessTime fontSize="small" sx={{ mr: 1 }} />,
        };
      default:
        return {};
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
            borderRadius: "12px",
            background: "#ffffff",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Box
            sx={{
              p: 3,
              background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ShoppingBasket sx={{ fontSize: 28 }} />
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Incoming Orders
            </Typography>
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
                        backgroundColor: "#f8f9fa",
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
                {orders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <React.Fragment key={order.orderId}>
                      <TableRow
                        hover
                        sx={{
                          backgroundColor: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 500 }}>
                          {order.userName}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.orderId}
                            size="small"
                            sx={{
                              backgroundColor: "#e3f2fd",
                              color: "#1a237e",
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ fontWeight: 500 }}>
                          ${order.price.toFixed(2)}
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          <Chip
                            icon={getStatusStyle(order.status).icon}
                            label={order.status}
                            sx={{
                              backgroundColor: getStatusStyle(order.status)
                                .bgcolor,
                              color: getStatusStyle(order.status).color,
                              fontWeight: 500,
                              "& .MuiChip-icon": {
                                color: getStatusStyle(order.status).color,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            <Tooltip title="Accept Order">
                              <span>
                                <Button
                                  variant="contained"
                                  color="success"
                                  size="small"
                                  disabled={order.status === "Accepted"}
                                  onClick={() =>
                                    handleChangeStatus(index, "Accepted")
                                  }
                                  sx={{
                                    textTransform: "none",
                                    boxShadow: 2,
                                    "&:hover": {
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  Accept
                                </Button>
                              </span>
                            </Tooltip>

                            <Tooltip title="Reject Order">
                              <span>
                                <Button
                                  variant="contained"
                                  color="error"
                                  size="small"
                                  disabled={order.status === "Rejected"}
                                  onClick={() =>
                                    handleChangeStatus(index, "Rejected")
                                  }
                                  sx={{
                                    textTransform: "none",
                                    boxShadow: 2,
                                    "&:hover": {
                                      transform: "translateY(-2px)",
                                    },
                                  }}
                                >
                                  Reject
                                </Button>
                              </span>
                            </Tooltip>

                            <Tooltip
                              title={
                                openRow === index ? "Show Less" : "Show More"
                              }
                            >
                              <IconButton
                                onClick={() =>
                                  setOpenRow(openRow === index ? null : index)
                                }
                                size="small"
                                sx={{
                                  backgroundColor: "#f5f5f5",
                                  "&:hover": {
                                    backgroundColor: "#e0e0e0",
                                    transform: "rotate(180deg)",
                                    transition: "transform 0.3s ease-in-out",
                                  },
                                }}
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
                                        Number of Items: {order.numberOfItems}
                                      </Typography>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mb: 1,
                                      }}
                                    >
                                      <Category
                                        sx={{ mr: 1, color: "#1a237e" }}
                                      />
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        Category: {order.category}
                                      </Typography>
                                    </Box>
                                  </Grid>

                                  <Grid item xs={12} sm={6}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        mb: 1,
                                      }}
                                    >
                                      <Notes sx={{ mr: 1, color: "#1a237e" }} />
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        Special Instructions:
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {order.specialInstructions}
                                        </Typography>
                                      </Typography>
                                    </Box>

                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                      }}
                                    >
                                      <LocationOn
                                        sx={{ mr: 1, color: "#1a237e" }}
                                      />
                                      <Typography
                                        variant="subtitle2"
                                        sx={{ fontWeight: 600 }}
                                      >
                                        Delivery Address:
                                        <Typography
                                          variant="body2"
                                          color="text.secondary"
                                        >
                                          {order.address}
                                        </Typography>
                                      </Typography>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </CardContent>
                            </Card>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
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
