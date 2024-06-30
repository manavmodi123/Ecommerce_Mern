import React from 'react'
import handIcon from '../Assets/hand_icon.png';
import heroIcon from '../Assets/hero_image.png';
import arrowIcon from '../Assets/arrow.png';

const Hero = () => {
  return (
    <div className='hero flex bg-gradient-to-b from-purple-100 to-white-100'>
      <div className='hero-left mt-40 m-20 flex-1 justify-center items-center'>
        <h2 className=' font-serif text-xl font-semibold'>NEW ARRIVALS ONLY</h2>
        <div className='img flex'>
            <p className='font-serif text-6xl mr-2 mt-2 font-bold'>new</p>
            <img src={handIcon} alt="Hand Icon" height={18} width={60} className='mt-2'/>
        </div>
        <p className='font-serif text-6xl mr-2 font-bold'>collections </p>
        <p className='font-serif text-6xl mr-2 font-bold'>for everyone</p>
        <button className=' flex mt-10 bg-red-500 text-white py-3 px-7 rounded-full'>Latest Collection
        <img src={arrowIcon} className='w-3 h-3 ml-2 mt-[7px]' /></button>

      </div>
      <div className='hero-right'>
        <img src={heroIcon} alt="Hero Image"  className=' object-contain  mr-24  ' width={450}/>
      </div>
    </div>
  )
}

export default Hero
