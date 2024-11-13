import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, Typography, Paper, Chip, Rating, TextField, Snackbar, Alert } from '@mui/material';
import { products } from '../../data/productData';
import { addToCart } from '../../stores/slices/cartSlice';
import { useDispatch } from 'react-redux';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id)); // Find the product by ID
  const [quantity, setQuantity] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState('');
  const dispatch= useDispatch();
  //  Memoized handler for adding item to cart
const handleAddToCart = useCallback(() => {
  if (quantity > 0) {
    dispatch(addToCart({ ...product, quantity }));
    setSnackbarMessage(`${product.name} has been added to the cart!`); 
    setOpenSnackbar(true); // Show confirmation message
  }
}, [dispatch, product, quantity]);
const { 
  name, price, discountedPrice, description, imageUrl, rating, brand, category, 
  shippingInfo, deliveryTime, warranty, returnPolicy, tags, inStock 
} = product;


const handleQuantityChange = (event) => {
  const value = Math.max(1, event.target.value); // Ensure the quantity is at least 1
  setQuantity(value);
};
  if (!product) {
    return <div>Product not found!</div>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ display: 'flex', padding: 3, borderRadius: 2, boxShadow: 3 }}>
        {/* Image Section */}
        <Box sx={{ flex: 1, paddingRight: 2 }}>
          <img 
            src={imageUrl} 
            alt={name} 
            style={{ width: '100%', borderRadius: '8px', objectFit: 'contain' }} 
          />
        </Box>

        {/* Info Section */}
        <Box sx={{ flex: 2 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {name}
          </Typography>

          {/* Price Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            {discountedPrice ? (
              <>
                <Typography variant="h6" sx={{ textDecoration: 'line-through', marginRight: 1, color: 'grey' }}>
                  ${price}
                </Typography>
                <Typography variant="h5" sx={{ color: 'red', fontWeight: 'bold' }}>
                  ${discountedPrice}
                </Typography>
              </>
            ) : (
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                ${price}
              </Typography>
            )}
          </Box>

          {/* Rating Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
            <Rating value={rating} readOnly />
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              {rating} / 5
            </Typography>
          </Box>

          {/* Description */}
          <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>

          {/* Meta Info */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="body2">
              <strong>Brand:</strong> {brand}
            </Typography>
            <Typography variant="body2">
              <strong>Category:</strong> {category}
            </Typography>
            <Typography variant="body2">
              <strong>Shipping:</strong> {shippingInfo}
            </Typography>
            <Typography variant="body2">
              <strong>Delivery Time:</strong> {deliveryTime}
            </Typography>
            <Typography variant="body2">
              <strong>Warranty:</strong> {warranty}
            </Typography>
            <Typography variant="body2">
              <strong>Return Policy:</strong> {returnPolicy}
            </Typography>
          </Box>

          {/* Stock Info */}
          {inStock ? (
            <Typography variant="body2" sx={{ color: 'green', marginBottom: 2 }}>
              In Stock
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: 'red', marginBottom: 2 }}>
              Out of Stock
            </Typography>
          )}

          {/* Tags Section */}
          <Box sx={{ marginBottom: 2 }}>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ marginRight: 1, marginBottom: 1 }} />
            ))}
          </Box>

          {/* Quantity Input */}
          {inStock && (
            <Box sx={{ marginBottom: 2 }}>
              <TextField
                type="number"
                label="Quantity"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: 10 }}
                sx={{ width: 100 }}
              />
            </Box>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" color="primary" sx={{ padding: '10px 20px' }} disabled={!inStock}  onClick={handleAddToCart}  >
              Add to Cart
            </Button>
            <Button variant="outlined" sx={{ padding: '10px 20px' }} disabled={!inStock}>
              Buy Now
            </Button>
          </Box>
        </Box>
      </Paper>
       {/* Snackbar for confirmation */}
       <Snackbar
      open={openSnackbar}
      autoHideDuration={3000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{
        vertical: 'top',   // Position at the top of the screen
        horizontal: 'center' // Center it horizontally
      }}
    >
      <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Box>
  );
};

export default ProductDetails;
