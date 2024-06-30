import React, { useState,useEffect } from "react";

import Item from "../Item/Item";

const Popular = () => {
  const [data_product , setData_product] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((res) => res.json())
      .then((data) => setData_product(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <div className="popular ">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-5xl font-semibold font-serif mt-6">
          POPULAR IN WOMEN
        </h1>
        <hr className="mt-6 h-[6px] w-[200px] bg-black rounded-full " />
      </div>
      <div className="flex px-24 gap-20">
        {data_product.map((item) => (
            <Item key={item.id}  {...item}/>
        ))}
      </div>
    </div>
  );
};

export default Popular;
