import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import {loadStripe} from '@stripe/stripe-js';


const CartItem = () => {
  const {
    getTotalCartAmount,
    all_product,
    cartDetails,
    cartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
  } = useContext(ShopContext);

  const makePayment = async () => {
    const stripe = await loadStripe("pk_test_51PKfw0SDNrzV9IQGn9gHwOj57A0QhQG5k8FY2dCKjk3Ewuwk2TXXBo0NcfIbvqsXnVnv6xYqokWx4EKYxY2Zl3X900f5DqxhGO");
    console.log(cartDetails);
    const body = {
      products: cartDetails,
      totalAmount: getTotalCartAmount(),
    };
  
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
  
    try {
      const response = await fetch('http://localhost:4000/create-checkout-session', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.statusText} - ${errorText}`);
      }
  
      const { id: sessionId } = await response.json();
  
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
  
      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('There was an issue creating the checkout session. Please try again.');
    }
  };
  
  

  return (
    <div className="mx-32 my-20">
      <div className="flex gap-20 items-center justify-start flex-wrap font-serif font-semibold">
        <p>Products</p>
        <p>Title</p>
        <p className="ml-48 pl-14">Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="my-4 h-[3px] relative bg-slate-gray" />
      {all_product.map((item) => {
        if (cartItems[item.id] > 0) {
          return (
            <div key={item.id}>
              <table className="my-4 text-[15px]">
                <tbody>
                  <tr className="my-2 text-gray-500">
                    <td>
                      <img
                        className="mx-4"
                        src={item.image}
                        alt="product item"
                        height={50}
                        width={50}
                      />
                    </td>
                    <td>
                      <p className="ml-16 w-[350px]">{item.name}</p>
                    </td>
                    <td>
                      <p className="ml-4">${item.new_price}</p>
                    </td>
                    <td>
                      <div className="mx-10 ml-20 ">
                        <button
                          className="mx-2 bg-gray-100 px-4 py-2 rounded-sm"
                          onClick={() => {
                            removeFromCart(item.id);
                          }}
                        >
                          -
                        </button>

                        {cartItems[item.id]}
                        <button
                          className="mx-2 bg-gray-100 px-4 py-2 rounded-sm"
                          onClick={() => {
                            addToCart(item.id);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${item.new_price * cartItems[item.id]}</td>
                    <td>
                      <img
                        src={remove_icon}
                        alt="delete"
                        onClick={() => {
                          deleteFromCart(item.id);
                        }}
                        className="h-3 w-3 cursor-pointer ml-28"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <hr className="my-4 h-[2px] relative bg-gray-200" />
            </div>
          );
        }
      })}
      <div className="flex my-4 gap-20">
        <div className="w-[50%]">
          <p className="my-10 text-2xl font-semibold font-serif">Cart Totals</p>
          <div className="flex text-gray-500 justify-between">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr className="mt-2" />
          <div className="flex  text-gray-500 justify-between">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr className="mt-2" />
          <div className="flex justify-between my-2 font-semibold">
            <p>Total</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <button onClick={makePayment} className="h-30 w-50 px-10 py-3 rounded-2xl mt-10 text-white bg-red-500">
            Procced to Checkout
          </button>
        </div>
        <div>
          <p>If you have a promo code , Enter it here</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
