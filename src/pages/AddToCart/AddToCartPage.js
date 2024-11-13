import React, { useMemo, useCallback } from 'react';
import { Box, Button, Typography, Grid, Paper, IconButton, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {  removeFromCart, updateQuantity, clearCart } from '../../stores/slices/cartSlice'; // Actions
import { useNavigate } from 'react-router-dom';

const AddToCartPage = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  // Fetching cart items from Redux store
  const cart = useSelector((state) => state.cart.items);

  // Memoize total price and item count
  const { totalPrice, itemCount } = useMemo(() => {
    return cart.reduce(
      (totals, item) => {
        totals.totalPrice += item.price * item.quantity;
        totals.itemCount += item.quantity;
        return totals;
      },
      { totalPrice: 0, itemCount: 0 }
    );
  }, [cart]);

  // Memoized handler for quantity update
  const handleQuantityChange = useCallback((id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Math.max(1, quantity) }));
  }, [dispatch]);

  // Memoized handler for removing item from cart
  const handleRemoveFromCart = useCallback((id) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);
const checkoutHandler= ()=>{
  navigate('/account')
}
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>
        Your Cart
      </Typography>

      {/* Cart Items List */}
      <Paper sx={{ padding: 3, boxShadow: 3 }}>
        {cart.length === 0 ? (
          <Typography variant="h6">Your cart is empty!</Typography>
        ) : (
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Paper sx={{ padding: 2, display: 'flex', alignItems: 'center', boxShadow: 2 }}>
                  <Box sx={{ flexShrink: 0, width: 80, height: 80, marginRight: 2 }}>
                    <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">Price: ${item.price}</Typography>

                    {/* Quantity Input */}
                    <TextField
                      label="Quantity"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      inputProps={{ min: 1 }}
                      sx={{ marginTop: 1 }}
                    />
                  </Box>
                  {/* Remove Item */}
                  <IconButton
                    color="secondary"
                    onClick={() => handleRemoveFromCart(item.id)}
                    sx={{ marginLeft: 2 }}
                  >
                    🗑️
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Total Price */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Total: ${totalPrice.toFixed(2)}
          </Typography>
          <Typography variant="body1">
            Items: {itemCount}
          </Typography>
        </Box>
      )}

      {/* Checkout Actions */}
      <Box sx={{ marginTop: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: '10px 20px' }}
          disabled={cart.length === 0} // Disable button if the cart is empty
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </Button>
        <Button
          variant="outlined"
          sx={{ padding: '10px 20px' }}
          onClick={() => dispatch(clearCart())} // Clear cart logic
          disabled={cart.length === 0}
        >
          Clear Cart
        </Button>
      </Box>
    </Box>
  );
};

export default AddToCartPage;
