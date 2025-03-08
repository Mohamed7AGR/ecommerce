import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

export default function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const [categories, setCategories] = useState([])
  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then(({data})=>{
      setCategories(data.data);
    }).catch(()=>{})
  }
  useEffect(() => {
    getCategories();
  }, [])
  return (
    <div className='container mx-auto '>
      <Slider {...settings}>
        {
          categories.map((c)=> <div>
            <img src={c.image} alt={c.name} className='h-44 object-cover w-full' />
            <h2>{c.name}</h2>
          </div>)
        }
      </Slider>
    </div>
  )
}
