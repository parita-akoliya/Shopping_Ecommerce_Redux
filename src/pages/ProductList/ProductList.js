import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Container, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Pagination } from '@mui/material';
import ProductCard from './ProductCard';
import { products } from '../../data/productData'; // Your product data
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../stores/slices/cartSlice'; // Import your addToCart action
import { Snackbar, Alert } from '@mui/material';
const ProductList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
  const productsPerPage = 6;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Access Redux dispatch

  // Debounced Search Functionality
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      filterAndSortProducts();
    }, 500); // Debouncing search by 500ms
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, minPrice, maxPrice]);

  const filterAndSortProducts = () => {
    setLoading(true);
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Case-insensitive search
    );

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice);

    setFilteredProducts(filtered);
    setLoading(false);
  };

  // Sorting Products by Price or Popularity
  const handleSort = (event) => {
    const sortValue = event.target.value;
    const sortedProducts = [...filteredProducts];

    if (sortValue === 'priceAsc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'priceDesc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === 'popularity') {
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(sortedProducts);
  };

  // Add to Cart
  const addToCartHandler = (product) => {
    const cartItem = {
      ...product,
      quantity: 1, // Default quantity when adding to cart
    };
    dispatch(addToCart(cartItem)); // Dispatch the action to add item to cart
    setSnackbarMessage(`${product.name} has been added to the cart!`); // Set the message
  setOpenSnackbar(true); // Open the snackbar
  };

  const handleViewDetails = (product) => {
    // Implement logic for viewing product details, like navigating to a details page
    navigate(`/product/${product.id}`); 
  };

  // Handle page change for pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page]);

  const productCards = useMemo(() => {
    return paginatedProducts.map((product) => (
      <Grid item xs={12} sm={4} md={4} key={product.id}>
        <ProductCard product={product} onAddToCart={addToCartHandler} onViewDetails={handleViewDetails} />
      </Grid>
    ));
  }, [paginatedProducts]);

  return (
    <Container sx={{ my: 5 }}>
      <Typography variant="h4" gutterBottom>
        Product Listing
      </Typography>

      {/* Search & Filters */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <FormControl variant="outlined" sx={{ width: '30%' }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Home & Furniture">Home & Furniture</MenuItem>
            <MenuItem value="Beauty & Health">Beauty & Health</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ width: '30%' }}>
          <InputLabel>Price</InputLabel>
          <Select
            onChange={(e) => {
              const [min, max] = e.target.value.split('-');
              setMinPrice(Number(min));
              setMaxPrice(Number(max));
            }}
            label="Price"
          >
            <MenuItem value="0-500">0 - 500</MenuItem>
            <MenuItem value="500-1000">500 - 1000</MenuItem>
            <MenuItem value="1000-2000">1000 - 2000</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ width: '30%' }}>
          <InputLabel>Sort By</InputLabel>
          <Select onChange={handleSort} label="Sort By">
            <MenuItem value="priceAsc">Price: Low to High</MenuItem>
            <MenuItem value="priceDesc">Price: High to Low</MenuItem>
            <MenuItem value="popularity">Popularity</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Products List */}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {loading ? (
            <Typography variant="h6">Loading products...</Typography>
          ) : (
            productCards
          )}
        </Grid>
      </Box>

      {/* Pagination */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={Math.ceil(filteredProducts.length / productsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
       {/* Snackbar for Add to Cart */}
    <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false) }
      anchorOrigin={{
        vertical: 'top',   // Position at the top of the screen
        horizontal: 'center' // Center it horizontally
      }}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Container>
  );
};

export default ProductList;
