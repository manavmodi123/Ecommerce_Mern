import React, { useContext, useEffect,  } from 'react'
import { ShopContext } from '../Context/ShopContext';

const Profile  = () => {
    const {userProfile } = useContext(ShopContext) // Initialize userProfile as an object

console.log(userProfile);

  return (
    <div className='flex items-center justify-center mt-10 text-3xl font-serif'>Hello {userProfile.name}</div>
  )
}

export default Profile 