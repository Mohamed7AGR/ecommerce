import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { WhishListContext } from "../../Context/WhishListContext";
import { CartContext } from "../../Context/CartContext";
import  toast from 'react-hot-toast';


export default function ProductCard() {
  let {addCart,loadingAdd,getCart,setNumOfItems}=useContext(CartContext);

  let { wishList, addWishList, deleteWishList, isInWhishList } =
    useContext(WhishListContext);

    const addProductToCart= async (productId)=>{
      let response= await addCart(productId);
      if(response.data.status==="success"){
        toast.success(response.data.message,{
          position: "top-right",
          duration: 2000,
          style: {
            background: "#15fb29",
            color: "#fff",
          },
        });
        setNumOfItems(response.data.numOfCartItems);
      
      


      }else{
        toast.error('Failed to add product to cart',{
          position: "top-right",
          duration: 2000,
          style: {
            background: "#ff0000",
            color: "#fff",
          },
        });
      }


    }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const getProduct = () => {
    setLoading(true);
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        setProducts(data?.data);
        setLoading(false);
      })
      .catch((response) => {
        console.log(response);
        setLoading(false);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center mx-auto items-center">
        <HashLoader color="#15fb29" size={200} />
      </div>
    );
  }
  return (
    <>
      <div className="container p-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products"
          className="w-full p-2 mb-4 border border-green-500 rounded"
        />
        <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
          {filteredProducts.map((product) => {
            const isFavorite = isInWhishList(product.id);
            return (
              <div className="relative">
                <button
                  className="absolute right-2 top-4 text-2xl"
                  onClick={() =>
                    isFavorite ? deleteWishList(product.id) : addWishList(product)
                  }
                >
                  <i
                    className={`fas fa-heart ${
                      isFavorite ? "text-red-600" : "text-gray-950"
                    }`}
                  ></i>
                </button>
                  <div
                    key={product.id}
                    className=" hover:shadow-md duration-300  hover:shadow-green-300   p-4  rounded overflow-hidden group "
                  >
                <Link to={`/productDetails/${product.id}/${product.category.name}`}>
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-full mb-2 h-64 object-cover "
                    />
                    <span className="text-main font-bold">
                      {product.category.name}
                    </span>
                    <h2 className="">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="flex justify-between items-center mt-7 ">
                      <span className="">{product.price} EGP</span>

                      <span className="flex items-center">
                        <FaStar className="inline-block ms-2  text-yellow-300 " />
                        {product.ratingsAverage}
                      </span>
                    </div>
                </Link>
                    <button onClick={()=>addProductToCart(product.id)}  className=" flex items-center justify-center btn-green group-hover:translate-y-0 transition-all duration-500 translate-y-32 w-full mt-2">
                       {
                        loadingAdd===product.id?<i className="fas fa-spinner fa-spin "></i>:"Add to cart"
                      }
                    </button>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}