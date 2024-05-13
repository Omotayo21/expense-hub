'use client'
import Link from 'next/link'
import React from 'react'

const error = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='font-bold text-xl text-red-700'>Error page</h2>
<p className='text-lg'>Sorry this page doesn't exist</p>
<Link>
<button className='bg-green-700 text-white w-64 p-2 rounded-md'> 
  Click here to go back to homepage
  </button></Link>

    </div>
  )
}

export default error