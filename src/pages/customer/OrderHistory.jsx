import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
  Fade,
  Chip,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const OrderHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sample data - replace with actual data from your backend
  const orders = [
    {
      id: 1,
      date: "2023-12-20",
      item: "Butter Chicken",
      price: "₹350",
      address: "123 Main St, Mumbai",
      category: "Main Course",
    },
    {
      id: 2,
      date: "2023-12-19",
      item: "Dal Makhani",
      price: "₹220",
      address: "456 Park Ave, Delhi",
      category: "Main Course",
    },
    {
      id: 3,
      date: "2023-12-18",
      item: "Naan",
      price: "₹40",
      address: "789 Lake Rd, Bangalore",
      category: "Breads",
    },
    {
      id: 4,
      date: "2023-12-17",
      item: "Gulab Jamun",
      price: "₹100",
      address: "321 Hill St, Chennai",
      category: "Dessert",
    },
    {
      id: 5,
      date: "2023-12-16",
      item: "Paneer Tikka",
      price: "₹280",
      address: "654 River Rd, Kolkata",
      category: "Starters",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Fade in={true} timeout={1000}>
      <Box sx={{ width: "100%" }}>
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
          <RestaurantIcon sx={{ fontSize: 32, color: "#fff" }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, letterSpacing: "0.5px" }}
          >
            Order History
          </Typography>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0 4px 20px rgba(138, 43, 226, 0.1)",
            maxHeight: "calc(100vh - 300px)",
            borderRadius: "0 0 12px 12px",
            "& .MuiTableCell-root": {
              borderColor: "rgba(138, 43, 226, 0.1)",
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: 700,
                    color: "#8A2BE2",
                    fontSize: "0.95rem",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  Sr No
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    color: "#8A2BE2",
                    fontSize: "0.95rem",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    color: "#8A2BE2",
                    fontSize: "0.95rem",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  Item
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    color: "#8A2BE2",
                    fontSize: "0.95rem",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  Category
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    color: "#8A2BE2",
                    fontSize: "0.95rem",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  Price
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: 700,
                    color: "#8A2BE2",
                    fontSize: "0.95rem",
                    backgroundColor: "#F8F9FA",
                  }}
                >
                  Delivery Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => (
                  <TableRow
                    key={order.id}
                    sx={{
                      "&:hover": {
                        backgroundColor: "rgba(138, 43, 226, 0.05)",
                        transition: "all 0.3s ease",
                      },
                      cursor: "pointer",
                      backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#F8F9FA",
                    }}
                  >
                    <TableCell sx={{ fontWeight: 600, color: "#9370DB" }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ color: "#5D4B63" }}>
                      {order.date}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500, color: "#5D4B63" }}>
                      {order.item}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={order.category}
                        size="small"
                        sx={{
                          backgroundColor: "rgba(138, 43, 226, 0.1)",
                          color: "#8A2BE2",
                          fontWeight: 600,
                          borderRadius: "6px",
                          padding: "4px",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#9370DB" }}>
                      {order.price}
                    </TableCell>
                    <TableCell sx={{ color: "#5D4B63" }}>
                      {order.address}
                    </TableCell>
                  </TableRow>
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
            sx={{
              ".MuiTablePagination-select": {
                borderRadius: 8,
                // border: "1px solid rgba(138, 43, 226, 0.2)",
                mr: 1,
              },
              color: "#5D4B63",
            }}
          />
        </TableContainer>
      </Box>
    </Fade>
  );
};

export default OrderHistory;
