import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/routeConfig";
import styles from './HomePage.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DevicesIcon from '@mui/icons-material/Devices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import StarIcon from '@mui/icons-material/Star';

const HomePage = () => {
    return (
      <div className={styles.homepageContainer}>
        {/* Banner Section */}
        <Box className={styles.banner} role="banner">
          <Box className={styles.bannerText}>
            <Typography variant="h3" className={styles.bannerTitle}>
              Welcome to My ShopEase
            </Typography>
            <Typography variant="h6" className={styles.bannerSubtitle}>
              Best Deals on All Your Favorite Products
            </Typography>
            <Button
              variant="contained"
              className={styles.shopNowButton}
              component={Link}
              to={ROUTES.PRODUCTS}  // Ensure the route is correct
              aria-label="Shop Now"
              startIcon={<ShoppingCartIcon />}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
  
        {/* Featured Categories Section */}
        <Container className={styles.categoriesSection} sx={{ my: 5 }}>
          <Typography variant="h4" className={styles.sectionTitle} sx={{ mb: 3 }}>
            Featured Categories
          </Typography>
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={3}>
            {[ 
              { name: "Electronics", icon: <DevicesIcon sx={{ fontSize: 40, color: "#ff9800", mb: 1 }} /> },
              { name: "Fashion", icon: <FavoriteIcon sx={{ fontSize: 40, color: "#ff9800", mb: 1 }} /> },
              { name: "Home & Furniture", icon: <HomeIcon sx={{ fontSize: 40, color: "#ff9800", mb: 1 }} /> },
              { name: "Beauty & Health", icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 40, color: "#ff9800", mb: 1 }} /> }
            ].map((category, index) => (
              <Paper key={index} className={styles.categoryCard} sx={{ p: 3 }}>
                {category.icon}
                <Typography variant="h6">{category.name}</Typography>
              </Paper>
            ))}
          </Box>
        </Container>
  
        {/* Hot Deals & Promotions Section */}
        <Container className={styles.promotionsSection} sx={{ my: 5 }}>
          <Typography variant="h4" className={styles.sectionTitle} sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
            Hot Deals & Promotions
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: 'gray' }}>
            Grab exclusive discounts on your favorite categories. Limited-time offers you won't want to miss!
          </Typography>
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={3}>
            {[ 
              { deal: "Up to 50% off on Electronics", description: "Get the latest gadgets and tech at unbeatable prices.", icon: <DevicesIcon sx={{ fontSize: 40, color: "#ff5722", mb: 1 }} /> },
              { deal: "Buy 1 Get 1 Free on Fashion", description: "Upgrade your wardrobe with stylish trends and amazing offers.", icon: <FavoriteIcon sx={{ fontSize: 40, color: "#ff5722", mb: 1 }} /> },
              { deal: "Up to 30% off on Home & Furniture", description: "Transform your home with elegant furniture and decor.", icon: <HomeIcon sx={{ fontSize: 40, color: "#ff5722", mb: 1 }} /> },
              { deal: "Up to 70% off on Beauty & Health", description: "Shop skincare, beauty essentials, and health products at huge discounts.", icon: <FaceRetouchingNaturalIcon sx={{ fontSize: 40, color: "#ff5722", mb: 1 }} /> }
            ].map((promotion, index) => (
              <Paper key={index} className={styles.promotionCard} sx={{ p: 3, position: 'relative', overflow: 'hidden', borderRadius: 2, boxShadow: 3, '&:hover': { boxShadow: 6, transform: 'scale(1.05)', transition: '0.3s ease' } }}>
                <Box sx={{ position: 'absolute', top: 10, right: 10, background: '#ff5722', padding: '5px 10px', borderRadius: 2, color: 'white' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Limited Time</Typography>
                </Box>
                {promotion.icon}
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>{promotion.deal}</Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>{promotion.description}</Typography>
                <Button
                  variant="contained"
                  sx={{ marginTop: 2, backgroundColor: '#ff5722', '&:hover': { backgroundColor: '#e64a19' }, fontWeight: 'bold' }}
                  component={Link}
                  to={ROUTES.PRODUCTS} // Link to product list
                  aria-label="Shop Now"
                >
                  Shop Now
                </Button>
              </Paper>
            ))}
          </Box>
        </Container>

        {/* Enhanced Call to Action Section */}
        <Box 
          className={styles.ctaSection}
          sx={{ 
            backgroundImage: "linear-gradient(135deg, #ff9800, #ff5722)", 
            color: "#ffffff", 
            py: 6, 
            textAlign: "center",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <Container>
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h3" className={styles.ctaTitle} sx={{ mb: 2, fontWeight: 'bold' }}>
                Don’t Miss Out on Our Latest Deals!
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 4, maxWidth: "600px", mx: "auto" }}>
                Exclusive discounts and special offers are just a click away. Be the first to grab our best deals!
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ backgroundColor: "#fff", color: "#ff5722", fontWeight: "bold" }}
                component={Link}
                to={ROUTES.PRODUCTS} // Link to products page
                aria-label="Browse Products"
                startIcon={<StarIcon />}
              >
                Shop Now
              </Button>
            </Box>
          
          </Container>
        </Box>
        <br/>
      </div>
    );
};

export default HomePage;
