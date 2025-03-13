import React, { useState } from "react";
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
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Add,
  Remove,
  CurrencyRupee,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import img6 from "../../assets/img6.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from "../../assets/img8.jpg";
import img9 from "../../assets/img9.jpg";
import img10 from "../../assets/img10.jpg";
import img13 from "../../assets/img13.jpg";
import img14 from "../../assets/img14.jpg";
import img15 from "../../assets/img15.jpg";
import img16 from "../../assets/img16.jpg";
import img18 from "../../assets/img18.jpg";
import img19 from "../../assets/img19.jpg";
import img20 from "../../assets/img20.jpg";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const categories = [
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Beverages",
  ];

  const mockFoodItems = [
    {
      id: 1,
      name: "Classic Burger",
      price: 299,
      portion: "Regular",
      description: "Juicy beef patty with fresh vegetables and special sauce",
      image: img6,
      category: "Lunch",
      restaurant: "The Burger House",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 399,
      portion: "12 inch",
      description: "Fresh mozzarella, tomatoes, and basil on a crispy crust",
      image: img7,
      category: "Dinner",
      restaurant: "Pizza Paradise",
    },
    {
      id: 3,
      name: "Caesar Salad",
      price: 249,
      portion: "Large Bowl",
      description: "Crisp romaine lettuce with parmesan and caesar dressing",
      image: img8,
      category: "Lunch",
      restaurant: "Green Bowl",
    },
    {
      id: 4,
      name: "Masala Dosa",
      price: 149,
      portion: "1 Piece",
      description: "Crispy rice crepe filled with spiced potato mixture",
      image: img9,
      category: "Breakfast",
      restaurant: "South Indian Delights",
    },
    {
      id: 5,
      name: "Mango Lassi",
      price: 129,
      portion: "300ml",
      description: "Refreshing yogurt drink with fresh mango pulp",
      image: img10,
      category: "Beverages",
      restaurant: "Lassi Corner",
    },
    {
      id: 6,
      name: "Samosa Platter",
      price: 99,
      portion: "2 Pieces",
      description: "Crispy pastry filled with spiced potatoes and peas",
      image: img13,
      category: "Snacks",
      restaurant: "Chaat House",
    },
    {
      id: 7,
      name: "Butter Chicken",
      price: 349,
      portion: "Full",
      description: "Tender chicken in rich tomato-butter gravy",
      image: img14,
      category: "Dinner",
      restaurant: "Punjab Grill",
    },
    {
      id: 8,
      name: "Cold Coffee",
      price: 159,
      portion: "400ml",
      description: "Creamy cold coffee with ice cream",
      image: img15,
      category: "Beverages",
      restaurant: "Cafe Coffee Day",
    },
    {
      id: 9,
      name: "Veg Biryani",
      price: 249,
      portion: "Full",
      description: "Fragrant rice with mixed vegetables and spices",
      image: img16,
      category: "Lunch",
      restaurant: "Biryani House",
    },
    {
      id: 10,
      name: "Masala Chai",
      price: 49,
      portion: "200ml",
      description: "Indian spiced tea with milk",
      image: img18,
      category: "Beverages",
      restaurant: "Tea Corner",
    },
    {
      id: 11,
      name: "Paneer Tikka",
      price: 299,
      portion: "8 Pieces",
      description: "Grilled cottage cheese with spices",
      image: img19,
      category: "Snacks",
      restaurant: "Tandoor Express",
    },
    {
      id: 12,
      name: "Idli Sambar",
      price: 129,
      portion: "4 Pieces",
      description: "Steamed rice cakes with lentil soup",
      image: img20,
      category: "Breakfast",
      restaurant: "South Indian Delights",
    },
  ];

  const filteredItems = mockFoodItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4, background: "#EEF1F0" }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search foods..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}>
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
                  transform: "translateY(-5px)",
                  boxShadow: "0 8px 20px rgba(147, 112, 219, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
                sx={{
                  cursor: "pointer",
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
                  {item.restaurant}
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
                    }}
                  >
                    <ShoppingCart />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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
              <Typography variant="h4" gutterBottom fontWeight="600">
                {selectedItem.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#9370DB", mb: 2 }}>
                {selectedItem.restaurant}
              </Typography>
              <CardMedia
                component="img"
                height="300"
                image={selectedItem.image}
                alt={selectedItem.name}
                sx={{ borderRadius: 2, mb: 3 }}
              />
              <Typography variant="body1" paragraph>
                {selectedItem.description}
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Portion Size
                </Typography>
                <Typography>{selectedItem.portion}</Typography>
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
                  >
                    <Remove />
                  </IconButton>
                  <Typography
                    sx={{ mx: 2, minWidth: "40px", textAlign: "center" }}
                  >
                    {quantity}
                  </Typography>
                  <IconButton onClick={() => setQuantity(quantity + 1)}>
                    <Add />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    background:
                      "linear-gradient(135deg, #9370DB 0%, #8A2BE2 100%)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #8A2BE2 0%, #9370DB 100%)",
                    },
                  }}
                >
                  Add to Cart - ₹{selectedItem.price * quantity}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </StyledModal>
    </Container>
  );
};

export default Menu;
