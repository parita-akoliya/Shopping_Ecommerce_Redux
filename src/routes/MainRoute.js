import React, { Suspense } from "react";
import MainLayout from "../layout/MainLayout";
import {  useRoutes } from "react-router-dom";
import { ROUTES } from "./routeConfig";
const MainRoute = () => {
    const HomePage = React.lazy(() => import('../pages/Home/HomePage'));
    const ProductPage = React.lazy(() => import('../pages/ProductList/ProductList'));
    const ProductDetailPage = React.lazy(() => import('../pages/ProductDetails/ProductDetails'));
    const AddToCartPage = React.lazy(()=>import('../pages/AddToCart/AddToCartPage'));
    const CheckoutPage =React.lazy(()=>import('../pages/Checkout/Checkout'));
  const routes = [
    {
      path: ROUTES.HOME,
      element: <MainLayout />,
      children: [
        // { path: '*', element: <NotFoundPage /> },
        { path:ROUTES.HOME, element: <HomePage></HomePage> },

    {path:ROUTES.PRODUCTS,element:<ProductPage/>},
    {path:ROUTES.PRODUCT_DETAILS,element:<ProductDetailPage/>},
    {path:ROUTES.CART,element:<AddToCartPage/>},
    {path:ROUTES.CHECKOUT,element:<CheckoutPage></CheckoutPage>}
      ],
    },
  ];

  const element = useRoutes(routes);
  return (
 <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
  
     
    
  );
};
export default MainRoute;
