import React from 'react'
import error from '../../assets/images/error.svg'
export default function NotFound() {
  return (
    <div className='flex justify-center container py-4'>
    <img src={error} className='w-1/2' alt={error} />
      
    </div>
  )
}
