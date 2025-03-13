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
  Collapse,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Fade,
} from "@mui/material";
import breakfast from "../../assets/breakfast.png";

// Table column definitions
const columns = [
  { id: "userName", label: "Username", minWidth: 150 },
  { id: "userId", label: "User ID", minWidth: 100 },
  { id: "orderId", label: "Order ID", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "date", label: "Date of Order", minWidth: 150 },
];

// Mock order data
function createOrderData(
  userName,
  userId,
  orderId,
  price,
  items,
  categories,
  restaurant,
  status,
  date
) {
  return {
    userName,
    userId,
    orderId,
    price,
    items,
    categories,
    restaurant,
    status,
    date,
  };
}

const orders = [
  createOrderData(
    "John Doe",
    "U001",
    "O101",
    "$45.99",
    ["Pizza", "Burger", "Fries"],
    ["Food", "Beverage"],
    "Pizza Palace",
    "Delivered",
    "2024-11-28"
  ),
  createOrderData(
    "Jane Smith",
    "U002",
    "O102",
    "$25.50",
    ["Sushi", "Miso Soup"],
    ["Food"],
    "Sushi Haven",
    "Pending",
    "2024-11-29"
  ),
  createOrderData(
    "Emily Clark",
    "U003",
    "O103",
    "$30.00",
    ["Cappuccino", "Croissant"],
    ["Beverage", "Bakery"],
    "Cafe Delight",
    "Preparing",
    "2024-11-30"
  ),
];

export default function OrderHistoryTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expanded, setExpanded] = useState({});
  const [filterRestaurant, setFilterRestaurant] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (index) => {
    setExpanded((prevState) => ({ ...prevState, [index]: !prevState[index] }));
  };

  const handleFilterRestaurantChange = (event) => {
    setFilterRestaurant(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesRestaurant =
      !filterRestaurant || order.restaurant === filterRestaurant;
    const matchesCategory =
      !filterCategory || order.categories.includes(filterCategory);
    return matchesRestaurant && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "#1976d2";
      case "Pending":
        return "#ed6c02";
      case "Preparing":
        return "#2e7d32";
      default:
        return "#1976d2";
    }
  };

  return (
    <Fade in={true} timeout={800}>
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          padding: 4,
          borderRadius: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          sx={{
            marginBottom: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start", // Align items to the top
          }}
        >
          <Box display="flex" flexDirection="column" sx={{ flexGrow: 1 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#000",
                mb: 3,
              }}
            >
              Order Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
              <FormControl sx={{ minWidth: 240 }} size="small">
                <InputLabel>Restaurant</InputLabel>
                <Select
                  value={filterRestaurant}
                  onChange={handleFilterRestaurantChange}
                  label="Restaurant"
                >
                  <MenuItem value="">All Restaurants</MenuItem>
                  {Array.from(
                    new Set(orders.map((order) => order.restaurant))
                  ).map((restaurant) => (
                    <MenuItem key={restaurant} value={restaurant}>
                      {restaurant}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 240 }} size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={handleFilterCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">All Categories</MenuItem>
                  {Array.from(
                    new Set(orders.flatMap((order) => order.categories))
                  ).map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Image container with constrained height */}
          <Box
            sx={{
              marginLeft: 0,
              height: "100%", // Take parent height
              display: "flex",
              alignItems: "center", // Vertically center image
            }}
          >
            <img
              src={breakfast}
              alt="header"
              style={{
                height: "7rem", // Fixed height matching header
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#f5f5f5",
                      color: "#000",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <React.Fragment key={index}>
                    <TableRow
                      hover
                      onClick={() => handleRowClick(index)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.04)",
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500 }}>
                        {order.userName}
                      </TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>
                        {order.price}
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
                            letterSpacing: "0.5px",
                          }}
                        >
                          {order.status}
                        </Box>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={6} sx={{ padding: 0 }}>
                        <Collapse
                          in={expanded[index]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box
                            sx={{
                              margin: 2,
                              padding: 3,
                              backgroundColor: "#f8f9fa",
                              borderRadius: 1,
                              border: "1px solid #e0e0e0",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600, color: "#000", mb: 2 }}
                            >
                              Order Details
                            </Typography>
                            <Box sx={{ display: "grid", gap: 2 }}>
                              <Typography variant="body2">
                                <span
                                  style={{
                                    fontWeight: 600,
                                    marginRight: "8px",
                                    color: "#B96B1A",
                                  }}
                                >
                                  Items:
                                </span>
                                {order.items.join(", ")}
                              </Typography>
                              <Typography variant="body2">
                                <span
                                  style={{
                                    fontWeight: 600,
                                    marginRight: "8px",
                                    color: "#B96B1A",
                                  }}
                                >
                                  Categories:
                                </span>
                                {order.categories.join(", ")}
                              </Typography>
                              <Typography variant="body2">
                                <span
                                  style={{
                                    fontWeight: 600,
                                    marginRight: "8px",
                                    color: "#B96B1A",
                                  }}
                                >
                                  Restaurant:
                                </span>
                                {order.restaurant}
                              </Typography>
                            </Box>
                          </Box>
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
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            borderTop: "1px solid #e0e0e0",
            marginTop: 2,
          }}
        />
      </Paper>
    </Fade>
  );
}
