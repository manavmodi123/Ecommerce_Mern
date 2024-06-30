import React from 'react'
import arrowIcon from '../Assets/breadcrum_arrow.png'

const BreadCrums = (props) => {
    const product = props.product;
  return (
    <div className='flex gap-2 text-[12px] uppercase mt-10 ml-40'>
      HOME <img src={arrowIcon} /> SHOP <img src={arrowIcon} /> {product.category} <img src={arrowIcon} /> {product.name}
    </div>
  )
}

export default BreadCrums
