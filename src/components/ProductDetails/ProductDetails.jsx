import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaPlus, FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,

  };

  const [productDetails, setProductDetails] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);

  let { id, category } = useParams();

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
      })
      .catch(() => {});
  }
  function getRelatedProduct(category) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProduct = data.data;
        let related = allProduct.filter(
          (product) => product.category.name == category
        );
        setRelatedProduct(related);
      });
  }
  useEffect(() => {
    getProductDetails(id);
    getRelatedProduct(category);
  }, [id, category]);

  return (
    <>
      <div className="container p-10 ">
        <div className="grid grid-cols-12 ">
          <div className="col-span-12 md:col-span-4">
            {/* <img
              src={productDetails?.imageCover}
              alt={productDetails?.title}
              className="md:max-w-80 max-w-80 mx-auto"
            /> */}

         {
          productDetails?.images.length>1?   <Slider {...settings} className="w-[350px] ">
          {productDetails?.images.map((src)=>{
            return <div><img src={src} className="object-cover" alt=""/></div>
          })}
          </Slider>:<img src={productDetails?.imageCover} alt={productDetails?.title} className="md:max-w-80 max-w-80 mx-auto object-cover"/>
         }
          </div>
          <div className="col-span-12 md:col-span-8 self-center">
            <h2 className="text-lg font-bold text-main">
              {productDetails?.title}
            </h2>
            <p className="text-sm text-black/40">
              {productDetails?.description}
            </p>
            <div className="flex justify-between items-center mt-7 ">
              <span className="">{productDetails?.price} EGP</span>

              <span className="flex items-center">
                <FaStar className="inline-block ms-2  text-yellow-300 " />
                {productDetails?.ratingsAverage}
              </span>
            </div>
            <button className=" flex items-center justify-center btn-green   w-full mt-2">
              <FaPlus className="me-2" /> Add
            </button>
          </div>
        </div>

        <div className="container p-10">
          <div className="grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            {relatedProduct.map((product) => (
              <Link
                to={`/productDetails/${product.id}/${product.category.name}`}
              >
                <div
                  key={product.id}
                  className=" hover:shadow-md duration-500  hover:shadow-green-500 p-4 rounded overflow-hidden group "
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full mb-2 h-64"
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
                  <button className=" flex items-center justify-center btn-green group-hover:translate-y-0 transition-all duration-500 translate-y-32 w-full mt-2">
                    <FaPlus className="me-2" /> Add
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
