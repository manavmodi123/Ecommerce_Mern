import React, { useState } from "react";
import upload_area from "../assets/upload_area.svg";

const AddProduct = () => {
  let [productDetails, setProductDetails] = useState({
    name: "",
    image: null,
    old_price: 0,
    new_price: 0, // Replaced discount with discountedPrice
    category: "select", // Default value for category dropdown
  });

  const imageHandle = (e) => {
    setProductDetails({
      ...productDetails,
      image: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is price or discount, calculate discountedPrice
    const updatedProductDetails = {
      ...productDetails,
      [name]: value,
    };
    if (name === "old_price" || name === "discount") {
      const old_price = parseFloat(updatedProductDetails.old_price);
      const discount = parseFloat(updatedProductDetails.discount);
      const new_price =
        isNaN(old_price) || isNaN(discount) || discount < 0
          ? 0
          : old_price - (old_price * discount) / 100;
      updatedProductDetails.new_price = new_price;
    }
    setProductDetails(updatedProductDetails);
  };

  const handleSubmit = async () => {
    // Here you can submit productDetails to your database
    console.log(productDetails);
    productDetails = Object.keys(productDetails)
      .filter((objKey) => objKey !== "discount")
      .reduce((newObj, key) => {
        newObj[key] = productDetails[key];
        return newObj;
      }, {});
      console.log(productDetails);

      let responseData;
      let product = productDetails;

      let formData = new FormData();
      formData.append('product',product.image);

      await fetch('http://localhost:4000/image',{
        method: 'POST',
        headers:{
          Accept:'application/json',
        },
        body:formData

      }).then((resp) => resp.json()).then((data) => {responseData =data})

      if(responseData.success){
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
          method:'POST',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
          },
          body:JSON.stringify(product)
        }).then((res) => res.json()).then((data) => {
          data.success?alert("Product Added") : alert("Failed")
        })
      }
  };

  return (
    <div className="fixed w-full h-full text-slate-400">
      <div className="bg-white h-[80%] w-[75%] mx-10 px-10 mt-10 pt-10">
        <h1 className="justify-center items-center flex text-xl">
          Add A Product
        </h1>
        <div className="flex flex-col gap-2 mx-10">
          <label>Product Title</label>
          <input
            type="text"
            placeholder="Type Here"
            name="name"
            value={productDetails.name}
            className="border-[1px] border-slate-300 h-12 px-4"
            onChange={handleInputChange}
          />
        </div>
        <div className="mx-10 py-10 flex gap-10">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Price</label>
            <input
              type="text"
              placeholder="Type Here"
              name="old_price"
              value={productDetails.old_price === 0 ? "" : productDetails.old_price}
              className="border-[1px] border-slate-300 w-full h-12 px-4"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label>Discount (%)</label>
            <input
              type="text"
              placeholder="Type Here"
              name="discount"
              value={productDetails.discount}
              className="border-[1px] border-slate-300 w-[50%] h-12 px-4"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mx-10 flex gap-10">
          <div className="flex flex-col gap-2 w-1/2">
            <label>Discounted Price</label>
            <input
              type="text"
              value={
                isNaN(productDetails.new_price) || productDetails.new_price < 0
                  ? 0
                  : productDetails.new_price
              }
              name="discounted_price"
              className="border-[1px] border-slate-300 w-full h-12 px-4"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label>Category</label>
            <select
              name="category"
              className="border-[1px] border-slate-300 w-[40%] h-12 px-4"
              value={productDetails.category}
              onChange={handleInputChange}
            >
              <option value="select">Select</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>
        <div className="mx-10 flex mt-6 gap-10">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="file-input">
              {" "}
              Product Image
              <img
                src={
                  productDetails.image
                    ? URL.createObjectURL(productDetails.image)
                    : upload_area
                }
                className="mt-1 w-20 h-50"
              />
            </label>
            <input
              onChange={imageHandle}
              type="file"
              name="image"
              id="file-input"
              hidden
            />
          </div>
          <button
            onClick={handleSubmit}
            className="h-14 w-50 px-10 py-3 rounded-2xl ml-[300px] mt-10 text-white bg-blue-500"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
