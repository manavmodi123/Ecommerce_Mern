import React from 'react'

const NewsLetter = () => {
  return (
    <div className='flex justify-center mx-36 mt-20 bg-gradient-to-b from-purple-100 to-white-100'>
        <div className='mx-10 my-20'>
            <h1 className='text-5xl font-serif font-semibold my-2'>Get Exclusive Offers On Your Email</h1>
            <p className='flex justify-center items-center mt-10 font-serif text-[17px] text-gray-500'>Subscribe to our newsletter and stay updated.</p>
            <div className='mt-8 justify-center items-center flex relative'>
                <input type='email' placeholder="Your Email Id" className=' w-[450px] h-12 font-serif border-[0.8px] text-[16px] border-gray-400 rounded-full px-6'/>
                <button className='bg-black text-white h-12 w-[180px] z-10 ml-[450px] rounded-full absolute'>Subscribe</button>
            </div>
           
        </div>
        

    </div>
  )
}

export default NewsLetter