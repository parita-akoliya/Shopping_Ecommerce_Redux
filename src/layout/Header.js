import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { ROUTES } from "../routes/routeConfig";
import { Link } from "react-router-dom";
import userLogo from "../assests/images/user-image.png";
import { useSelector } from "react-redux";
const Header = () => {
   // Access the cart items from Redux
   const cartItems = useSelector((state) => state.cart.items); // Assuming the cart items are stored in state.cart.items
   const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0); // Calculate the total number of items in the cart
 
  const menuItems = [
    { name: "Home", to: ROUTES.HOME },
    { name: "Products", to: ROUTES.PRODUCTS },
    { name: "Cart", to: ROUTES.CART }
  ];
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        ShopEase
        </Typography>
        <Box sx={{ display: "flex", gap: 3 }}>
          {menuItems.map((item) => (
            <Button
              key={item.name}
              color="inherit"
              component={Link}
              to={item.to}
              sx={{ textTransform: "none" }}
            >
              {item.name}
              {item.name === "Cart" && cartItemCount > 0 && ( // Display cart count if more than 0
                <Badge
                  badgeContent={cartItemCount}
                  color="secondary"
                  sx={{ ml: 1 }} // Add some margin to the left
                />
             ) }
            </Button>
          ))}
           {/* User Image on the right */}
        <Box sx={{ ml: "auto" }}>
          <img src={userLogo} width={'45px'} height={'45px'} style={{borderRadius:'50%'}}/>
        </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
