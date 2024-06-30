import React from "react";

const Description = () => {
  return (
    <div className="mx-28 font-serif">
      <div className="flex">
        <p className=" border-t-2 border-r-2 border-l-2 px-10 py-2 border-gray-400 font-semibold">Description</p>
        <p className="border-t-2 border-r-2  px-10 py-2 border-gray-400">Reviews(122)</p>
      </div>
      <div className="border-2 border-gray-400 px-10 py-10 text-gray-700">
        <p>
          An ecommerce website is an online platform where customers can browse,
          purchase, and sometimes sell products or services over the internet.
          It typically features a user-friendly interface that allows visitors
          to easily navigate through various categories, view product details,
          add items to a shopping cart, and complete secure transactions using
          various payment methods.
        </p><br/>
        <p>
          With a wide range of products available, ecommerce websites cater to
          diverse consumer needs, offering everything from clothing,
          electronics, and home goods to digital downloads and services. These
          platforms often incorporate features such as search filters, product
          reviews, and personalized recommendations to enhance the shopping
          experience. 
        </p>
      </div>
    </div>
  );
};

export default Description;
