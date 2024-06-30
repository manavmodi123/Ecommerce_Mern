import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-4xl font-bold mb-4">Payment Cancelled</h1>
      <p className="text-lg mb-8">Your payment was not successful. Please try again.</p>
      <button 
        className="px-6 py-3 bg-red-500 text-white rounded-md"
        onClick={() => navigate('/cart')}
      >
        Go Back to Cart
      </button>
    </div>
  );
};

export default Cancel;
