import React from 'react'
import logo from "../Assets/logo.png";
import instagramImg from '../Assets/instagram_icon.png';
import pintesterImg from '../Assets/pintester_icon.png';
import whatsappImg from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
        <div className="nav-logo flex mt-3 mb-2 mx-16 leading-normal">
        <img src={logo} style={{height:"60px", width:"60px"}}/>
        <p className="mt-5 ml-4 text-4xl font-bold">Manv</p>
      </div>
      <ul className='flex gap-14 mt-10 text-gray-600 font-serif'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className='flex my-10 gap-6'>
        <img src={instagramImg} alt=""  width={20} height={18}/>
        <img src={pintesterImg} alt="" width={20} height={18}/>
        <img src={whatsappImg} alt="" width={20} height={18}/>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <hr className='my-4 h-[3px] w-[1200px] bg-gray-400 rounded-full' />
        <p className='text-gray-600 mb-4 font-serif'>Copyright @ 2024 - Manav Modi - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer