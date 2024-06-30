import React from 'react'
import Item from '../Item/Item'
import data_product from "../Assets/data";


const Related = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col mt-10">
        <h1 className="text-5xl font-semibold font-serif mt-6">
          Related Products
        </h1>
        <hr className="mt-6 h-[6px] w-[200px] bg-black rounded-full " />
      </div>
      <div className="flex px-24 gap-20">
        {data_product.map((item) => (
            <Item key={item.id}  {...item}/>
        ))}
      </div>
    </div>
  )
}

export default Related