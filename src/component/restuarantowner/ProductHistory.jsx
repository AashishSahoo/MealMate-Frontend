import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Swal from "sweetalert2";

const ProductHistory = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Product A",
      category: "Electronics",
      price: 100,
      description: "High-quality electronic product",
      date: "2024-12-05",
      image: "/assets/sample-product.png",
    },
    {
      id: 2,
      name: "Product B",
      category: "Books",
      price: 20,
      description: "Best-selling book",
      date: "2024-12-04",
      image: "/assets/sample-product.png",
    },
  ]);

  const [categories] = useState([
    "Electronics",
    "Books",
    "Clothing",
    "Furniture",
    "Groceries",
  ]); // Example predefined categories

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Open edit dialog
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setEditDialogOpen(true);
  };

  // Handle dialog field change
  const handleFieldChange = (field, value) => {
    setEditProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Save edited product
  const handleSaveProduct = () => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === editProduct.id ? { ...editProduct } : product
      )
    );
    setEditDialogOpen(false);
    Swal.fire("Success", "Product updated successfully!", "success");
  };

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter((product) => product.id !== productId));
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      }
    });
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Product History
      </Typography>

      <TableContainer>
        <Table stickyHeader aria-label="product history table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Product Name</strong>
              </TableCell>
              <TableCell>
                <strong>Category</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Description</strong>
              </TableCell>
              <TableCell>
                <strong>Date</strong>
              </TableCell>
              <TableCell>
                <strong>Image</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: 50,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Product Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Product Name"
            value={editProduct?.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            margin="dense"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={editProduct?.category || ""}
              onChange={(e) => handleFieldChange("category", e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={editProduct?.price || ""}
            onChange={(e) => handleFieldChange("price", e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Description"
            value={editProduct?.description || ""}
            onChange={(e) => handleFieldChange("description", e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={editProduct?.date || ""}
            onChange={(e) => handleFieldChange("date", e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveProduct} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductHistory;
