import { createContext, useState } from "react";
import axios from "axios";

export let CartContext = createContext();

export default function CartProvider({ children }) {
  const [loadingAdd, setLoadingAdd] = useState(null);
  const [numOfItems, setNumOfItems] = useState(0);
  const [cartId, setCartId] = useState('');
  
 


  let headers = {
    token: localStorage.getItem("token"),
  };

  const addCart = (productId) => {
    setLoadingAdd(productId);
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers: headers }
      )
      .then((response) => {
        setLoadingAdd(null);
        
    
        return response;
      })
      .catch((error) => {
        setLoadingAdd(null);
        return error;
      });
  };

const getCart = () => {
  return axios
    .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: headers })
    .then((response) => {
      setCartId(response.data.cartId);
      return response;
    })
    .catch((error) => error);
};

  const deleteCart = (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  };

  const updateCart = (productId,count) => {
    return axios
    .put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count}, {
      headers: headers,

    },
  )
    .then((response) => response)
    .catch((error) => error);
  }
 const clearCart = () => {
  return axios
  .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: headers,
  })
  .then((response) => response.data)
  .catch((error) => error.response);
}

const cacheOnDelivery = (shippingAddress) => {
  return axios
  .post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress:shippingAddress}, {
    headers: headers,
  })
  .then((response) => {
    if(response.data.status === "success"){
      getCart()
      setNumOfItems(response.data.numOfItems)
    }
    return response
  })
  .catch((error) => error);
}

const onlinePayment = (shippingAddress) => {
  return axios
  .post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress:shippingAddress}, {
    headers: headers,
  })
  .then((response) => {
    if(response.data.status === "success"){
      getCart()
      setNumOfItems(response.data.numOfItems)
    }
    return response
  })
  .catch((error) => error);
}


  return (
    <CartContext.Provider value={{ addCart, loadingAdd, getCart, deleteCart,updateCart,clearCart,numOfItems, setNumOfItems,cacheOnDelivery,onlinePayment ,}}>
      {children}
    </CartContext.Provider>
  );
}
