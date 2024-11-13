import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Box, CardActions } from '@mui/material';

const ProductCard = ({ product, onAddToCart, onViewDetails }) => {
  return (
    <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 345,
        boxShadow: 3,
        borderRadius: 2,
        overflow: 'hidden',
        height: '100%',
        border: '1px solid #ddd', // Adds a subtle border
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease, background-color 0.3s ease', // Added background-color transition
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 10,
          backgroundColor: '#f7f7f7', // Light background change on hover for a subtle effect
        },
      }}>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{
            objectFit: 'contain',
            width: '100%',
            maxHeight: '200px',
          }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.4, mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.category}
        </Typography>
        <Typography variant="body3" color={product.inStock ? 'green':'red'} sx={{ mb: 2 }}>
          {product.inStock ? 'In Stock':'Out Of Stock'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${product.price}</Typography>
          {product.discount > 0 && (
            <Typography variant="body2" color="error" sx={{ fontWeight: 'bold' }}>
              {product.discount}% OFF
            </Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', padding: '8px 16px' }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          fullWidth
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: '#1d73e8', // Darker hover effect for the button
            },
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => onViewDetails(product)}
          fullWidth
          sx={{
            fontWeight: 'bold',
            textTransform: 'none',
            padding: '8px 16px',
           
            '&:hover': {
              backgroundColor: '#e8f5fe', // Lighter hover effect for the button
            },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
