import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

const Success = () => {
  const navigate = useNavigate();
  const {cartDetails,getTotalCartAmount} = useContext(ShopContext);
  console.log(cartDetails,getTotalCartAmount());

  useEffect(() => {
    const body = {
      prodcutDetails:cartDetails,
      totalAmount : getTotalCartAmount(),
    };
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    try {
      const response = fetch('http://localhost:4000/orderDetails', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = response.json();
  
      if (result.error) {
        console.error(result.error);
      } else {
        console.log('Order details stored successfully');
        // Proceed to the next step, e.g., redirect to the order confirmation page
      }
    } catch (error) {
      console.error('Error storing order details:', error);
    }
  })
  
  return (
    <div className='flex  justify-center items-center mt-20'>
      <div className="flex flex-col justify-center items-center bg-green-100 w-[50%] h-[500px]">
      <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-8">Thank you for your purchase. Your payment was successful.</p>
      <button 
        className="px-6 py-3 bg-red-500 text-white rounded-md"
        onClick={() => navigate('/')}
      >
        Go to Home
      </button>
    </div>
    </div>
  );
};

export default Success;