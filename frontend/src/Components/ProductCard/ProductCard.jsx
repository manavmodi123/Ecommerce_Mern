import React, { useContext, useState } from 'react'
import starIcon from '../Assets/star_icon.png'
import starDullIcon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

const ProductCard = (props) => {
    const {cartItems , addToCart} = useContext(ShopContext);
    // console.log(cartItems)
    const product = props.product

    const [mainImage ,setMainImage] = useState(product.image)
  
    const images = [
        product.image,
        product.image,
        product.image,
        product.image
      ];

  return (
    <div className='flex mx-28 my-10 font-serif'>
        <div className='flex w-[60%]'>
            <div>
            {images.map((image , index) => (
                <img src={image} key={index} alt={`Thumbnail ${index+1}`} height={95} width={95} className='mt-3 gap-1x' onClick={() => setMainImage(image)} />
            ))}
            </div>
            <div className='ml-10'>
                <img src={mainImage} alt="Product Image" height={800} width={410} className='mt-3' />

            </div>
        </div>
        <div className='-ml-10 mt-3 w-[55%]'>
            <div className='text-3xl font-semibold text-gray-700'>{product.name}</div>
            <div className='flex mt-3 h-4 w-4 gap-1'>
                <img src={starIcon} />
                <img src={starIcon} />
                <img src={starIcon} />
                <img src={starIcon} />
                <img src= {starDullIcon}/>
                <p className=' -mt-1'>(120)</p>
            </div>
            <div className='my-10 flex gap-10 text-xl'>
                <p className='text-gray-500 line-through'>${product.old_price}</p>
                <p className='text-red-500'>${product.new_price}</p>
            </div>
            <p className='text-gray-500 text-[15.9px] mb-3'>A lightweight , usually  knitted , pullover tshirt , close-fitting and with a round neckline and short sleeves , worn as an undershirt or outer garment </p>

            <div className='mt-10'>
                <p>Select Size</p>
                <div className='flex gap-10 text-gray-500'>
                    <p className='bg-gray-100 py-2 px-4'>S</p>
                    <p className='bg-gray-100 py-2 px-4'>M</p>
                    <p className='bg-gray-100 py-2 px-4'>L</p>
                    <p className='bg-gray-100 py-2 px-4'>XL</p>
                    <p className='bg-gray-100 py-2 px-4'>XXL</p>
                </div>
                <button className='bg-red-500 my-4 py-2 px-16 text-white' onClick={() => addToCart(product.id)}>Add to Cart</button>
                <p className='mt-2 font-semibold'>Category :<span className='font-normal text-gray-600'>{product.category}  ,T-Shirt , Crop Top</span></p>
                <p className='mt-1 font-semibold'>Tags :<span className='font-normal text-gray-600'>Modern , Latest</span></p>
            </div>
        </div>
    </div>
  )
}

export default ProductCard