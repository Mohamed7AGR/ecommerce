import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import {
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const { isLogin, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  let { numOfItems } = useContext(CartContext);
  function LogOut() {
    setToken(null);
    navigate("/login");
  }
  const [Pages, setPages] = useState([
    { text: "Home", path: "/" },
    { text: "Products", path: "/products" },
    { text: "WhishList", path: "/whishList" },
    { text: `Cart`, path: "/cart" },
    { text: "Categories", path: "/categories" },
    { text: "Brands", path: "/brands" },
  ]);
  const [SignIn, setSignIn] = useState([
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ]);
  const [Icons, setIcons] = useState([
    { icon: <FaFacebook />, url: "https://www.facebook.com" },
    { icon: <FaTwitter />, url: "https://www.twitter.com" },
    { icon: <FaInstagram />, url: "https://www.instagram.com" },
    { icon: <FaTiktok />, url: "https://www.tiktok.com" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com" },
    { icon: <FaYoutube />, url: "https://www.youtube.com" },
  ]);
  return (
    <>
      <nav className="bg-gray-100">
        <div className="max-w-screen-xl flex flex-wrap     p-4 mx-auto  ">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8 me-8" alt="FreshCart Logo" />
          </a>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center ml-auto l p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full lg:flex lg:w-auto grow  "
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border items-center  rounded-lg lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0  ">
              {isLogin &&
                Pages.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 text-gray-900 rounded-sm  hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 "
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}
            </ul>
            <ul className="font-medium   items-center ml-auto flex flex-col p-4  me-2 lg:p-0 mt-4 border rounded-lg  lg:flex-row lg:space-x-3 rtl:space-x-reverse lg:mt-0 lg:border-0 ">
              {Icons.map(({ icon, url }) => (
                <li key={url}>
                  <a
                    href={url}
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 "
                  >
                    {icon}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="font-medium  flex flex-col p-4 lg:p-0 mt-4 border items-center  rounded-lg lg:flex-row lg:space-x-2 rtl:space-x-reverse lg:mt-0 lg:border-0  ">
              {!isLogin &&
                SignIn.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 "
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}
              {isLogin && (
                <>
                  <li className="relative">
                    <FaCartShopping className="text-4xl  text-black/40  ms-2 me-2" />
                    <span className="absolute bottom-4 text-white bg-main px-2 rounded-lg left-6 ">{numOfItems}</span>
                  </li>
                  <li>
                    <button
                      onClick={() => LogOut()}
                      className="block py-2 px-3 text-gray-900 rounded-sm  text-xl hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 "
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
