import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
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
  Grid,
  Card,
  CardContent,
  Fade,
  Tooltip,
  Avatar,
  colors,
} from "@mui/material";
import moment from "moment";
import Skeleton from "@mui/material/Skeleton";

import Swal from "sweetalert2";
import {
  Edit,
  Delete,
  PhotoCamera,
  AddAPhoto,
  EditNote,
  SaveAs,
  TipsAndUpdates,
  CloudUpload,
} from "@mui/icons-material";

import ImageAspectRatioIcon from "@mui/icons-material/ImageAspectRatio";
import img from "/assets/img.png";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import axios from "axios";
import { useSelector } from "react-redux";

import { CgClose } from "react-icons/cg";
// import { AiFillAlert } from "react-icons/ai";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Switch from "@mui/material/Switch";
import { AiFillAlert } from "react-icons/ai";
import { SiTicktick } from "react-icons/si";
import { CgUnavailable } from "react-icons/cg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Chip from "@mui/material/Chip";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Products() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    available: true,
  });
  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState([]);

  const [viewImageDialogOpen, setViewImageDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    available: true,
  });
  // const { token, email } = useSelector((state) => state.auth);
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // Extract fields from userInfo
  const email = userInfo.email;
  const token = userInfo.token;

  const user = userInfo.user;

  const [hovered, setHovered] = useState(false);
  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare FormData object for file upload
    const payload = new FormData();
    payload.append("image", formData.image);
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("email", email);

    try {
      const response = await axios.post(`${BASE_URL}/food/addItem`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.resultCode === 0) {
        console.log("Item added successfully!");
        fetchAllProducts();
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          image: null,
        });
      }
    } catch (error) {
      console.log("Error adding food item:", error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        setCategory(response?.data?.resultData);
        console.log(category, ",,,");
      }
    } catch (error) {
      console.log("Error fetching category  list : ", error);
    }
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    setFormData({ ...formData, category: event.target.value });
  };

  // Handle image upload
  const handleImageChange = (event) => {
    setFormData({ ...formData, image: event.target.files[0] });
  };

  const handleViewImage = (image) => {
    setCurrentImage(image);
    setViewImageDialogOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditDialogOpen(true);
  };

  const handleDelete = async (product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/food/deleteItem/${selectedProduct._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.resultCode === 0) {
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        fetchAllProducts();
        setDeleteDialogOpen(false);
      }
    } catch (error) {
      console.log("Error while deleting the product");
    }
  };

  const handleSaveEdit = async () => {
    const payload = new FormData();
    payload.append("image", selectedProduct.image);
    payload.append("name", selectedProduct.name);
    payload.append("description", selectedProduct.description);
    payload.append("price", selectedProduct.price);
    // Send category ID instead of the object
    payload.append("category", selectedProduct.category._id);
    payload.append("available", selectedProduct.available);
    payload.append("email", email);

    try {
      const response = await axios.put(
        `${BASE_URL}/food/updateItem/${selectedProduct._id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.resultCode === 0) {
        Swal.fire("Updated!", "Product has been updated.", "success");
        fetchAllProducts();
        setEditDialogOpen(false);
      }
    } catch (error) {
      console.log("Error Updating the food item");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchAllProducts = async (req, res) => {
    try {
      const response = await axios.get(`/api/food/get`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { email: email },
      });

      if (response?.data?.resultCode === 0) {
        let data = response?.data?.resultData;
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(data);
        console.log(category, ",,,");
      }
    } catch (error) {
      console.log("Error fetching the product details :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllProducts();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "86vh",
          backgroundColor: "#F5FDFE",
        }}
      >
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
          centered
          sx={{
            "& .MuiTab-root": {
              fontSize: "1rem",
              fontWeight: 500,
              color: "#1a237e",
              "&.Mui-selected": {
                color: "#0d47a1",
              },
            },
          }}
        >
          <Tab label="Add  Product" />
          <Tab label="Product History" />
        </Tabs>

        {activeTab === 0 && (
          <Fade in timeout={600}>
            <Box sx={{ p: 3 }}>
              <Card
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  background: "white",
                  height: "98%",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={5}>
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        // background:
                        // "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                        borderRadius: 4,
                        p: 2,
                      }}
                    >
                      <Box
                        component="img"
                        src={img}
                        alt="Placeholder"
                        sx={{
                          width: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          transition: "transform 0.3s ease-in-out",
                          "&:hover": {
                            transform: "scale(1.15)",
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={7}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 4,
                        fontWeight: 700,
                        color: "#1a237e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      Add New Product
                      <Tooltip
                        title="By default, the product will be available. You can change its status in the Product History section"
                        arrow
                      >
                        {" "}
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            // backgroundColor: "#7b72da",
                            borderRadius: "50%",
                            cursor: "pointer",
                            transition: "all 0.3s ease-in-out",
                            "&:hover": {
                              backgroundColor: "#FFF8D7",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <TipsAndUpdatesIcon
                            sx={{ color: "#FFBF00", fontSize: 24 }}
                          />
                        </Box>
                      </Tooltip>
                    </Typography>

                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            name="name"
                            label="Product Name"
                            variant="outlined"
                            fullWidth
                            value={formData.name}
                            onChange={handleInputChange}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            required
                            name="description"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={1}
                            fullWidth
                            value={formData.description}
                            onChange={handleInputChange}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <TextField
                            required
                            name="price"
                            label="Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            value={formData.price}
                            onChange={handleInputChange}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>

                        <Grid item xs={12} md={6}>
                          <FormControl fullWidth required>
                            <InputLabel>Category</InputLabel>
                            <Select
                              value={formData.category}
                              onChange={handleCategoryChange}
                              sx={{ borderRadius: 2 }}
                            >
                              {category.map((item) => (
                                <MenuItem key={item._id} value={item._id}>
                                  {item.name}
                                </MenuItem>
                              ))}
                              {/* {category.map ? (
                                      <MenuItem key={category._id}>
                                        {category.name}
                                      </MenuItem>
                                    ) : (
                                      <></>
                                    )} */}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 3,
                              p: 3,
                              borderRadius: 2,
                              border: "2px dashed #1a237e",
                              background: "rgba(26, 35, 126, 0.05)",
                            }}
                          >
                            {formData.image ? (
                              <img
                                src={URL.createObjectURL(formData.image)}
                                alt="Product Preview"
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                            ) : (
                              <CloudUploadIcon
                                sx={{
                                  fontSize: "4rem",
                                  color: "#1a237e",
                                  opacity: 0.5,
                                }}
                              />
                            )}

                            <label htmlFor="icon-button-file">
                              <input
                                accept="image/*"
                                style={{ display: "none" }}
                                id="icon-button-file"
                                type="file"
                                onChange={handleImageChange}
                              />
                              <Button
                                variant="outlined"
                                component="span"
                                startIcon={<PhotoCamera />}
                                sx={{
                                  color: "#1a237e",
                                  borderColor: "#1a237e",
                                  "&:hover": {
                                    borderColor: "#0d47a1",
                                    background: "rgba(26, 35, 126, 0.1)",
                                  },
                                }}
                              >
                                Upload Image
                              </Button>
                            </label>
                          </Box>
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              background:
                                "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)",
                              },
                            }}
                          >
                            Add Product
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
                </Grid>
              </Card>
            </Box>
          </Fade>
        )}

        {activeTab === 1 && (
          <Fade in timeout={600}>
            <Box sx={{ p: 3 }}>
              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  background: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1, // Add this to fill available space
                }}
              >
                <TableContainer
                  sx={{
                    flex: 1, // This makes the table container grow to fill space
                    minHeight: 0, // Important for flex children to scroll properly
                    overflow: "auto", // Ensures scrolling works
                    position: "relative", // Helps with sticky header
                  }}
                >
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Image
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Product Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Category
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Price
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Available
                        </TableCell>

                        <TableCell sx={{ fontWeight: 600, color: "#1a237e" }}>
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {loading && (
                      <TableBody>
                        {Array.from({ length: rowsPerPage }).map((_, index) => (
                          <TableRow key={`skeleton-${index}`}>
                            <TableCell>
                              <Skeleton
                                variant="rectangular"
                                width={50}
                                height={50}
                              />
                            </TableCell>
                            <TableCell>
                              <Skeleton variant="text" width="80%" />
                            </TableCell>
                            <TableCell>
                              <Skeleton variant="text" width="60%" />
                            </TableCell>
                            <TableCell>
                              <Skeleton variant="text" width="40%" />
                            </TableCell>
                            <TableCell>
                              <Skeleton variant="text" width="90%" />
                            </TableCell>
                            <TableCell>
                              <Skeleton variant="text" width="70%" />
                            </TableCell>
                            <TableCell>
                              <Skeleton
                                variant="circular"
                                width={24}
                                height={24}
                              />
                            </TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", gap: 1 }}>
                                <Skeleton
                                  variant="circular"
                                  width={40}
                                  height={40}
                                />
                                <Skeleton
                                  variant="circular"
                                  width={40}
                                  height={40}
                                />
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    )}
                    <TableBody>
                      {products
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((product) => (
                          <TableRow
                            key={product._id}
                            sx={{
                              "&:hover": {
                                background: "rgba(26, 35, 126, 0.05)",
                              },
                            }}
                          >
                            <TableCell>
                              <Box
                                component="img"
                                src={product.imageUrl}
                                alt={product.name}
                                sx={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 2,
                                  cursor: "pointer",
                                  transition: "transform 0.2s",
                                  "&:hover": {
                                    transform: "scale(1.1)",
                                  },
                                }}
                                onClick={() =>
                                  handleViewImage(product.imageUrl)
                                }
                              />
                            </TableCell>
                            <TableCell
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                              }}
                            >
                              <Tooltip arrow title={product.name}>
                                {product.name}
                              </Tooltip>
                            </TableCell>
                            <TableCell
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100px",
                              }}
                            >
                              <Tooltip arrow title={product.category.name}>
                                {product.category.name}
                              </Tooltip>
                            </TableCell>
                            <TableCell>₹{product.price}</TableCell>
                            <TableCell
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                              }}
                            >
                              <Tooltip arrow title={product.description}>
                                {product.description}
                              </Tooltip>
                            </TableCell>
                            <TableCell>
                              {moment(product.createdAt).format(
                                "D/M/YYYY, HH:mm:ss"
                              )}
                            </TableCell>
                            <TableCell alignItems="center">
                              {product.available ? (
                                <>
                                  <Chip
                                    size="small"
                                    label="Available"
                                    variant="outlined"
                                    color="success"
                                  />
                                </>
                              ) : (
                                <Chip
                                  size="small"
                                  label="Sold Out"
                                  variant="outlined"
                                  color="error"
                                />
                              )}
                            </TableCell>

                            <TableCell>
                              <Tooltip title="Edit">
                                <IconButton
                                  onClick={() => handleEdit(product)}
                                  sx={{
                                    color: "#1a237e",
                                    "&:hover": {
                                      background: "rgba(26, 35, 126, 0.1)",
                                    },
                                  }}
                                >
                                  <EditNoteIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <IconButton
                                  onClick={() => handleDelete(product)}
                                  sx={{
                                    color: "#d32f2f",
                                    "&:hover": {
                                      background: "rgba(211, 47, 47, 0.1)",
                                    },
                                  }}
                                >
                                  <Delete />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 15, 25]}
                  component="div"
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Card>
            </Box>
          </Fade>
        )}
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%)",
          },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <EditNote sx={{ fontSize: "1.5rem" }} />
          Edit Product Details
        </DialogTitle>
        <DialogContent sx={{ pt: 3, mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: "2px dashed #1a237e",
                  borderRadius: 2,
                  p: 2,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {selectedProduct?.image ? (
                  <img
                    src={
                      selectedProduct.image instanceof File
                        ? URL.createObjectURL(selectedProduct.image)
                        : selectedProduct.imageUrl
                    }
                    alt="Product Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "contain",
                      borderRadius: 8,
                    }}
                  />
                ) : (
                  <AddAPhoto
                    sx={{ fontSize: "4rem", color: "#1a237e", opacity: 0.3 }}
                  />
                )}
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="edit-image-upload"
                  type="file"
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      image: e.target.files[0],
                    })
                  }
                />
                <label htmlFor="edit-image-upload" style={{ marginTop: 16 }}>
                  <Button
                    variant="outlined"
                    component="span"
                    size="small"
                    startIcon={<SaveAs />}
                    sx={{
                      color: "#1a237e",
                      borderColor: "#1a237e",
                      "&:hover": {
                        borderColor: "#0d47a1",
                        background: "rgba(26, 35, 126, 0.1)",
                      },
                    }}
                  >
                    Change Image
                  </Button>
                </label>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                label="Product Name"
                variant="outlined"
                value={selectedProduct?.name || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                size="small"
                variant="outlined"
                multiline
                rows={2}
                value={selectedProduct?.description || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    description: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Price"
                type="number"
                size="small"
                variant="outlined"
                value={selectedProduct?.price || ""}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                sx={{ mb: 2 }}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 2,
                  ml: 1,
                }}
              >
                <Typography>Is Available</Typography>
                <Switch
                  checked={selectedProduct?.available || false}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      available: e.target.checked,
                    })
                  }
                  color="success"
                />
              </Box>

              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  size="small"
                  value={selectedProduct?.category?._id || ""}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      // Find the category object by selected ID
                      category: category.find((c) => c._id === e.target.value),
                    })
                  }
                  label="Category"
                >
                  {category.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setEditDialogOpen(false)}
            variant="outlined"
            size="small"
            sx={{
              color: "#1a237e",
              borderColor: "#1a237e",
              "&:hover": { borderColor: "#0d47a1" },
            }}
          >
            Cancel
          </Button>
          <Button
            size="small"
            onClick={handleSaveEdit}
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #0d47a1 0%, #1a237e 100%)",
              },
            }}
          >
            Update Product
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#ffebee",
              width: 60,
              height: 60,
              p: 1,
              mb: 1,
            }}
          >
            <AiFillAlert style={{ color: "red", fontSize: 50 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Delete Food Item
          </DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete{" "}
              <strong>{selectedProduct?.name}</strong>?
            </Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                mr: 1,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              sx={{
                borderRadius: 2,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog
        open={viewImageDialogOpen}
        onClose={() => setViewImageDialogOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,

            color: "#0d47a1",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Product Image
          <IconButton
            onClick={() => setViewImageDialogOpen(false)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
              color: hovered ? "red" : "#0d47a1",
              transition: "color 0.3s ease-in-out",
            }}
          >
            <CgClose style={{ fontSize: "30px" }} />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            component="img"
            src={currentImage}
            alt="img"
            sx={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 2,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Products;
