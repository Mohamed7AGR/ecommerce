import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WhishListContext = createContext();

export default function WhishListProvider({ children }) {
  const [wishList, setWishList] = useState([]);
 

  let headers = {
    token: localStorage.getItem('token')
  };

  const getWishList = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,{headers:headers} );
        setWishList(data?.data||[]);
        localStorage.setItem('whishList',JSON.stringify(data?.data||[]));       
    } catch (error) {
        console.log(error);
       
    }
  };

  const addWishList = async (product) => {
    try {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:product.id},{headers:headers});
        setWishList([...wishList,product]);
        localStorage.setItem('whishList',JSON.stringify([...wishList,product]));  
    }catch (error) {
        console.log(error);
    }
  }

  const deleteWishList = async (productId) => {
    try {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers:headers});
        let filterWishList = wishList.filter((item)=>item.id !== productId);
        setWishList(filterWishList);
        localStorage.setItem('whishList',JSON.stringify(filterWishList)); 
        
    }catch (error) {
     console.log(error)
    }
  }

  const isInWhishList = (productId) => {
    return wishList.some((item) => item.id == productId);
  }

  useEffect(() => {
    const storedWishList = localStorage.getItem('whishList');
    
    if (storedWishList) {
        setWishList(JSON.parse(storedWishList));
    } else {
        getWishList();
    }
    
  },[]);

  return <WhishListContext.Provider value={{wishList,addWishList,deleteWishList,isInWhishList}}>{children}</WhishListContext.Provider>;
}