import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Cart() {
  let { getCart, deleteCart, updateCart, clearCart, numOfItems, setNumOfItems
    } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const getCartProduct = async () => {
    let response = await getCart();
    setCartDetails(response.data);
    setNumOfItems(response.data.numOfCartItems);
    setTotalCartPrice(response.data.data.totalCartPrice);
  };

  const deleteCartProduct = async (productId) => {
    let response = await deleteCart(productId);
    setCartDetails(response.data);
    setNumOfItems(response.data.numOfCartItems);
    setTotalCartPrice(response.data.data.totalCartPrice);
  }

  const updateCartProduct = async (productId, count) => {
    let response = await updateCart(productId, count);
    setTotalCartPrice(response.data.data.totalCartPrice);
    setCartDetails(response.data);
    
  }

  const clearCartProduct = async () => {
    let response = await clearCart();
    if (response.data.message == "success") {
      getCartProduct();
    }
    setTotalCartPrice(response.data.data.totalCartPrice);
    setCartDetails(response.data);
  }

  useEffect(() => {
    getCartProduct();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <div className=" relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center  p-5 ">
          <h2 className="text-4xl">Cart Shop</h2>
          <Link to={'/checkOut'} className="bg-blue-500 p-3 rounded-lg hover:bg-blue-800 duration-500 text-white">Check Out</Link>
        </div>
        <div className="flex justify-between px-12 py-2">
          <h3 className="text-2xl  font-bold">Total Price : {totalCartPrice} </h3>
          <h3 className="text-2xl  font-bold">Total Number Of Items : {numOfItems}</h3>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <tbody>
            {cartDetails?.data?.products.map((product) =>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img
                    src={product.product.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt={product.product.title}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title.split(" ").slice(0, 2).join(" ")}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={() => updateCartProduct(product.product.id, `${product.count - 1}`)}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span className="">{product.count}</span>
                    </div>
                    <button onClick={() => updateCartProduct(product.product.id, `${product.count + 1}`)}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span onClick={() => deleteCartProduct(product.product.id)}
                    className="font-medium text-red-600 hover:underline cursor-pointer flex items-center"
                  >
                    <MdDelete /> Remove
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center mt-5  p-5 ">
          <button onClick={clearCartProduct} className="border text-2xl hover:bg-main hover:text-white duration-500 border-green-400 rounded-lg p-3 text-black">Clear Your Cart</button>
        </div>
      </div>
    </div>
  );
}