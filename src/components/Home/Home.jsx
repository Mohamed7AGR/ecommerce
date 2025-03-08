import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import CategorySlider from "../CategorySlider/CategorySlider";
import MainSlider from "../MainSlider/MainSlider";
export default function Home() {
  return (
    <div className="container">
      <div>
      <MainSlider/>
      <CategorySlider />
      </div>
      <ProductCard />
    </div>
  );
}