import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "flowbite/dist/flowbite.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhishListProvider from "./Context/WhishListContext"
import UserContextProvider from "./Context/UserContext"
import CartProvider from "./Context/CartContext.jsx";
import  { Toaster } from 'react-hot-toast';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
       <WhishListProvider>
       <UserContextProvider>
        <App />
        </UserContextProvider>
        </WhishListProvider>
        </CartProvider>
      
  </StrictMode>
);
