import React from 'react';
import { Box, Typography, Container, Link, IconButton, Divider, Grid } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Phone, Email } from '@mui/icons-material';
import styles from './MainLayout.module.css'; // Custom styling for the footer

const Footer= () => {
    return (
        <Box className={styles.footer} sx={{ backgroundColor: '#101010', color: '#fff', py: 6 }}>
            <Container>
                {/* Footer Top Section */}
                <Grid container spacing={4}>
                    {/* About Us Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            About Us
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            At My Shopping Site, we are committed to delivering top-quality products at the best prices, ensuring an excellent shopping experience.
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            Our goal is to make shopping easy, enjoyable, and rewarding for our customers.
                        </Typography>
                       
                    </Grid>

                  {/* Useful Information Section */}
<Grid item xs={12} sm={6} md={4}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
        Terms and Conditions
    </Typography>
    <Box>
        {/* Return and Shipping Policies */}
        <Typography variant="body2" sx={{ display: 'block', mb: 1, color: '#aaa' }}>
            <strong>Return Policy:</strong> Easy returns within 30 days.
        </Typography>
        <Typography variant="body2" sx={{ display: 'block', mb: 1, color: '#aaa' }}>
            <strong>Shipping Info:</strong> Free shipping on orders over $50.
        </Typography>

        {/* Customer Support */}
        <Typography variant="body2" sx={{ display: 'block', mb: 1, color: '#aaa' }}>
            <strong>Need Help?</strong> Reach us at <Link href="mailto:support@example.com" color="inherit">shopease@example.com</Link>
        </Typography>
        
      
       
    </Box>
</Grid>


                    {/* Contact Section */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                            Contact Us
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Phone sx={{ color: '#ff5722', mr: 1 }} />
                            <Typography variant="body2">+1 234 567 890</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Email sx={{ color: '#ff5722', mr: 1 }} />
                            <Typography variant="body2">shopEase@example.com</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <LocationOn sx={{ color: '#ff5722', mr: 1 }} />
                            <Typography variant="body2">123 Street, City, Country</Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Divider Line */}
                <Divider sx={{ backgroundColor: '#444', my: 4 }} />

                {/* Social Media Section */}
                <Box display="flex" justifyContent="center" sx={{ mb: 4 }}>
                    <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white', mr: 2 }} aria-label="Facebook">
                        <Facebook sx={{ fontSize: 30 }} />
                    </IconButton>
                    <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'white', mr: 2 }} aria-label="Twitter">
                        <Twitter sx={{ fontSize: 30 }} />
                    </IconButton>
                    <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white', mr: 2 }} aria-label="Instagram">
                        <Instagram sx={{ fontSize: 30 }} />
                    </IconButton>
                    <IconButton href="https://linkedin.com" target="_blank" sx={{ color: 'white' }} aria-label="LinkedIn">
                        <LinkedIn sx={{ fontSize: 30 }} />
                    </IconButton>
                </Box>

                {/* Footer Bottom Section */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        &copy; {new Date().getFullYear()} My Shopping Site. All Rights Reserved.
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.5, mt: 1 }}>
                        Designed with <span style={{ color: '#ff5722' }}>♥</span> by ShopEase
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
