import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Modal,
  IconButton,
  Grid,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Avatar,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Add,
  Remove,
  CurrencyRupee,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { AiFillAlert } from "react-icons/ai";
import Skeleton from "@mui/material/Skeleton";
import { useNavigate } from "react-router-dom";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [category, setCategory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [addToCartLoader, setAddToCartLoader] = useState(false);
  const [loading, setLoading] = useState(true);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // Extract fields from userInfo
  const email = userInfo.email;
  const token = userInfo.token;

  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleFilter = () => {
    const filteredData = products.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category._id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filteredData);
  };
  const fetchAllCategory = async () => {
    try {
      const response = await axios.get(`/api/categories`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        // Filter out the "Uncategorized" category
        const filteredCategories = response?.data?.resultData.filter(
          (cat) => cat.name.toLowerCase() !== "uncategorized"
        );
        setCategory(filteredCategories || []);
      }
    } catch (error) {
      console.log("Error fetching category list: ", error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/food/getAllFoods`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.resultCode === 0) {
        let data = response?.data?.resultData;
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.log("Error fetching the product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    const payload = {
      foodId: selectedItem._id,
      quantity: quantity,
      email: email,
    };
    try {
      setAddToCartLoader(true);
      const response = await axios.post(`/api/cart/addToCart`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle response codes FIRST
      if (response?.data?.resultCode === 71) {
        console.log("Eoor code 71");
        setShowModal(false);

        setOpenDialog(true);
      } else if (response?.data?.resultCode === 0) {
        setSelectedItem(null);
        setQuantity(1);
        setShowModal(false);
      }

      // THEN reset loader
      setAddToCartLoader(false);
    } catch (error) {
      console.log("Error adding item to cart:", error);
      setAddToCartLoader(false);
    }
  };

  useEffect(() => {
    fetchAllCategory();
    fetchAllProducts();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory, products]);

  return (
    <Container maxWidth="xl" sx={{ py: 4, background: "#EEF1F0" }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value), handleFilter();
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#9370DB" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                  borderColor: "#9370DB",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#8A2BE2",
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: "#9370DB" }}>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              label="Category"
              sx={{
                backgroundColor: "white",
                "&:hover": {
                  "&& fieldset": {
                    borderColor: "#9370DB",
                  },
                },
                "&.Mui-focused": {
                  "&& fieldset": {
                    borderColor: "#8A2BE2",
                  },
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              {category.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container spacing={3} sx={{ width: "100%", margin: 0 }}>
          {" "}
          {/* Add this wrapper */}
          {Array.from({ length: 4 }).map((_, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
              sx={{
                // Add these styles to ensure proper spacing calculation
                paddingTop: "24px !important",
                paddingBottom: "24px !important",
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: "16px",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                <Skeleton variant="rectangular" height={150} animation="wave" />
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Skeleton variant="text" width="60%" height={30} />
                  <Skeleton
                    variant="text"
                    width="20%"
                    height={40}
                    sx={{ mt: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={80}
                    sx={{ mt: 1 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: "auto",
                    }}
                  >
                    <Skeleton variant="text" width="40%" height={30} />
                    <Skeleton variant="circular" width={40} height={40} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          <Grid container spacing={3}>
            {filteredProducts.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item._id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    background: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: item.available ? "translateY(-5px)" : "none",
                      boxShadow: item.available
                        ? "0 8px 20px rgba(147, 112, 219, 0.2)"
                        : "none",
                    },
                    opacity: item.available ? 1 : 0.6, // Reduce opacity for unavailable items
                    pointerEvents: item.available ? "auto" : "none", // Disable interactions
                  }}
                >
                  {/* "Sold Out" Overlay */}
                  {!item.available && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: "bold" }}
                      >
                        Sold Out
                      </Typography>
                    </Box>
                  )}

                  <CardMedia
                    component="img"
                    height="200"
                    image={item.imageUrl}
                    alt={item.name}
                    onClick={() => {
                      if (item.available) {
                        setSelectedItem(item);
                        setShowModal(true);
                      }
                    }}
                    sx={{
                      cursor: item.available ? "pointer" : "default",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      p: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#9370DB", mb: 1 }}
                    >
                      {item.restaurantName}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      fontWeight="600"
                      sx={{ color: "#2c3e50" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, height: "40px", overflow: "hidden" }}
                    >
                      {item.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CurrencyRupee
                          sx={{ color: "#8A2BE2", fontSize: "1.2rem" }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ color: "#8A2BE2", fontWeight: "600" }}
                        >
                          {item.price}
                        </Typography>
                      </Box>
                      <IconButton
                        sx={{
                          background:
                            "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
                          color: "white",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
                          },
                          opacity: item.available ? 1 : 0.5,
                          pointerEvents: item.available ? "auto" : "none",
                        }}
                      >
                        <ShoppingCart
                          onClick={() => {
                            if (item.available) {
                              setSelectedItem(item);
                              setShowModal(true);
                            }
                          }}
                        />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      <StyledModal open={showModal} onClose={() => setShowModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            maxWidth: 600,
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          {selectedItem && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h4" gutterBottom fontWeight="600">
                  {selectedItem.name}
                </Typography>
                <CloseIcon
                  onClick={() => setShowModal(false)}
                  sx={{
                    cursor: "pointer",
                    ":hover": { color: "red", transform: "scale(1.2)" },
                  }}
                />
              </Box>

              <Typography variant="subtitle1" sx={{ color: "#9370DB", mb: 2 }}>
                {selectedItem.restaurantName}
              </Typography>
              <CardMedia
                component="img"
                height="300"
                image={selectedItem.imageUrl}
                alt={selectedItem.name}
                sx={{ borderRadius: 2, mb: 3 }}
              />
              <Typography variant="body1" paragraph>
                {selectedItem.description}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Price
                </Typography>
                <Typography>₹{selectedItem.price}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #e0e0e0",
                    borderRadius: 1,
                  }}
                >
                  <IconButton
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!selectedItem.available} // Disable if not available
                  >
                    <Remove />
                  </IconButton>
                  <Typography
                    sx={{ mx: 2, minWidth: "40px", textAlign: "center" }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!selectedItem.available} // Disable if not available
                  >
                    <Add />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={!selectedItem.available} // Disable if not available
                  sx={{
                    background:
                      "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
                    },
                    opacity: selectedItem.available ? 1 : 0.5, // Reduce opacity if not available
                  }}
                  onClick={() => {
                    setAddToCartLoader(true);
                    addToCart();
                  }}
                >
                  {addToCartLoader ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        height: "24px",
                      }}
                    >
                      <CircularProgress size={24} color="#fff" />
                    </Box>
                  ) : selectedItem.available ? (
                    `Add to Cart - ₹${selectedItem.price * quantity}`
                  ) : (
                    "Not Available"
                  )}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </StyledModal>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            maxWidth: "400px",
            width: "100%",
          },
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box sx={{ textAlign: "center", pt: 3, px: 3 }}>
          <Avatar
            sx={{
              margin: "0 auto",
              bgcolor: "#ffebee",
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            <AiFillAlert style={{ color: "#d32f2f", fontSize: 40 }} />
          </Avatar>
          <DialogTitle sx={{ pb: 1, fontSize: "1.5rem", fontWeight: 600 }}>
            Multiple Restaurant Error
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ color: "#546e7a" }}>
              Cannot add items from different restaurants.
              <strong> CLEAR CART FIRST</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                mr: 1,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Close
            </Button>
            <Button
              onClick={() => {
                // Add cart clearing logic here
                handleCloseDialog();
                navigate("/customer/cart");
              }}
              variant="contained"
              color="error"
            >
              Clear Cart
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};

export default Menu;
