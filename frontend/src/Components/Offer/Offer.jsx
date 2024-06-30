import React from 'react'
import exlusiveImg from '../Assets/exclusive_image.png';

const Offer = () => {
  return (
    <div className='flex justify-between mx-36 mt-60 bg-gradient-to-b from-purple-100 to-white-100'>
        <div className='mx-20 my-40'>
            <h1 className='text-6xl font-serif font-semibold my-2'>Exclusive</h1>
            <h1 className='text-6xl font-serif font-semibold my-2'>Offers For You</h1>
            <p className='font-serif my-6'>ONLY ON BEST  SELLERS  PRODUCTS</p>
            <button className='m-2 bg-red-500 text-white py-3 px-12 rounded-full'>Check Now</button>
        </div>
        <div className='mr-20'>
            <img src={exlusiveImg} alt='exclusive' />
        </div>

    </div>
  )
}

export default Offer