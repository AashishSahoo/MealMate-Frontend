import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useSelector } from "react-redux";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const { token, email } = useSelector((state) => state.auth);

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

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    //
    // Prepare FormData object for file upload
    const payload = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("email", email);

    try {
      const response = await axios.post(`/api/food/addItem`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.data?.resultCode === 0) {
        console.log("Item added successfully!");
      }
    } catch (error) {
      console.log("Error adding food item:", error);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      {/* Image Section */}
      <Grid item xs={12} md={7}>
        <Box
          component="img"
          src="/assets/img.png"
          alt="Placeholder"
          sx={{
            width: "100%",
            height: "80%",
            borderRadius: "8px",
          }}
        />
      </Grid>

      {/* Form Section */}
      <Grid item xs={12} md={5}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <TextField
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            sx={{ marginBottom: 2 }}
          />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Books">Books</MenuItem>
              <MenuItem value="Clothing">Clothing,</MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="subtitle2"
            sx={{
              marginBottom: 2,
              background: "#E2E4F4",
              textAlign: "center",
              borderRadius: 5,
              fontSize: 15,
              p: 0.5,
              color: "#631D6A",
            }}
          >
            The image you upload will be displayed for customer reference.m
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Product Preview"
                style={{
                  width: "5rem",
                  height: "5rem",
                  objectFit: "cover",
                  borderRadius: "0.5rem",
                  marginRight: "10px",
                  border: "1px solid #ddd",
                }}
              />
            ) : (
              <AddAPhotoIcon
                style={{
                  fontSize: "4rem",
                  opacity: "0.7",
                  marginRight: "10px",
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
                color="secondary"
                startIcon={<PhotoCamera />}
                component="span"
                sx={{ color: "#673ab7", borderColor: "#673ab7" }}
              >
                Upload Image
              </Button>
            </label>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: "bold", padding: "10px" }}
          >
            Add Product
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddProduct;
