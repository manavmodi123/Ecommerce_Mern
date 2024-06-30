import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'


const NewCollection = () => {
  const [new_collection , setNew_collection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollection")
      .then((res) => res.json())
      .then((data) => setNew_collection(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);
  return (
    <div className="popular ">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-5xl font-semibold font-serif mt-6">
          NEW COLLECTIONS
        </h1>
        <hr className="mt-6 h-[6px] w-[200px] bg-black rounded-full " />
      </div>
      <div className="grid grid-cols-4 px-24 ">
        {new_collection.map((item) => (
            <Item key={item.id}  {...item}/>
        ))}
      </div>
    </div>
  )
}

export default NewCollection