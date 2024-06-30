import React, { useEffect, useState } from "react";
import remove_icon from "../assets/cross_icon.png";

const ProductList = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/getallproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };  

  useEffect(() => {
    fetchInfo();
  }, [allProducts]);

  const remove_product = async (id) => {
    await fetch('http://localhost:4000/deleteproduct' ,{
      method: 'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    // fetchInfo();
  }
  console.log(allProducts)

  return (
    <div className="fixed w-full h-full ">
      <div className="bg-white h-[82%] w-[75%] mx-10 px-10 mt-5 pt-10">
        <h1 className="font-semibold text-2xl mb-10 items-center flex justify-center">
          All Product List
        </h1>
        <div className="grid grid-cols-6 font-serif font-semibold mx-10 text-gray-500">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <hr className="my-4 h-[3px] relative bg-slate-gray" />
        <div className="overflow-y-auto max-h-[60vh]"> {/* Enclosing only the product list within a separate div */}
          {allProducts.map((item) => (
            <div key={item.id} className="">
              <div className="grid grid-cols-6 ">
                <img
                  className="mx-14"
                  src={item.image}
                  alt="product item"
                  height={70}
                  width={70}
                />
                <p className="mt-6">{item.name}</p>
                <p className="mt-6 ml-8">${item.old_price}</p>
                <p className="mt-6 ml-6">${item.new_price}</p>
                <p className="mt-6">{item.category}</p>
                <img
                  src={remove_icon}
                  alt="delete"
                  onClick={() => {
                    remove_product(item.id);
                  }}
                  className="h-3 w-3 cursor-pointer mt-6"
                />
              </div>
              <hr className="my-4 h-[2px] relative bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
