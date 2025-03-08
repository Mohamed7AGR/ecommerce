import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'

import { HashLoader } from 'react-spinners';

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
 const{isLoading,isError,data }= useQuery({
    queryKey:'allCategories',
    queryFn:getCategories
  });
  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center mx-auto items-center">
        <HashLoader color="#15fb29" size={200} />
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto container max-w-7xl py-5">
        <h1 className="text-5xl text-main text-center font-bold mb-10 ">All Categories</h1>
        <div className="grid   lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          {
            data?.data?.data.map((categories) => {
              return (
                <div className="categories rounded-xl border   hover:shadow-green-300 hover shadow-lg duration-1000 " key={categories._id}>
                  <img src={categories.image} className='w-full object-cover h-60 mb-3' />
                  <h1 className="text-main text-2xl text-center">{categories.name}</h1>
                </div>
              )

            })
          }

        </div>
      </div>
    </>
  )
}
