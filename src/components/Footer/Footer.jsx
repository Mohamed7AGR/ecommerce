import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-gray-100 py-10 px-20 '>
      <div className="container">
        <h2 className="text-3xl font-medium">
          Get the FreshCart app
        </h2>
        <p className="text-gray-600">
          We will send you a link, open it to your phone to download the app
        </p>

      </div>
      <div className="flex items-center py-5  ">
      <input type="email" id="email" class="bg-gray-50 border me-5  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-[70%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" placeholder="name@flowbite.com" />
      
      <button type="submit" class="text-white bg-main w-[25%] hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  sm:w-auto px-16 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share app kink</button>

      </div>
<div className="flex border-y-2 p-5 justify-between">
  <p className="">Payment Methods</p>
  <p className="">Get delivers whit fresh cart</p>
</div>
    </footer>
  )
}
