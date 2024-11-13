import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';  // Use Redux hooks
import { clearCart } from '../../stores/slices/cartSlice'; // Assuming you have a clearCart action in your Redux slice
import { ROUTES } from '../../routes/routeConfig';

// Custom Hook for Form Handling
const useCheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e, cartData, dispatch) => {
    e.preventDefault();
    if (validate()) {
      // Save form data and cart to localStorage
      localStorage.setItem('checkoutData', JSON.stringify(formData));
      localStorage.setItem('cartData', JSON.stringify(cartData));  // Save cart data before clearing
      alert('Checkout successful!');
      
      // Clear the cart in Redux or state
      dispatch(clearCart());  // Assuming you have a Redux action to clear the cart
      navigate(ROUTES.PRODUCTS);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
  };
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items); // Assuming cart items are stored in Redux
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
  } = useCheckoutForm();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      
      <Box component="form" onSubmit={(e) => handleSubmit(e, cartData, dispatch)}>
        <Grid container spacing={2}>
          {/* Name Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
            />
          </Grid>

          {/* Address Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shipping Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              variant="outlined"
            />
          </Grid>

          {/* Payment Method */}
          <Grid item xs={12}>
            <FormControl fullWidth error={!!errors.paymentMethod}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="paymentMethod"
                value={formData.paymentMethod || ''}
                onChange={handleChange}
                label="Payment Method"
              >
                <MenuItem value="creditCard">Credit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
                <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
              </Select>
              <FormHelperText>{errors?.paymentMethod }</FormHelperText>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth>
              Complete Purchase
            </Button>
          </Grid>
        </Grid>
      </Box>
      <br/>
    </Container>
  );
};

export default CheckoutPage;
