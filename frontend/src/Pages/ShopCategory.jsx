import React, { useContext } from 'react'
import {ShopContext} from '../Context/ShopContext';
import dropdownIcon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item';
const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext)
  return (
    <div>
      <img src={props.banner} className='mx-20 my-8' />
      <div className='flex justify-between mx-20 -mb-5'>
        <p className='font-semibold font-serif'>Showing 1-12<span className='font-normal text-gray-500'  > out of 36 products</span></p>
        <div className='flex items-center gap-2 w-30 h-10 text-gray-500 font-serif border-2 border-gray-500 rounded-full py-2 px-6'>Sort by <img src={dropdownIcon} className='h-2 w-2.5' alt='dropdown icon' /></div>
      </div>
      <div className='grid grid-cols-4 mx-[27px]'>
      {all_product.map((item) => {
        if (item.category === props.category) {
          return <Item key={item.id} {...item} />;
        } else {
          return null;
        }
      })}
      </div>
      <div className=' h-16 flex justify-center items-center mx-[550px] mt-20 bg-gray-400 text-white rounded-full '>
  Click to See More Products
</div>
    </div>
  )
}

export default ShopCategory