import React from 'react'
import add_product from '../assets/Product_Cart.svg';
import product_list from '../assets/Product_list_icon.svg';
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className='h-screen w-[17%] fixed'>
        <Link  to="/add">
        <div className=' bg-gray-100 mt-10 w-[80%] mx-4'>
            <button className='flex gap-3 px-3 py-2 rounded-lg '>
                <img src={add_product} />
                <p className='mt-1'>Add Product</p>
            </button>
        </div>
        </Link>

        <Link to='/'>
        <div className=' bg-gray-100 mt-6 w-[80%] mx-4'>
            <button className='flex gap-3 px-3 py-2 rounded-lg'>
                <img src={product_list} />
                <p className='mt-1'>Product List</p>
            </button>
        </div>
        </Link>
    </div>
  )
}

export default SideBar
