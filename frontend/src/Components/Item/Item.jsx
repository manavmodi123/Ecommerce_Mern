import React from "react";
import { Link } from "react-router-dom";

const Item = ( props ) => {
  return (
    <Link to={`/product/${props.id}`}>
    <div className="mx-auto mt-11 w-64 transform rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg" onClick={window.scrollTo(0,0)}>
      <img
        className=" object-contain object-center"
        src={props.image}
        alt="Product Image" 
      />
      <div className="p-4">
        <h2 className="mb-2 text-[14px] font-medium text-black-900">{props.name}</h2>

        <div className="flex items-center">
          <p className="mr-2 text-[14px] font-semibold text-black-900 ">${props.new_price}</p>
          <p className="text-[14px]  font-medium text-gray-500 line-through ">
            ${props.old_price}
          </p>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default Item;
